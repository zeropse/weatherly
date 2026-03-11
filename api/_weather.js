const FEATURED_CITIES = [
  {
    name: "New York",
    country: "United States",
    latitude: 40.7128,
    longitude: -74.006,
    timezone: "America/New_York",
  },
  {
    name: "London",
    country: "United Kingdom",
    latitude: 51.5072,
    longitude: -0.1276,
    timezone: "Europe/London",
  },
  {
    name: "Tokyo",
    country: "Japan",
    latitude: 35.6762,
    longitude: 139.6503,
    timezone: "Asia/Tokyo",
  },
  {
    name: "Dubai",
    country: "United Arab Emirates",
    latitude: 25.2048,
    longitude: 55.2708,
    timezone: "Asia/Dubai",
  },
  {
    name: "Paris",
    country: "France",
    latitude: 48.8566,
    longitude: 2.3522,
    timezone: "Europe/Paris",
  },
  {
    name: "Sydney",
    country: "Australia",
    latitude: -33.8688,
    longitude: 151.2093,
    timezone: "Australia/Sydney",
  },
];

const WEATHER_CODE_LABELS = {
  0: "Clear",
  1: "Mainly Clear",
  2: "Partly Cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Rime Fog",
  51: "Light Drizzle",
  53: "Drizzle",
  55: "Dense Drizzle",
  56: "Freezing Drizzle",
  57: "Heavy Freezing Drizzle",
  61: "Light Rain",
  63: "Rain",
  65: "Heavy Rain",
  66: "Freezing Rain",
  67: "Heavy Freezing Rain",
  71: "Light Snow",
  73: "Snow",
  75: "Heavy Snow",
  77: "Snow Grains",
  80: "Rain Showers",
  81: "Heavy Showers",
  82: "Violent Showers",
  85: "Snow Showers",
  86: "Heavy Snow Showers",
  95: "Thunderstorm",
  96: "Thunderstorm With Hail",
  99: "Severe Thunderstorm",
};

class WeatherApiError extends Error {
  constructor(message, status = 500) {
    super(message);
    this.name = "WeatherApiError";
    this.status = status;
  }
}

function getWeatherLabel(code) {
  return WEATHER_CODE_LABELS[code] ?? "Unknown Conditions";
}

async function fetchJson(url) {
  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new WeatherApiError("Weather service is unavailable right now.", 502);
  }

  return response.json();
}

function formatWeatherPayload(location, forecast) {
  const current = forecast.current;
  const daily = forecast.daily;

  return {
    city: location.name,
    country: location.country,
    latitude: location.latitude,
    longitude: location.longitude,
    timezone: forecast.timezone,
    temperature: Math.round(current.temperature_2m),
    apparentTemperature: Math.round(current.apparent_temperature),
    windSpeed: Math.round(current.wind_speed_10m),
    humidity: Math.round(current.relative_humidity_2m),
    condition: getWeatherLabel(current.weather_code),
    weatherCode: current.weather_code,
    isDay: current.is_day === 1,
    high: Math.round(daily.temperature_2m_max[0]),
    low: Math.round(daily.temperature_2m_min[0]),
    fetchedAt: current.time,
  };
}

function createForecastUrl({ latitude, longitude, timezone = "auto" }) {
  const url = new URL("https://api.open-meteo.com/v1/forecast");

  url.searchParams.set("latitude", latitude);
  url.searchParams.set("longitude", longitude);
  url.searchParams.set(
    "current",
    [
      "temperature_2m",
      "apparent_temperature",
      "relative_humidity_2m",
      "is_day",
      "weather_code",
      "wind_speed_10m",
    ].join(","),
  );
  url.searchParams.set("daily", "temperature_2m_max,temperature_2m_min");
  url.searchParams.set("timezone", timezone);

  return url.toString();
}

async function fetchWeatherForLocation(location) {
  const forecast = await fetchJson(
    createForecastUrl({
      latitude: location.latitude,
      longitude: location.longitude,
      timezone: location.timezone,
    }),
  );

  return formatWeatherPayload(location, forecast);
}

async function findCity(city) {
  const url = new URL("https://geocoding-api.open-meteo.com/v1/search");

  url.searchParams.set("name", city);
  url.searchParams.set("count", "1");
  url.searchParams.set("language", "en");
  url.searchParams.set("format", "json");

  const payload = await fetchJson(url.toString());
  const match = payload.results?.[0];

  if (!match) {
    throw new WeatherApiError(
      "City not found. Try a more specific search.",
      404,
    );
  }

  return {
    name: match.name,
    country: match.country,
    latitude: match.latitude,
    longitude: match.longitude,
    timezone: match.timezone ?? "auto",
  };
}

async function getCityWeather(city) {
  const location = await findCity(city);
  return fetchWeatherForLocation(location);
}

async function getFeaturedCitiesWeather() {
  return Promise.all(FEATURED_CITIES.map(fetchWeatherForLocation));
}

export { WeatherApiError, getCityWeather, getFeaturedCitiesWeather };
