import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export default function Home() {
  return (
    <div className="mx-auto max-w-3xl">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Search the Forecast</CardTitle>
          <CardDescription>
            Type a city name to view a quick forecast preview.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="sm:col-span-2">
              <Input placeholder="e.g. San Francisco" />
            </div>
            <div className="flex items-center gap-2">
              <Button type="button" className="w-full">
                Get forecast
              </Button>
              <Button variant="ghost" size="icon" aria-label="loading">
                <Spinner />
              </Button>
            </div>
          </form>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border p-4 bg-muted/30">
              <div className="text-sm text-muted-foreground">Today</div>
              <div className="mt-2 text-lg font-medium">72°F · Sunny</div>
            </div>
            <div className="rounded-lg border p-4 bg-muted/30">
              <div className="text-sm text-muted-foreground">Tomorrow</div>
              <div className="mt-2 text-lg font-medium">
                68°F · Partly Cloudy
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Powered by a demo dataset
          </div>
          <Link to="/not-found">
            <Button variant="outline">Explore</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
