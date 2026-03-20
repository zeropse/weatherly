import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { SearchWeatherSection } from "@/components/weather/SearchWeatherSection";
import { fetchCityWeather } from "@/lib/weather";

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryCity = searchParams.get("city");
  const [city, setCity] = useState(queryCity);
  const [searchedWeather, setSearchedWeather] = useState(null);
  const [searchError, setSearchError] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (queryCity) {
      setCity(queryCity);
      handleSearch(queryCity);
    } else {
      setCity("");
      setSearchedWeather(null);
      setSearchError("");
    }
  }, [queryCity]);

  async function handleSearch(cityName) {
    const nextCity = cityName.trim();

    if (!nextCity) {
      setSearchError("Enter a city name to search.");
      return;
    }

    try {
      setIsSearching(true);
      setSearchError("");

      const payload = await fetchCityWeather(nextCity);
      setSearchedWeather(payload.weather ?? null);
    } catch (error) {
      setSearchedWeather(null);
      setSearchError(error.message);
    } finally {
      setIsSearching(false);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const nextCity = city.trim();

    if (nextCity) {
      setSearchParams({ city: nextCity });
    } else {
      setSearchError("Enter a city name to search.");
    }
  }

  return (
    <div className="mx-auto max-w-4xl space-y-10 px-5 py-20">
      <SearchWeatherSection
        city={city}
        isSearching={isSearching}
        onCityChange={(event) => setCity(event.target.value)}
        onSubmit={handleSubmit}
        searchError={searchError}
        searchedWeather={searchedWeather}
      />
    </div>
  );
}
