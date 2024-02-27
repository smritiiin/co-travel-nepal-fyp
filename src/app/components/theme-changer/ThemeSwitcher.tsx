import React from "react";
import { Switch, Button, select } from "@nextui-org/react";
import { IoMdSunny } from "react-icons/io";
import { FaMoon } from "react-icons/fa";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function DarkLightMode() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [isSelected, setIsSelected] = useState(theme === "light");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleThemeChange = (selectedTheme: any) => {
    setIsSelected(selectedTheme === "light");
    setTheme(selectedTheme);
  };

  return (
    <div className="flex gap-4">
      {/* <Button size="sm" variant="flat" onClick={() => setTheme("light")}>
        Light
      </Button>
      <Button size="sm" variant="flat" onClick={() => setTheme("dark")}>
        Dark
      </Button> */}

      <Switch
        isSelected={isSelected}
        onValueChange={() => handleThemeChange(isSelected ? "dark" : "light")}
        defaultSelected
        size="lg"
        color="default"
        startContent={<IoMdSunny />}
        endContent={<FaMoon />}
      ></Switch>
    </div>
  );
}
