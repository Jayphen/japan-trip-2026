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

    // Ask only for what we need.
    endpoint.searchParams.set('timesteps', '1d');
    endpoint.searchParams.set('units', 'metric');
    endpoint.searchParams.set(
      'fields',
      [
        'weatherCode',
        'temperatureMax',
        'temperatureMin',
        'precipitationProbability'
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

    // Tomorrow returns ISO timestamps; match by YYYY-MM-DD prefix.
    const match = daily.find((d) => String(d?.time ?? '').startsWith(date));
    const values = match?.values ?? {};

    return json(
      {
        date,
        provider: 'tomorrow',
        code: values.weatherCode ?? null,
        tempMaxC: values.temperatureMax ?? null,
        tempMinC: values.temperatureMin ?? null,
        precipProbMaxPct: values.precipitationProbability ?? null
      },
      { headers: { 'cache-control': 'public, max-age=900' } }
    );
  }

  // Fallback: Open-Meteo (no key)
  // Use Asia/Tokyo so the YYYY-MM-DD aligns with Japan local time.
  const endpoint = new URL('https://api.open-meteo.com/v1/forecast');
  endpoint.searchParams.set('latitude', String(lat));
  endpoint.searchParams.set('longitude', String(lng));
  endpoint.searchParams.set('timezone', 'Asia/Tokyo');
  endpoint.searchParams.set('current_weather', 'true');
  endpoint.searchParams.set('daily', [
    'weather_code',
    'temperature_2m_max',
    'temperature_2m_min',
    'precipitation_probability_max'
  ].join(','));
  endpoint.searchParams.set('start_date', date);
  endpoint.searchParams.set('end_date', date);

  const res = await fetch(endpoint.toString(), { headers: { accept: 'application/json' } });

  if (!res.ok) {
    // Don't hard-fail the UI with a 5xx; upstream can rate-limit.
    return json(
      {
        date,
        error: `Open-Meteo error: ${res.status}`,
        upstreamStatus: res.status
      },
      {
        status: 200,
        headers: {
          'cache-control': 'public, max-age=120'
        }
      }
    );
  }

  const data = await res.json();
  const daily = data?.daily;

  const out = {
    date,
    provider: 'open-meteo',
    code: daily?.weather_code?.[0] ?? null,
    tempMaxC: daily?.temperature_2m_max?.[0] ?? null,
    tempMinC: daily?.temperature_2m_min?.[0] ?? null,
    precipProbMaxPct: daily?.precipitation_probability_max?.[0] ?? null,
    currentTempC: data?.current_weather?.temperature ?? null,
    currentWindKph: data?.current_weather?.windspeed ?? null
  };

  return json(out, {
    headers: {
      // Cache a little; forecasts change, but not every second.
      'cache-control': 'public, max-age=600'
    }
  });
};
