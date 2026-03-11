import { ThemeToggler } from "@/style/theme-toggle";
import { ThemeProvider } from "@/style/theme-provider";

export default function App() {
  return (
    <ThemeProvider>
      <div className="flex h-screen w-screen items-center justify-center">
        <h1 className="text-4xl font-bold">Hello, Weatherly!</h1>
        <ThemeToggler />
      </div>
    </ThemeProvider>
  );
}
