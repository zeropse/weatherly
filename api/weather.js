import {
  WeatherApiError,
  getCityWeather,
  getFeaturedCitiesWeather,
} from "./_weather.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed." });
  }

  try {
    if (req.query.featured === "true") {
      const cities = await getFeaturedCitiesWeather();
      return res.status(200).json({ cities });
    }

    if (typeof req.query.city === "string" && req.query.city.trim()) {
      const weather = await getCityWeather(req.query.city.trim());
      return res.status(200).json({ weather });
    }

    return res.status(400).json({
      error: "Pass either ?featured=true or ?city=<name>.",
    });
  } catch (error) {
    if (error instanceof WeatherApiError) {
      return res.status(error.status).json({ error: error.message });
    }

    return res.status(500).json({ error: "Unexpected server error." });
  }
}
