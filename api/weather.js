import { getCityWeather, WeatherApiError } from "../src/lib/weather-service.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed." });
  }

  try {
    const city = req.query.city?.trim();
    if (!city) {
      return res.status(400).json({ error: "Pass ?city=<name> parameter." });
    }

    const weather = await getCityWeather(city, req.env || process.env);
    return res.status(200).json({ weather });
  } catch (error) {
    if (error instanceof WeatherApiError) {
      return res.status(error.status).json({ error: error.message });
    }
    console.error("OpenWeather API error:", error);
    return res.status(500).json({ error: "Unexpected server error." });
  }
}
