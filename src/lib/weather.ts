export type WeatherSummary = {
  date: string; // YYYY-MM-DD
  tempMaxC?: number;
  tempMinC?: number;
  precipProbMaxPct?: number;
  weatherCode?: number;
  // For today
  currentTempC?: number;
  currentWindKph?: number;
};

// Open-Meteo weather codes: https://open-meteo.com/en/docs
export function weatherCodeToLabel(code?: number): { emoji: string; label: string } {
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
