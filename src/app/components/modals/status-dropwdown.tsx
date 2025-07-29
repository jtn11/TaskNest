"use client";
import { useState } from "react";
import { clsx } from "clsx";
import { Menu, Group, Divider, Button } from "@mantine/core";
import {
  ChartBarIcon,
  CheckCircleIcon,
  ClipboardDocumentListIcon,
  ClockIcon,
  StopCircleIcon,
} from "@heroicons/react/20/solid";
import { cn } from "@/lib/cn";

interface statusDropdownType {
  button?: React.ReactNode;
  icon?: React.ReactNode;
  label?: String;
  classname?: string;
}

export default function StatusDropdown({
  icon,
  button,
  label,
  classname,
}: statusDropdownType) {
  const [opened, setOpened] = useState(false);

  // if(opened){
  return (
    <div className="flex items-center gap-3 borderq rounded-sm cursor-pointer">
      {/* <StatusDropdown/> */}
      <Menu shadow="md" width={180} position="bottom-start" withArrow>
        <Menu.Target>
          {button ? (
            button
          ) : (
            <Button
              variant="default"
              size="xs"
              radius="md"
              leftSection={<ChartBarIcon className="w-4 h-4 text-indigo-500" />}
              className={cn(
                "rounded-sm flex items-center border border-gray-200",
                classname,
              )}
            >
              {label}
            </Button>
          )}
        </Menu.Target>

        <Menu.Dropdown className="bg-white border border-gray-200 rounded-b-lg shadow-lg">
          <Menu.Label className="px-4 py-2">
            <Group className="flex items-center justify-between">
              <div className="flex items-center">
                <ChartBarIcon className="w-4 h-4 text-gray-600 mr-2" />
                <span className="text-gray-700 mt-1 text-sm font-medium">
                  Change Status
                </span>
              </div>
            </Group>
          </Menu.Label>

          <Divider className="border-t border-gray-100 pb-1" />

          <div className="w-full">
            <Menu.Item component="div" className="hover:bg-transparent">
              <div className="flex items-center space-x-2">
                <StopCircleIcon
                  radius="xl"
                  className="w-4 h-4 flex items-center justify-center text-xs font-medium"
                ></StopCircleIcon>
                <span className="text-sm text-gray-600">Backlog</span>
              </div>
            </Menu.Item>

            <Menu.Item component="div" className=" hover:bg-transparent">
              <div className="flex items-center space-x-2">
                <ClockIcon
                  radius="xl"
                  className="w-4 h-4 flex items-center justify-center text-yellow-500 text-xs font-medium"
                ></ClockIcon>
                <span className="text-sm text-gray-600">In-Progress</span>
              </div>
            </Menu.Item>

            <Menu.Item component="div" className="hover:bg-transparent">
              <div className="flex items-center space-x-2">
                <ClipboardDocumentListIcon
                  radius="xl"
                  className="w-4 h-4 flex items-center justify-center text-green-600 text-xs font-medium"
                ></ClipboardDocumentListIcon>
                <span className="text-sm text-gray-600">In-Review</span>
              </div>
            </Menu.Item>

            <Menu.Item component="div" className="hover:bg-transparent">
              <div className="flex items-center space-x-2">
                <CheckCircleIcon
                  radius="xl"
                  className="w-4 h-4 flex items-center justify-center text-blue-600 text-xs font-medium"
                ></CheckCircleIcon>
                <span className="text-sm text-gray-600">Completed</span>
              </div>
            </Menu.Item>
          </div>
        </Menu.Dropdown>
      </Menu>
    </div>
  );
}
