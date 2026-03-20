import { useMemo, useState } from "react";
import { IconCloudRain, IconDroplets, IconWind } from "@tabler/icons-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function ForecastCard({ forecast }) {
  const [selectedDay, setSelectedDay] = useState(
    forecast.days[0]?.dateKey ?? "",
  );

  const activeDay = useMemo(
    () =>
      forecast.days.find((day) => day.dateKey === selectedDay) ??
      forecast.days[0],
    [forecast.days, selectedDay],
  );

  if (!activeDay) {
    return null;
  }

  return (
    <Card className="overflow-hidden border bg-card shadow-sm">
      <CardHeader className="border-b p-3">
        <div className="grid gap-2 md:grid-cols-5">
          {forecast.days.map((day) => {
            const isActive = activeDay.dateKey === day.dateKey;

            return (
              <Button
                key={day.dateKey}
                type="button"
                variant="ghost"
                className={`h-auto min-h-24 cursor-pointer flex-col items-start justify-between rounded-2xl border px-4 py-3 text-left ${
                  isActive
                    ? "border-primary/35 bg-primary/12 shadow-sm"
                    : "border-border bg-background/80 hover:bg-muted/45"
                }`}
                onClick={() => setSelectedDay(day.dateKey)}
              >
                <div>
                  <div className="text-sm font-semibold text-foreground">
                    {day.dayLabel}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {day.dateLabel}
                  </div>
                </div>

                <div className="w-full space-y-2">
                  <div className="text-sm font-medium text-foreground">
                    {day.low}° to {day.high}°
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {day.condition}
                  </div>
                </div>
              </Button>
            );
          })}
        </div>
      </CardHeader>

      <CardContent className="space-y-6 p-6">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {activeDay.entries.map((entry) => (
            <div
              key={entry.timestamp}
              className="rounded-2xl border bg-card p-4 shadow-sm transition-colors hover:bg-muted/20"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold text-foreground">
                    {entry.hourLabel}
                  </div>
                  <div className="mt-1 text-xs capitalize text-muted-foreground">
                    {entry.description}
                  </div>
                </div>

                <div
                  className={`rounded-full border px-2.5 py-1 text-xs font-medium ${
                    entry.precipitationChance >= 70
                      ? "border-chart-4/30 bg-chart-4/10 text-chart-4"
                      : entry.precipitationChance >= 40
                        ? "border-chart-3/30 bg-chart-3/10 text-chart-3"
                        : "border-primary/20 bg-primary/8 text-primary"
                  }`}
                >
                  {entry.precipitationChance}% rain
                </div>
              </div>

              <div className="mt-5 flex items-end justify-between gap-3">
                <div>
                  <div className="text-3xl font-semibold tracking-tight text-foreground">
                    {entry.temperature}°
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Feels like {entry.feelsLike}°
                  </div>
                </div>

                <div className="text-right text-xs text-muted-foreground">
                  <div>Wind {entry.windSpeed} km/h</div>
                  <div>
                    Volume{" "}
                    {entry.rainVolume || entry.snowVolume
                      ? `${entry.rainVolume || entry.snowVolume} mm`
                      : "0 mm"}
                  </div>
                </div>
              </div>

              <div className="mt-4 grid gap-2 border-t pt-4 text-sm">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <IconDroplets className="size-4 text-primary" />
                    Humidity
                  </span>
                  <span className="font-medium text-foreground">
                    {entry.humidity}%
                  </span>
                </div>

                <div className="flex items-center justify-between text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <IconWind className="size-4 text-primary" />
                    Wind
                  </span>
                  <span className="font-medium text-foreground">
                    {entry.windSpeed} km/h
                  </span>
                </div>

                <div className="flex items-center justify-between text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <IconCloudRain className="size-4 text-primary" />
                    3-hour volume
                  </span>
                  <span className="font-medium text-foreground">
                    {entry.rainVolume || entry.snowVolume
                      ? `${entry.rainVolume || entry.snowVolume} mm`
                      : "0 mm"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
