import { useEffect, useState } from "react";
import { SearchWeatherSection } from "@/components/weather/SearchWeatherSection";
import { FeaturedCitiesSection } from "@/components/weather/FeaturedCitiesSection";
import { fetchCityWeather, fetchFeaturedCitiesWeather } from "@/lib/weather";

export default function Home() {
  const [city, setCity] = useState("");
  const [searchedWeather, setSearchedWeather] = useState(null);
  const [searchError, setSearchError] = useState("");
  const [featuredCities, setFeaturedCities] = useState([]);
  const [featuredError, setFeaturedError] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isFeaturedLoading, setIsFeaturedLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    async function loadFeaturedCities() {
      try {
        setIsFeaturedLoading(true);
        setFeaturedError("");

        const payload = await fetchFeaturedCitiesWeather();

        if (!ignore) {
          setFeaturedCities(payload.cities ?? []);
        }
      } catch (error) {
        if (!ignore) {
          setFeaturedError(error.message);
        }
      } finally {
        if (!ignore) {
          setIsFeaturedLoading(false);
        }
      }
    }

    loadFeaturedCities();

    return () => {
      ignore = true;
    };
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    const nextCity = city.trim();

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

  return (
    <div className="mx-auto max-w-6xl space-y-10 px-5 py-10">
      <SearchWeatherSection
        city={city}
        isSearching={isSearching}
        onCityChange={(event) => setCity(event.target.value)}
        onSubmit={handleSubmit}
        searchError={searchError}
        searchedWeather={searchedWeather}
      />

      <FeaturedCitiesSection
        featuredCities={featuredCities}
        featuredError={featuredError}
        isFeaturedLoading={isFeaturedLoading}
      />
    </div>
  );
}
