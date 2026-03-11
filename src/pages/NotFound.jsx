import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { IconHome } from "@tabler/icons-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="space-y-3 text-center">
        <h1 className="text-6xl font-black text-primary">404</h1>
        <h3 className="text-2xl font-semibold">Page Not Found!</h3>
        <p className="text-md text-muted-foreground max-w-md mx-auto">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link to="/">
          <Button className="cursor-pointer p-4 w-full sm:w-auto">
            <IconHome />
            Go home
          </Button>
        </Link>
      </div>
    </div>
  );
}
