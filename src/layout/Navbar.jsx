import { Link, useLocation } from "react-router-dom";
import { ThemeToggler } from "@/style/theme-toggle";
import { Button } from "@/components/ui/button";
import { IconCloud, IconInfoCircle } from "@tabler/icons-react";

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-bold tracking-tight hover:scale-105 transition-transform"
        >
          <div className="bg-primary/10 p-2 rounded-lg">
            <IconCloud className="h-6 w-6 text-primary" />
          </div>
          <span className="hidden sm:block">Weatherly</span>
        </Link>

        <div className="flex items-center gap-3">
          <Button
            variant={location.pathname === "/about" ? "default" : "ghost"}
            className="rounded-md px-5"
          >
            <Link to="/about" className="flex items-center gap-2">
              <IconInfoCircle className="size-4" />
              About
            </Link>
          </Button>
          <ThemeToggler />
        </div>
      </div>
    </nav>
  );
}
