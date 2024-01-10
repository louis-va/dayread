import { LuMoon, LuSun } from "react-icons/lu";

import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ui/theme-provider";
import Typography from "@/features/Typography";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <Button variant="outline" size="default">
      <div
        className="flex gap-2 scale-100 transition-all dark:scale-0"
        onClick={() => setTheme("dark")}
      >
        <LuSun className="h-[1.2rem] w-[1.2rem] " />
        <Typography>Light mode</Typography>
      </div>
      <div
        className="absolute flex gap-2 scale-0 transition-all dark:scale-100"
        onClick={() => setTheme("light")}
      >
        <LuMoon className=" h-[1.2rem] w-[1.2rem]" />
        <Typography>Dark mode</Typography>
      </div>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
