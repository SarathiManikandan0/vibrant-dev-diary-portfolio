
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../ThemeProvider";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-secondary-foreground transition-all hover:bg-secondary/80"
      aria-label="Toggle theme"
    >
      <div className="relative">
        <Sun
          className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform transition-all ${
            theme === "dark" ? "scale-0 opacity-0" : "scale-100 opacity-100"
          }`}
          size={18}
        />
        <Moon
          className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform transition-all ${
            theme === "dark" ? "scale-100 opacity-100" : "scale-0 opacity-0"
          }`}
          size={18}
        />
      </div>
    </button>
  );
}
