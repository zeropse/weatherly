import { Link } from "react-router-dom";
import { ThemeToggler } from "@/style/theme-toggle";
import { Button } from "@/components/ui/button";
import { IconCloud } from "@tabler/icons-react";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link
          to="/"
          className="flex items-center gap-2 text-lg font-semibold tracking-tight"
        >
          <IconCloud className="h-6 w-6 text-primary" />
          <span>Weatherly</span>
        </Link>

        <div className="flex items-center gap-3">
          <Button className={"p-4 cursor-pointer"}>
            <Link to="/about">About</Link>
          </Button>
          <ThemeToggler />
        </div>
      </div>
    </nav>
  );
}
