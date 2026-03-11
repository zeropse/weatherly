import { useCallback, useRef } from "react";
import { IconSun, IconMoon } from "@tabler/icons-react";
import { flushSync } from "react-dom";
import { cn } from "@/lib/utils";
import { useTheme } from "@/style/theme-context";
import { Button } from "@/components/ui/button";

export const ThemeToggler = ({ className, duration = 400, ...props }) => {
  const { theme, setTheme } = useTheme();
  const buttonRef = useRef(null);
  const isDark = theme === "dark";

  const toggleTheme = useCallback(async () => {
    if (!buttonRef.current) return;

    await document.startViewTransition(() => {
      flushSync(() => {
        const newTheme = isDark ? "light" : "dark";
        setTheme(newTheme);
      });
    }).ready;

    const { top, left, width, height } =
      buttonRef.current.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const maxRadius = Math.hypot(
      Math.max(left, window.innerWidth - left),
      Math.max(top, window.innerHeight - top),
    );

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      },
    );
  }, [isDark, setTheme, duration]);

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      ref={buttonRef}
      onClick={toggleTheme}
      className={`cursor-pointer ${cn(className)}`}
      {...props}
    >
      {isDark ? <IconSun /> : <IconMoon />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};
