import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { FeaturedCityCard } from "@/components/weather/FeaturedCityCard";

export function FeaturedCitiesSection({
  featuredCities,
  featuredError,
  isFeaturedLoading,
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Weather across the world</CardTitle>
        <CardDescription>
          Current weather snapshots of important cities across different
          continents.
        </CardDescription>
      </CardHeader>

      <CardContent>
        {isFeaturedLoading ? (
          <div className="flex min-h-48 items-center justify-center rounded-xl border border-dashed border-border/80 bg-muted/20">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Spinner />
              Loading featured cities
            </div>
          </div>
        ) : null}

        {!isFeaturedLoading && featuredError ? (
          <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {featuredError}
          </div>
        ) : null}

        {!isFeaturedLoading && !featuredError ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 pb-6">
            {featuredCities.map((featuredCity) => (
              <FeaturedCityCard
                key={`${featuredCity.city}-${featuredCity.timezone}`}
                city={featuredCity}
              />
            ))}
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
