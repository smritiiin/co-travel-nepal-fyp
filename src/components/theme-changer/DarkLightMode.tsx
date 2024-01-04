import React from "react";
import { Switch } from "@nextui-org/react";
import { IoMdSunny } from "react-icons/io";
import { FaMoon } from "react-icons/fa";


export default function DarkLightMode() {
  return (
    <Switch
      defaultSelected
      size="lg"
      color="default"
      startContent={<IoMdSunny />}
      endContent={<FaMoon />}
    >
    </Switch>
  );
}
