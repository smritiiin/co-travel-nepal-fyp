import React from "react";
import { Spinner } from "@nextui-org/react";

export default function Loading() {
  return (
    <div className="flex justify-center  items-center p-5">
      <Spinner size="lg" label="Loading..." />
    </div>
  );
}
