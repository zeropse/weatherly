import {
  IconDroplets,
  IconWind,
  IconMapPin,
  IconTemperaturePlus,
  IconTemperatureMinus,
  IconClock,
} from "@tabler/icons-react";
import { Card, CardContent } from "@/components/ui/card";

export function WeatherSummaryCard({ weather }) {
  return (
    <Card className="border bg-card shadow-sm rounded-xl">
      <CardContent className="p-6 md:p-8">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
          {/* Location + Condition */}
          <div className="text-center md:text-left space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-muted text-muted-foreground text-xs font-medium">
              <IconMapPin className="size-3.5 text-primary" />
              {weather.city}, {weather.country}
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                {weather.condition}
              </h2>

              <p className="text-muted-foreground text-sm mt-1">
                Feels like{" "}
                <span className="text-foreground font-medium">
                  {weather.apparentTemperature}°
                </span>
              </p>
            </div>
          </div>

          {/* Temperature */}
          <div className="flex flex-col items-center md:items-end">
            <span className="text-6xl md:text-7xl font-bold tracking-tight text-foreground">
              {weather.temperature}°
            </span>

            <div className="flex gap-2 mt-3">
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-muted text-xs font-medium">
                Highest
                <IconTemperaturePlus className="size-3.5 text-primary" />
                {weather.high}°
              </div>

              <div className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-muted text-xs font-medium">
                Lowest
                <IconTemperatureMinus className="size-3.5 text-primary" />
                {weather.low}°
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-6 h-px bg-border" />

        {/* Bottom Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-muted-foreground">
              <IconDroplets className="size-4 text-primary" />
              Humidity
            </div>
            <span className="font-medium text-foreground">
              {weather.humidity}%
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-muted-foreground">
              <IconWind className="size-4 text-primary" />
              Wind
            </div>
            <span className="font-medium text-foreground">
              {weather.windSpeed} km/h
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-muted-foreground">
              <IconClock className="size-4 text-primary" />
              Timezone
            </div>
            <span className="font-medium text-foreground truncate">
              {weather.timezone}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
