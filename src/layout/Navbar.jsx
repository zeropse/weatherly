import { Link } from "react-router-dom";
import { ThemeToggler } from "@/style/theme-toggle";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b bg-background/50">
      <div className="flex items-center gap-4">
        <Link to="/" className="text-lg font-semibold">
          Weatherly
        </Link>
        <Link
          to="/"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          Home
        </Link>
        <Link
          to="/about"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          About
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <ThemeToggler />
      </div>
    </nav>
  );
}
