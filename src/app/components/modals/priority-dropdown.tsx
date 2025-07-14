"use client";

import { useState } from "react";
import { Popover } from "@mantine/core";
import {
  CheckIcon,
  EllipsisHorizontalCircleIcon,
} from "@heroicons/react/20/solid";

export default function PriorityDropdown() {
  const [opened, setOpened] = useState(false);
  const [selected, setSelected] = useState("Moderate");

  const handleSelect = (level: string) => {
    setSelected(level);
    setOpened(false);
  };

  return (
    <Popover
      opened={opened}
      onChange={setOpened}
      position="bottom-start"
      withArrow
      offset={8}
    >
      <Popover.Target>
        <div
          onClick={() => setOpened((o) => !o)}
          className="w-21 h-6 px-2 cursor-pointer flex items-center gap-2 rounded bg-gray-100 hover:bg-gray-200 transition"
        >
          <span className="text-sm text-gray-800 truncate">{selected}</span>
        </div>
      </Popover.Target>

      <Popover.Dropdown>
        <div className="w-40 bg-white rounded-md">
          {/* Low */}
          <div
            onClick={() => handleSelect("Low")}
            className={`flex items-center p-1 m-1 justify-between rounded cursor-pointer ${
              selected === "Low" ? "bg-gray-100" : "hover:bg-gray-50"
            }`}
          >
            <span className="text-sm ml-2">Low</span>
            {selected === "Low" && (
              <CheckIcon className="h-4 w-4 text-indigo-500 mr-1" />
            )}
          </div>

          {/* Moderate */}
          <div
            onClick={() => handleSelect("Moderate")}
            className={`flex items-center justify-between p-1 m-1 rounded cursor-pointer ${
              selected === "Moderate" ? "bg-gray-100" : "hover:bg-gray-50"
            }`}
          >
            <EllipsisHorizontalCircleIcon className="h-4 w-4 text-indigo-500" />

            <span className="text-sm ml-2">Moderate</span>
            {selected === "Moderate" && (
              <CheckIcon className="h-4 w-4 text-indigo-500 mr-1" />
            )}
          </div>

          {/* High */}
          <div
            onClick={() => handleSelect("High")}
            className={`flex items-center justify-between p-1 m-1 rounded cursor-pointer ${
              selected === "High" ? "bg-gray-100" : "hover:bg-gray-50"
            }`}
          >
            <span className="text-sm ml-2">High</span>
            {selected === "High" && (
              <CheckIcon className="h-4 w-4 text-indigo-500 mr-1" />
            )}
          </div>
        </div>
      </Popover.Dropdown>
    </Popover>
  );
}
