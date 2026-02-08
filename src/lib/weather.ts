export type WeatherSummary = {
  date: string; // YYYY-MM-DD
  provider?: 'open-meteo' | 'tomorrow';
  code?: number | null; // provider-specific code
  tempMaxC?: number | null;
  tempMinC?: number | null;
  precipProbMaxPct?: number | null;

  // For "current" (if available)
  currentTempC?: number | null;
  currentWindKph?: number | null;

  // Optional error info (we return 200 with error to avoid breaking UI)
  error?: string;
  upstreamStatus?: number;
};

export type CodeLabel = { emoji: string; label: string };

// Open-Meteo weather codes: https://open-meteo.com/en/docs
export function openMeteoCodeToLabel(code?: number | null): CodeLabel {
  if (code === undefined || code === null) return { emoji: '❓', label: 'Unknown' };

  // Clear
  if (code === 0) return { emoji: '☀️', label: 'Clear' };
  // Clouds
  if (code === 1) return { emoji: '🌤️', label: 'Mostly clear' };
  if (code === 2) return { emoji: '⛅', label: 'Partly cloudy' };
  if (code === 3) return { emoji: '☁️', label: 'Overcast' };

  // Fog
  if (code === 45 || code === 48) return { emoji: '🌫️', label: 'Fog' };

  // Drizzle / rain
  if (code === 51 || code === 53 || code === 55) return { emoji: '🌦️', label: 'Drizzle' };
  if (code === 61 || code === 63 || code === 65) return { emoji: '🌧️', label: 'Rain' };
  if (code === 66 || code === 67) return { emoji: '🌧️', label: 'Freezing rain' };

  // Snow
  if (code === 71 || code === 73 || code === 75) return { emoji: '❄️', label: 'Snow' };
  if (code === 77) return { emoji: '🌨️', label: 'Snow grains' };

  // Showers
  if (code === 80 || code === 81 || code === 82) return { emoji: '🌧️', label: 'Showers' };

  // Thunder
  if (code === 95) return { emoji: '⛈️', label: 'Thunderstorm' };
  if (code === 96 || code === 99) return { emoji: '⛈️', label: 'Thunder + hail' };

  return { emoji: '🌡️', label: `Code ${code}` };
}

export function tomorrowCodeToLabel(code?: number | null): CodeLabel {
  if (code == null) return { emoji: '❓', label: 'Unknown' };

  // Clear / clouds
  if (code === 1000) return { emoji: '☀️', label: 'Clear' };
  if (code === 1100) return { emoji: '🌤️', label: 'Mostly clear' };
  if (code === 1101) return { emoji: '⛅', label: 'Partly cloudy' };
  if (code === 1102) return { emoji: '☁️', label: 'Mostly cloudy' };
  if (code === 1001) return { emoji: '☁️', label: 'Cloudy' };

  // Fog
  if (code === 2000 || code === 2100) return { emoji: '🌫️', label: 'Fog' };

  // Wind
  if (code === 3000) return { emoji: '💨', label: 'Breezy' };
  if (code === 3001) return { emoji: '💨', label: 'Windy' };
  if (code === 3002) return { emoji: '💨', label: 'Strong wind' };

  // Drizzle / rain
  if (code === 4000) return { emoji: '🌦️', label: 'Drizzle' };
  if (code === 4001) return { emoji: '🌧️', label: 'Rain' };
  if (code === 4200) return { emoji: '🌧️', label: 'Light rain' };
  if (code === 4201) return { emoji: '🌧️', label: 'Heavy rain' };

  // Snow
  if (code === 5000) return { emoji: '❄️', label: 'Snow' };
  if (code === 5001) return { emoji: '🌨️', label: 'Snow flurries' };
  if (code === 5100) return { emoji: '🌨️', label: 'Light snow' };
  if (code === 5101) return { emoji: '❄️', label: 'Heavy snow' };

  // Freezing rain
  if (code === 6000) return { emoji: '🌧️', label: 'Freezing drizzle' };
  if (code === 6001 || code === 6200 || code === 6201) return { emoji: '🌧️', label: 'Freezing rain' };
  if (code === 7000) return { emoji: '🧊', label: 'Ice pellets' };
  if (code === 7101) return { emoji: '🧊', label: 'Heavy ice pellets' };
  if (code === 7102) return { emoji: '🧊', label: 'Light ice pellets' };

  // Thunder
  if (code === 8000) return { emoji: '⛈️', label: 'Thunderstorm' };

  return { emoji: '🌡️', label: `Code ${code}` };
}

export function weatherToLabel(w: WeatherSummary | null | undefined): CodeLabel {
  if (!w) return { emoji: '❓', label: 'Unknown' };
  if (w.provider === 'tomorrow') return tomorrowCodeToLabel(w.code);
  return openMeteoCodeToLabel(w.code);
}
