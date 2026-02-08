import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/private';

function num(v: string | null): number | null {
	if (!v) return null;
	const n = Number(v);
	return Number.isFinite(n) ? n : null;
}

export const GET: RequestHandler = async ({ url, fetch }) => {
	const lat = num(url.searchParams.get('lat'));
	const lng = num(url.searchParams.get('lng'));
	const date = url.searchParams.get('date');

	if (lat === null || lng === null || !date) {
		return json({ error: 'Missing lat,lng,date' }, { status: 400 });
	}

	const tomorrowKey = env.TOMORROW_API_KEY;

	// Prefer Tomorrow.io if configured.
	if (tomorrowKey) {
		const endpoint = new URL('https://api.tomorrow.io/v4/weather/forecast');
		endpoint.searchParams.set('location', `${lat},${lng}`);
		endpoint.searchParams.set('apikey', tomorrowKey);

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
			return json(
				{
					date,
					provider: 'tomorrow',
					error: `Tomorrow.io error: ${res.status}`,
					upstreamStatus: res.status
				},
				{ status: 200, headers: { 'cache-control': 'public, max-age=120' } }
			);
		}

		const data = (await res.json()) as any;
		const daily: any[] = data?.timelines?.daily ?? data?.timelines?.[0]?.intervals ?? [];

		const match = daily.find((d) => String(d?.time ?? '').startsWith(date));
		const values = match?.values ?? {};

		return json(
			{
				date,
				provider: 'tomorrow',
				code: values.weatherCodeMax ?? values.weatherCodeAvg ?? values.weatherCodeMin ?? null,
				tempMaxC: values.temperatureMax ?? null,
				tempMinC: values.temperatureMin ?? null,
				precipProbMaxPct: values.precipitationProbabilityMax ?? values.precipitationProbabilityAvg ?? null
			},
			{ headers: { 'cache-control': 'public, max-age=900' } }
		);
	}

	// No key in the deployed environment — return a clean message instead of
	// falling back to Open-Meteo (which rate-limits easily and causes noisy 429s).
	return json(
		{
			date,
			provider: 'tomorrow',
			error: 'Weather is not configured (missing TOMORROW_API_KEY in server env)'
		},
		{ status: 200, headers: { 'cache-control': 'public, max-age=300' } }
	);
};
