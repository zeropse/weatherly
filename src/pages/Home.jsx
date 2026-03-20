import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchCityWeather } from "@/lib/weather";
import { WeatherSummaryCard } from "@/components/WeatherSummaryCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { IconSearch } from "@tabler/icons-react";

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
      <section className="w-full">
        <div className="space-y-10">
          {/* Hero */}
          <div className="text-center space-y-3">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
              Weatherly
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto">
              Get real-time weather updates for any city around the globe.
            </p>
          </div>

          {/* Search Card */}
          <Card className="border bg-card shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                Search City
              </CardTitle>
              <CardDescription>
                Enter a city name to get weather details.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3"
              >
                <div className="relative flex-1">
                  <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <Input
                    value={city}
                    onChange={(event) => setCity(event.target.value)}
                    placeholder="e.g. London, Tokyo, New York"
                    className="h-11 pl-10"
                    aria-label="City name"
                  />
                </div>

                <Button
                  type="submit"
                  size="default"
                  className="h-11 px-6 font-medium cursor-pointer"
                  disabled={isSearching}
                >
                  {isSearching ? <Spinner className="size-4" /> : "Search"}
                </Button>
              </form>

              {/* Error */}
              {searchError && (
                <div className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                  {searchError}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Result */}
          {searchedWeather && (
            <div className="animate-in fade-in duration-300">
              <WeatherSummaryCard weather={searchedWeather} />
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
