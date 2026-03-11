export function WeatherSummaryCard({ weather }) {
  return (
    <div className="rounded-xl border border-border/70 bg-muted/40 p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm text-muted-foreground">Latest result</div>
          <div className="mt-1 text-xl font-semibold">
            {weather.city}, {weather.country}
          </div>
          <div className="mt-2 text-sm text-muted-foreground">
            {weather.condition} • Feels like {weather.apparentTemperature}°C
          </div>
        </div>

        <div className="text-right">
          <div className="text-4xl font-semibold tracking-tight">
            {weather.temperature}°C
          </div>
          <div className="text-sm text-muted-foreground">
            H:{weather.high}°C / L:{weather.low}°C
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div className="rounded-lg bg-background/80 p-3 ring-1 ring-border/60">
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Humidity
          </div>
          <div className="mt-2 text-lg font-medium">{weather.humidity}%</div>
        </div>
        <div className="rounded-lg bg-background/80 p-3 ring-1 ring-border/60">
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Wind
          </div>
          <div className="mt-2 text-lg font-medium">
            {weather.windSpeed} km/h
          </div>
        </div>
        <div className="rounded-lg bg-background/80 p-3 ring-1 ring-border/60">
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Timezone
          </div>
          <div className="mt-2 text-sm font-medium">{weather.timezone}</div>
        </div>
      </div>
    </div>
  );
}
