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
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-foreground">
          Weatherly
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Get real-time weather updates for any city around the globe with
          precision and style.
        </p>
      </div>

      <Card className="border-none shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-semibold">Search City</CardTitle>
          <CardDescription>Enter a city name to get started.</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <form
            className="relative flex flex-col gap-3 sm:flex-row"
            onSubmit={onSubmit}
          >
            <div className="relative flex-1">
              <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                value={city}
                onChange={onCityChange}
                placeholder="e.g. London, Tokyo, New York"
                className="h-12 pl-10 rounded-xl bg-background/50 border-input transition-all focus:ring-2 focus:ring-primary/20"
                aria-label="City name"
              />
            </div>
            <Button
              type="submit"
              size="lg"
              className="h-12 px-8 rounded-xl font-medium transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              disabled={isSearching}
            >
              {isSearching ? (
                <>
                  <Spinner className="size-4" />
                  Searching...
                </>
              ) : (
                "Search Weather"
              )}
            </Button>
          </form>

          {searchError && (
            <div className="animate-in fade-in slide-in-from-top-2 duration-300 rounded-xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive flex items-center gap-2">
              <span className="shrink-0 size-1.5 rounded-full bg-destructive" />
              {searchError}
            </div>
          )}
        </CardContent>
      </Card>

      {searchedWeather && (
        <div className="animate-in fade-in zoom-in-95 duration-500">
          <WeatherSummaryCard weather={searchedWeather} />
        </div>
      )}
    </div>
  );
}
