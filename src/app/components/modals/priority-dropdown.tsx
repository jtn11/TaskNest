"use client";

import { useState } from "react";
import { Menu, Button, Divider } from "@mantine/core";
import {
  ArrowDownCircleIcon,
  EllipsisHorizontalCircleIcon,
  ArrowUpCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/outline";

interface PriorityDropdownTypes {
  value?: string;
  onChange?: (val: string) => void;
}

export default function PriorityDropdown({
  value,
  onChange,
}: PriorityDropdownTypes) {
  const [priority, setPriority] = useState("Priority");

  const handlePriority = (Priority: string) => {
    setPriority(Priority);
    if (onChange) {
      onChange(Priority);
    }
  };

  return (
    <div className="flex items-center gap-3 rounded-sm cursor-pointer">
      <Menu shadow="md" width={180} position="bottom-start" withArrow>
        <Menu.Target>
          <div className="inline-flex items-center gap-2 px-2 py-1 text-sm border border-gray-200 hover:bg-gray-100 rounded-lg ">
            {
              priority === "low" ? (
                <ArrowDownCircleIcon className="w-4 h-4" />
              ) : priority === "medium" ? (
                <ArrowRightCircleIcon className="w-4 h-4" />
              ) : priority === "high" ? (
                <ArrowUpCircleIcon className="w-4 h-4 " />
              ) : (
                <EllipsisHorizontalCircleIcon className="w-4 h-4" />
              ) // default
            }
            <span>{priority}</span>
          </div>
        </Menu.Target>

        <Menu.Dropdown className="bg-white border border-gray-200 rounded-b-lg shadow-lg">
          <span className="pl-2 pb-2 text-sm font-medium">Set Priority...</span>
          <Divider className="border-t border-gray-100 my-1" />
          <div className="w-full">
            <Menu.Item
              component="div"
              className="hover:bg-transparent"
              onClick={() => handlePriority("low")}
            >
              <div className="flex items-center space-x-2">
                <ArrowDownCircleIcon
                  radius="xl"
                  className="w-5 h-5 flex items-center justify-center text-xs font-medium"
                />
                <span className="text-sm text-gray-600">Low</span>
              </div>
            </Menu.Item>

            <Menu.Item
              component="div"
              className=" hover:bg-transparent"
              onClick={() => handlePriority("medium")}
            >
              <div className="flex items-center space-x-2">
                <ArrowRightCircleIcon
                  radius="xl"
                  className="w-5 h-5 flex items-center justify-center text-xs font-medium"
                />
                <span className="text-sm text-gray-600">Moderate</span>
              </div>
            </Menu.Item>

            <Menu.Item
              component="div"
              className="hover:bg-transparent"
              onClick={() => handlePriority("high")}
            >
              <div className="flex items-center space-x-2">
                <ArrowUpCircleIcon
                  radius="xl"
                  className="w-5 h-5 flex items-center justify-center text-xs font-medium"
                />
                <span className="text-sm text-gray-600">High</span>
              </div>
            </Menu.Item>
          </div>
        </Menu.Dropdown>
      </Menu>
    </div>
  );
}
