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
    condition: data.weather[0]?.main || "Unknown",
    high: Math.round(data.main.temp_max),
    low: Math.round(data.main.temp_min),
    timezone: `UTC${data.timezone >= 0 ? "+" : ""}${data.timezone / 3600}`,
  };
}

export async function getCityWeather(city, envVar = process.env) {
  const location = await findLocationByCity(city, envVar);
  return fetchCurrentWeather(location, envVar);
}
