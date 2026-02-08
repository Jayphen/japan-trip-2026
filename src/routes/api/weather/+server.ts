import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/private';

function num(v: string | null): number | null {
	if (!v) return null;
	const n = Number(v);
	return Number.isFinite(n) ? n : null;
}

type WeatherPayload = {
	date: string;
	provider: 'tomorrow' | 'open-meteo';
	code: number | null;
	tempMaxC: number | null;
	tempMinC: number | null;
	precipProbMaxPct: number | null;
};

type FetchResult =
	| { ok: true; payload: WeatherPayload; maxAge: number }
	| { ok: false; error: string; upstreamStatus?: number };

function hasAnyForecastValue(payload: WeatherPayload): boolean {
	return (
		payload.code !== null ||
		payload.tempMaxC !== null ||
		payload.tempMinC !== null ||
		payload.precipProbMaxPct !== null
	);
}

async function fetchTomorrowDaily({
	lat,
	lng,
	date,
	apiKey,
	fetch
}: {
	lat: number;
	lng: number;
	date: string;
	apiKey: string;
	fetch: typeof globalThis.fetch;
}): Promise<FetchResult> {
	const endpoint = new URL('https://api.tomorrow.io/v4/weather/forecast');
	endpoint.searchParams.set('location', `${lat},${lng}`);
	endpoint.searchParams.set('apikey', apiKey);
	endpoint.searchParams.set('timesteps', '1d');
	endpoint.searchParams.set('units', 'metric');
	endpoint.searchParams.set(
		'fields',
		[
			'weatherCodeMax',
			'temperatureMax',
			'temperatureMin',
			'precipitationProbabilityMax'
		].join(',')
	);

	const res = await fetch(endpoint.toString(), { headers: { accept: 'application/json' } });
	if (!res.ok) {
		return {
			ok: false,
			error: `Tomorrow.io error: ${res.status}`,
			upstreamStatus: res.status
		};
	}

	const data = (await res.json()) as any;
	const daily: any[] = data?.timelines?.daily ?? data?.timelines?.[0]?.intervals ?? [];
	const match = daily.find((d) => String(d?.time ?? '').startsWith(date));
	const values = match?.values ?? {};

	const payload: WeatherPayload = {
		date,
		provider: 'tomorrow',
		code: values.weatherCodeMax ?? values.weatherCodeAvg ?? values.weatherCodeMin ?? null,
		tempMaxC: values.temperatureMax ?? null,
		tempMinC: values.temperatureMin ?? null,
		precipProbMaxPct: values.precipitationProbabilityMax ?? values.precipitationProbabilityAvg ?? null
	};

	if (!hasAnyForecastValue(payload)) {
		return { ok: false, error: 'Tomorrow.io has no forecast for this date' };
	}

	return { ok: true, payload, maxAge: 900 };
}

async function fetchOpenMeteoDaily({
	lat,
	lng,
	date,
	fetch
}: {
	lat: number;
	lng: number;
	date: string;
	fetch: typeof globalThis.fetch;
}): Promise<FetchResult> {
	const endpoint = new URL('https://api.open-meteo.com/v1/forecast');
	endpoint.searchParams.set('latitude', String(lat));
	endpoint.searchParams.set('longitude', String(lng));
	endpoint.searchParams.set('timezone', 'Asia/Tokyo');
	endpoint.searchParams.set(
		'daily',
		['weather_code', 'temperature_2m_max', 'temperature_2m_min', 'precipitation_probability_max'].join(
			','
		)
	);
	endpoint.searchParams.set('start_date', date);
	endpoint.searchParams.set('end_date', date);

	const res = await fetch(endpoint.toString(), { headers: { accept: 'application/json' } });
	if (!res.ok) {
		return {
			ok: false,
			error: `Open-Meteo error: ${res.status}`,
			upstreamStatus: res.status
		};
	}

	const data = (await res.json()) as any;
	const daily = data?.daily;
	const payload: WeatherPayload = {
		date,
		provider: 'open-meteo',
		code: daily?.weather_code?.[0] ?? null,
		tempMaxC: daily?.temperature_2m_max?.[0] ?? null,
		tempMinC: daily?.temperature_2m_min?.[0] ?? null,
		precipProbMaxPct: daily?.precipitation_probability_max?.[0] ?? null
	};

	if (!hasAnyForecastValue(payload)) {
		return { ok: false, error: 'Open-Meteo has no forecast for this date' };
	}

	return { ok: true, payload, maxAge: 600 };
}

export const GET: RequestHandler = async ({ url, fetch }) => {
	const lat = num(url.searchParams.get('lat'));
	const lng = num(url.searchParams.get('lng'));
	const date = url.searchParams.get('date');

	if (lat === null || lng === null || !date) {
		return json({ error: 'Missing lat,lng,date' }, { status: 400 });
	}

	const tomorrowKey = env.TOMORROW_API_KEY;

	const failureMessages: string[] = [];
	const upstreamStatuses: number[] = [];

	// Prefer Tomorrow.io if configured, then fall back to Open-Meteo.
	if (tomorrowKey) {
		const tomorrow = await fetchTomorrowDaily({ lat, lng, date, apiKey: tomorrowKey, fetch });
		if (tomorrow.ok) {
			return json(tomorrow.payload, {
				headers: { 'cache-control': `public, max-age=${tomorrow.maxAge}` }
			});
		}
		failureMessages.push(tomorrow.error);
		if (tomorrow.upstreamStatus !== undefined) upstreamStatuses.push(tomorrow.upstreamStatus);
	}

	const openMeteo = await fetchOpenMeteoDaily({ lat, lng, date, fetch });
	if (openMeteo.ok) {
		return json(openMeteo.payload, {
			headers: { 'cache-control': `public, max-age=${openMeteo.maxAge}` }
		});
	}
	failureMessages.push(openMeteo.error);
	if (openMeteo.upstreamStatus !== undefined) upstreamStatuses.push(openMeteo.upstreamStatus);

	return json(
		{
			date,
			provider: tomorrowKey ? 'tomorrow' : 'open-meteo',
			error: 'Forecast not available yet',
			upstreamStatus: upstreamStatuses[0],
			detail: failureMessages.join(' | ')
		},
		{ status: 200, headers: { 'cache-control': 'public, max-age=300' } }
	);
};
