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
import { WeatherSummaryCard } from "@/components/weather/WeatherSummaryCard";

export function SearchWeatherSection({
  city,
  isSearching,
  onCityChange,
  onSubmit,
  searchError,
  searchedWeather,
}) {
  return (
    <section className="w-full py-12 md:py-16">
      <div className="mx-auto max-w-4xl px-4 space-y-10">
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
            <CardTitle className="text-lg font-semibold">Search City</CardTitle>
            <CardDescription>
              Enter a city name to get weather details.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <form
              onSubmit={onSubmit}
              className="flex flex-col sm:flex-row gap-3"
            >
              <div className="relative flex-1">
                <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  value={city}
                  onChange={onCityChange}
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
                {isSearching ? (
                  <div className="flex items-center gap-2">
                    <Spinner className="size-4" />
                    Searching
                  </div>
                ) : (
                  "Search"
                )}
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
  );
}
