import process from "process";

const BASE_URL = "https://api.openweathermap.org/data/2.5";
const GEO_URL = "https://api.openweathermap.org/geo/1.0";

export class WeatherApiError extends Error {
  constructor(message, status = 500) {
    super(message);
    this.name = "WeatherApiError";
    this.status = status;
  }
}

async function fetchJson(url) {
  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new WeatherApiError(
      errorData.message || "Weather service is unavailable right now.",
      response.status,
    );
  }

  return response.json();
}

function formatUtcOffset(offsetInSeconds) {
  const sign = offsetInSeconds >= 0 ? "+" : "-";
  const absoluteOffsetInSeconds = Math.abs(offsetInSeconds);
  const hours = Math.floor(absoluteOffsetInSeconds / 3600);
  const minutes = Math.floor((absoluteOffsetInSeconds % 3600) / 60);

  return `UTC${sign}${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

function getLocalDate(timestampInSeconds, timezoneOffsetInSeconds) {
  return new Date((timestampInSeconds + timezoneOffsetInSeconds) * 1000);
}

function formatLocalDate(timestampInSeconds, timezoneOffsetInSeconds, options) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "UTC",
    ...options,
  }).format(getLocalDate(timestampInSeconds, timezoneOffsetInSeconds));
}

function formatLocalTime(timestampInSeconds, timezoneOffsetInSeconds) {
  return formatLocalDate(timestampInSeconds, timezoneOffsetInSeconds, {
    hour: "numeric",
    minute: "2-digit",
  });
}

function formatVisibility(visibilityInMeters = 0) {
  return `${(visibilityInMeters / 1000).toFixed(1)} km`;
}

function getWindDirectionLabel(degrees = 0) {
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const normalizedDegrees = ((degrees % 360) + 360) % 360;
  const index = Math.round(normalizedDegrees / 45) % directions.length;

  return directions[index];
}

/**
 * Find city coordinates using OpenWeather Geocoding API
 */
export async function findLocationByCity(city, envVar = process.env) {
  const apiKey = envVar.OPEN_WEATHER_API_KEY;
  if (!apiKey) {
    throw new WeatherApiError(
      "Weather service configuration error (missing key).",
      500,
    );
  }

  const url = new URL(`${GEO_URL}/direct`);
  url.searchParams.set("q", city);
  url.searchParams.set("limit", "1");
  url.searchParams.set("appid", apiKey);

  const results = await fetchJson(url.toString());
  const match = results?.[0];

  if (!match) {
    throw new WeatherApiError(
      "City not found. Try a more specific search.",
      404,
    );
  }

  return {
    name: match.name,
    country: match.country,
    latitude: match.lat,
    longitude: match.lon,
  };
}

/**
 * Fetch current weather for the given location
 */
export async function fetchCurrentWeather(location, envVar = process.env) {
  const apiKey = envVar.OPEN_WEATHER_API_KEY;
  if (!apiKey) {
    throw new WeatherApiError(
      "Weather service configuration error (missing key).",
      500,
    );
  }

  const url = new URL(`${BASE_URL}/weather`);
  url.searchParams.set("lat", location.latitude);
  url.searchParams.set("lon", location.longitude);
  url.searchParams.set("units", "metric");
  url.searchParams.set("appid", apiKey);

  const data = await fetchJson(url.toString());

  return {
    city: location.name,
    country: location.country,
    latitude: location.latitude,
    longitude: location.longitude,
    temperature: Math.round(data.main.temp),
    apparentTemperature: Math.round(data.main.feels_like),
    windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
    humidity: data.main.humidity,
    pressure: data.main.pressure,
    visibility: formatVisibility(data.visibility),
    condition: data.weather[0]?.main || "Unknown",
    high: Math.round(data.main.temp_max),
    low: Math.round(data.main.temp_min),
    windDirection: getWindDirectionLabel(data.wind.deg),
    sunrise: formatLocalTime(data.sys.sunrise, data.timezone),
    sunset: formatLocalTime(data.sys.sunset, data.timezone),
    timezone: formatUtcOffset(data.timezone),
  };
}

export async function fetchFiveDayForecast(location, envVar = process.env) {
  const apiKey = envVar.OPEN_WEATHER_API_KEY;
  if (!apiKey) {
    throw new WeatherApiError(
      "Weather service configuration error (missing key).",
      500,
    );
  }

  const url = new URL(`${BASE_URL}/forecast`);
  url.searchParams.set("lat", location.latitude);
  url.searchParams.set("lon", location.longitude);
  url.searchParams.set("units", "metric");
  url.searchParams.set("appid", apiKey);

  const data = await fetchJson(url.toString());
  const timezoneOffset = data.city?.timezone ?? 0;
  const entries = (data.list ?? []).map((item) => {
    const weather = item.weather?.[0] ?? {};

    return {
      timestamp: item.dt,
      dateKey: formatLocalDate(item.dt, timezoneOffset, {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }),
      dayLabel: formatLocalDate(item.dt, timezoneOffset, {
        weekday: "short",
      }),
      dateLabel: formatLocalDate(item.dt, timezoneOffset, {
        month: "short",
        day: "numeric",
      }),
      hourLabel: formatLocalDate(item.dt, timezoneOffset, {
        hour: "numeric",
      }),
      temperature: Math.round(item.main.temp),
      feelsLike: Math.round(item.main.feels_like),
      humidity: item.main.humidity,
      pressure: item.main.pressure,
      visibility: formatVisibility(item.visibility),
      windSpeed: Math.round((item.wind?.speed ?? 0) * 3.6),
      windDirection: getWindDirectionLabel(item.wind?.deg),
      precipitationChance: Math.round((item.pop ?? 0) * 100),
      rainVolume: Number((item.rain?.["3h"] ?? 0).toFixed(1)),
      snowVolume: Number((item.snow?.["3h"] ?? 0).toFixed(1)),
      condition: weather.main || "Unknown",
      description: weather.description || "No details",
      period: item.sys?.pod || "d",
      tempHigh: Math.round(item.main.temp_max),
      tempLow: Math.round(item.main.temp_min),
    };
  });

  const dayMap = new Map();
  entries.forEach((entry) => {
    const existingDay = dayMap.get(entry.dateKey);

    if (!existingDay) {
      dayMap.set(entry.dateKey, {
        dateKey: entry.dateKey,
        dayLabel: entry.dayLabel,
        dateLabel: entry.dateLabel,
        high: entry.tempHigh,
        low: entry.tempLow,
        condition: entry.condition,
        entries: [
          {
            timestamp: entry.timestamp,
            hourLabel: entry.hourLabel,
            description: entry.description,
            temperature: entry.temperature,
            feelsLike: entry.feelsLike,
            humidity: entry.humidity,
            pressure: entry.pressure,
            visibility: entry.visibility,
            windSpeed: entry.windSpeed,
            windDirection: entry.windDirection,
            precipitationChance: entry.precipitationChance,
            rainVolume: entry.rainVolume,
            snowVolume: entry.snowVolume,
          },
        ],
      });
      return;
    }

    existingDay.high = Math.max(existingDay.high, entry.tempHigh);
    existingDay.low = Math.min(existingDay.low, entry.tempLow);
    existingDay.entries.push({
      timestamp: entry.timestamp,
      hourLabel: entry.hourLabel,
      description: entry.description,
      temperature: entry.temperature,
      feelsLike: entry.feelsLike,
      humidity: entry.humidity,
      pressure: entry.pressure,
      visibility: entry.visibility,
      windSpeed: entry.windSpeed,
      windDirection: entry.windDirection,
      precipitationChance: entry.precipitationChance,
      rainVolume: entry.rainVolume,
      snowVolume: entry.snowVolume,
    });

    if (entry.period === "d") {
      existingDay.condition = entry.condition;
    }
  });

  return {
    days: Array.from(dayMap.values()).slice(0, 5),
  };
}

export async function getCityWeather(city, envVar = process.env) {
  const location = await findLocationByCity(city, envVar);
  const [current, forecast] = await Promise.all([
    fetchCurrentWeather(location, envVar),
    fetchFiveDayForecast(location, envVar),
  ]);

  return {
    current,
    forecast,
  };
}
