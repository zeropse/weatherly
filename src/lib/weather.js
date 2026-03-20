async function callWeatherApi(params) {
  const url = new URL("/api/weather", window.location.origin);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, value);
    }
  });

  const response = await fetch(url.toString(), {
    headers: {
      Accept: "application/json",
    },
  });

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(payload?.error ?? "Unable to fetch weather data.");
  }

  return payload;
}

export function fetchCityWeather(city) {
  return callWeatherApi({ city });
}
