import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

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

  const res = await fetch(endpoint.toString(), {
    headers: {
      'accept': 'application/json'
    }
  });

  if (!res.ok) {
    return json({ error: `Open-Meteo error: ${res.status}` }, { status: 502 });
  }

  const data = await res.json();
  const daily = data?.daily;

  const out = {
    date,
    weatherCode: daily?.weather_code?.[0] ?? null,
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
