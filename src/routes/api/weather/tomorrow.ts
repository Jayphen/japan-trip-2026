export type TomorrowDaily = {
  time: string;
  values: Record<string, any>;
};

export type TomorrowForecast = {
  timelines?: {
    daily?: TomorrowDaily[];
  };
};

export type TomorrowCodeLabel = { emoji: string; label: string };

// Tomorrow.io weatherCode mapping (subset):
// https://docs.tomorrow.io/reference/data-layers-weather-codes
export function tomorrowCodeToLabel(code?: number): TomorrowCodeLabel {
  if (code == null) return { emoji: '❓', label: 'Unknown' };

  // Clear / clouds
  if (code === 1000) return { emoji: '☀️', label: 'Clear' };
  if (code === 1100) return { emoji: '🌤️', label: 'Mostly clear' };
  if (code === 1101) return { emoji: '⛅', label: 'Partly cloudy' };
  if (code === 1102) return { emoji: '☁️', label: 'Mostly cloudy' };
  if (code === 1001) return { emoji: '☁️', label: 'Cloudy' };

  // Fog
  if (code === 2000 || code === 2100) return { emoji: '🌫️', label: 'Fog' };

  // Drizzle / rain
  if (code === 4000) return { emoji: '🌦️', label: 'Drizzle' };
  if (code === 4001) return { emoji: '🌧️', label: 'Rain' };
  if (code === 4200) return { emoji: '🌧️', label: 'Light rain' };
  if (code === 4201) return { emoji: '🌧️', label: 'Heavy rain' };

  // Snow
  if (code === 5000) return { emoji: '❄️', label: 'Snow' };
  if (code === 5100) return { emoji: '🌨️', label: 'Light snow' };
  if (code === 5101) return { emoji: '❄️', label: 'Heavy snow' };

  // Freezing rain
  if (code === 6000 || code === 6001 || code === 6200 || code === 6201) return { emoji: '🌧️', label: 'Freezing rain' };

  // Thunder
  if (code === 8000) return { emoji: '⛈️', label: 'Thunderstorm' };

  return { emoji: '🌡️', label: `Code ${code}` };
}
