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
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl">Check Weather of Any City</CardTitle>
        <CardDescription>
          Search for a city to see the current temperature, daily range,
          humidity, and wind speed.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-5">
        <form className="flex flex-col gap-3 sm:flex-row" onSubmit={onSubmit}>
          <Input
            value={city}
            onChange={onCityChange}
            placeholder="Enter a city name"
            className="h-11 flex-1 rounded-xl bg-background/80"
            aria-label="City name"
          />
          <Button
            type="submit"
            size="lg"
            className="h-11 min-w-36 rounded-xl cursor-pointer"
            disabled={isSearching}
          >
            {isSearching ? (
              <>
                <Spinner className="size-4" />
                Searching
              </>
            ) : (
              "Search"
            )}
          </Button>
        </form>

        {searchError ? (
          <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {searchError}
          </div>
        ) : null}

        {searchedWeather ? (
          <WeatherSummaryCard weather={searchedWeather} />
        ) : null}
      </CardContent>
    </Card>
  );
}
