"use client";

import { useState } from "react";
import { Menu, Button, Divider } from "@mantine/core";
import {
  ArrowDownCircleIcon,
  EllipsisHorizontalCircleIcon,
  ArrowUpCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/outline";

export default function PriorityDropdown() {
  const [opened, setOpened] = useState(false);

  // if(opened){
  return (
    <div className="flex items-center gap-3 rounded-sm cursor-pointer">
      <Menu shadow="md" width={180} position="bottom-start" withArrow>
        <Menu.Target>
          <Button
            variant="default"
            size="xs"
            radius="md"
            leftSection={<EllipsisHorizontalCircleIcon className="w-4 h-4" />}
            className=" rounded-sm flex items-center border border-gray-200"
          >
            Priority
          </Button>
        </Menu.Target>

        <Menu.Dropdown className="bg-white border border-gray-200 rounded-b-lg shadow-lg">
          <span className="pl-2 pb-2 text-sm font-medium">Set Priority...</span>
          <Divider className="border-t border-gray-100 my-1" />
          <div className="w-full">
            <Menu.Item component="div" className="hover:bg-transparent">
              <div className="flex items-center space-x-2">
                <ArrowDownCircleIcon
                  radius="xl"
                  className="w-5 h-5 flex items-center justify-center text-xs font-medium"
                />
                <span className="text-sm text-gray-600">low</span>
              </div>
            </Menu.Item>

            <Menu.Item component="div" className=" hover:bg-transparent">
              <div className="flex items-center space-x-2">
                <ArrowRightCircleIcon
                  radius="xl"
                  className="w-5 h-5 flex items-center justify-center text-xs font-medium"
                />
                <span className="text-sm text-gray-600">Moderate</span>
              </div>
            </Menu.Item>

            <Menu.Item component="div" className="hover:bg-transparent">
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
