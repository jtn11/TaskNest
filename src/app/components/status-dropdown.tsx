"use client";

import { useState } from "react";
import { Popover } from "@mantine/core";
import {
  CheckCircleIcon,
  ClockIcon,
  CheckIcon,
  EllipsisHorizontalCircleIcon,
} from "@heroicons/react/20/solid";
import { ArrowUpOnSquareIcon } from "@heroicons/react/24/outline";

export default function StatusDropdown() {
  const [opened, setOpened] = useState(false);
  const [selected, setSelected] = useState("Backlog");

  const handleSelect = (label: string) => {
    setSelected(label);
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
          className="w-25 text-sm h-6 p-1 cursor-pointer flex items-center justify-center border border-gray-100  hover:bg-gray-200 transition rounded bg-gray-100"
        >
          <span>{selected}</span>
        </div>
      </Popover.Target>

      <Popover.Dropdown>
        <div className="w-45 rounded-md bg-white">
          {/* Backlog */}
          <div
            onClick={() => handleSelect("Backlog")}
            className={`flex justify-between items-center p-2 rounded cursor-pointer ${
              selected === "Backlog" ? "bg-gray-100" : "hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center gap-2">
              <EllipsisHorizontalCircleIcon className="h-4 w-4 text-indigo-500" />
              <span className="text-sm">Backlog</span>
            </div>
            {selected === "Backlog" && (
              <CheckIcon className="h-4 w-4 text-indigo-500" />
            )}
          </div>

          {/* Todo */}
          <div
            onClick={() => handleSelect("Todo")}
            className={`flex justify-between items-center p-2 rounded cursor-pointer ${
              selected === "Todo" ? "bg-gray-100" : "hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center gap-2">
              <ArrowUpOnSquareIcon className="h-4 w-4 text-gray-600" />
              <span className="text-sm">Todo</span>
            </div>
            {selected === "Todo" && (
              <CheckIcon className="h-4 w-4 text-indigo-500" />
            )}
          </div>

          {/* In Progress */}
          <div
            onClick={() => handleSelect("In Progress")}
            className={`flex justify-between items-center p-2 rounded cursor-pointer ${
              selected === "In Progress" ? "bg-gray-100" : "hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center gap-2">
              <ClockIcon className="h-4 w-4 text-yellow-500" />
              <span className="text-sm">In Progress</span>
            </div>
            {selected === "In Progress" && (
              <CheckIcon className="h-4 w-4 text-indigo-500" />
            )}
          </div>

          {/* Completed */}
          <div
            onClick={() => handleSelect("Completed")}
            className={`flex justify-between items-center p-2 rounded cursor-pointer ${
              selected === "Completed" ? "bg-gray-100" : "hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center gap-2">
              <CheckCircleIcon className="h-4 w-4 text-blue-600" />
              <span className="text-sm">Completed</span>
            </div>
            {selected === "Completed" && (
              <CheckIcon className="h-4 w-4 text-indigo-500" />
            )}
          </div>
        </div>
      </Popover.Dropdown>
    </Popover>
  );
}
