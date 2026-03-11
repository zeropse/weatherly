import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function FeaturedCityCard({ city }) {
  return (
    <Card
      size="sm"
      className="border border-border/70 bg-linear-to-br from-background via-background to-muted/60 shadow-sm"
    >
      <CardHeader>
        <CardTitle>{city.city}</CardTitle>
        <CardDescription>{city.country}</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="text-3xl font-semibold tracking-tight">
              {city.temperature}°C
            </div>
            <div className="mt-1 text-sm text-muted-foreground">
              {city.condition}
            </div>
          </div>

          <div className="text-right text-sm text-muted-foreground">
            <div>H: {city.high}°C</div>
            <div>L: {city.low}°C</div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="justify-between text-xs text-muted-foreground">
        <span>Timezone: {city.timezone}</span>
        <span>Wind Speed: {city.windSpeed} km/h wind</span>
      </CardFooter>
    </Card>
  );
}
