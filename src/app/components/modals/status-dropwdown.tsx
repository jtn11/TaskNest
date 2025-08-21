"use client";
import { useState } from "react";
import { Menu, Group, Divider } from "@mantine/core";
import {
  CheckCircleIcon,
  ClipboardDocumentListIcon,
  ClockIcon,
  StopCircleIcon,
} from "@heroicons/react/20/solid";
import { cn } from "@/lib/cn";
import { LifebuoyIcon } from "@heroicons/react/24/outline";

interface statusDropdownType {
  value?: string; // its basically to show in the detailed view -> that some value is already there
  onChange?: (val: string) => void;
  label?: string; // from task modal
  classname?: string;
  showOnlyIconsInList?: boolean;
}

export default function StatusDropdown({
  label,
  classname,
  value,
  onChange,
  showOnlyIconsInList,
}: statusDropdownType) {
  const [currentStatus, setCurrentStatus] = useState("todo");
  const [currentlabel, setCurrentlabel] = useState<string | undefined>("todo");

  const handleSelect = (status: string, label: string) => {
    setCurrentStatus(status);
    setCurrentlabel(label);
    if (onChange) {
      onChange(status);
    }
  };

  function StatusIcon({ status }: { status: string }) {
    switch (status) {
      case "backlog":
        return <StopCircleIcon className="w-4 h-4" />;
      case "in-progress":
        return <ClockIcon className="w-4 h-4 text-yellow-500" />;
      case "review":
        return <ClipboardDocumentListIcon className="w-4 h-4 text-green-600" />;
      case "completed":
        return <CheckCircleIcon className="w-4 h-4 text-blue-600" />;
      default:
        return <LifebuoyIcon className="w-4 h-4" />;
    }
  }

  const displayLabel = label === "status" ? currentlabel : label;

  return (
    <div className="flex items-center gap-3 borderq rounded-sm cursor-pointer">
      <Menu shadow="md" width={180} position="bottom-start" withArrow>
        <Menu.Target>
          <div
            className={cn(
              "inline-flex items-center text-sm border border-gray-200 hover:bg-gray-100 rounded-lg",
              showOnlyIconsInList
                ? "px-1 py-1 border-none cursor-default"
                : "gap-2 px-2 py-1 cursor-pointer",
            )}
          >
            <StatusIcon status={value || currentStatus} />
            {!showOnlyIconsInList && (value || displayLabel) && (
              <span>{value || displayLabel}</span>
            )}
          </div>
        </Menu.Target>

        <Menu.Dropdown className="bg-white border border-gray-200 rounded-b-lg shadow-lg">
          <Menu.Label className="px-4 py-2">
            <Group className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-gray-700 mt-1 text-sm font-medium">
                  Change Status...
                </span>
              </div>
            </Group>
          </Menu.Label>

          <Divider className="border-t border-gray-100 pb-1" />

          <div className="w-full">
            <Menu.Item
              component="div"
              className="hover:bg-transparent"
              onClick={() => handleSelect("todo", "Todo")}
            >
              <div className="flex items-center space-x-2">
                <LifebuoyIcon className="w-4 h-4 flex items-center justify-center text-xs font-medium" />
                <span className="text-sm text-gray-600">Todo</span>
              </div>
            </Menu.Item>

            <Menu.Item
              component="div"
              className="hover:bg-transparent"
              onClick={() => handleSelect("backlog", "Backlog")}
            >
              <div className="flex items-center space-x-2">
                <StopCircleIcon
                  radius="xl"
                  className="w-4 h-4 flex items-center justify-center text-xs font-medium"
                ></StopCircleIcon>
                <span className="text-sm text-gray-600">Backlog</span>
              </div>
            </Menu.Item>

            <Menu.Item
              component="div"
              className=" hover:bg-transparent"
              onClick={() => handleSelect("in-progress", "In-Progress")}
            >
              <div className="flex items-center space-x-2">
                <ClockIcon
                  radius="xl"
                  className="w-4 h-4 flex items-center justify-center text-yellow-500 text-xs font-medium"
                ></ClockIcon>
                <span className="text-sm text-gray-600">In-Progress</span>
              </div>
            </Menu.Item>

            <Menu.Item
              component="div"
              className="hover:bg-transparent"
              onClick={() => handleSelect("review", "In-Review")}
            >
              <div className="flex items-center space-x-2">
                <ClipboardDocumentListIcon
                  radius="xl"
                  className="w-4 h-4 flex items-center justify-center text-green-600 text-xs font-medium"
                ></ClipboardDocumentListIcon>
                <span className="text-sm text-gray-600">In-Review</span>
              </div>
            </Menu.Item>

            <Menu.Item
              component="div"
              className="hover:bg-transparent"
              onClick={() => handleSelect("completed", "Completed")}
            >
              <div className="flex items-center space-x-2">
                <CheckCircleIcon className="w-4 h-4 flex items-center justify-center text-blue-600 text-xs font-medium"></CheckCircleIcon>
                <span className="text-sm text-gray-600">Completed</span>
              </div>
            </Menu.Item>
          </div>
        </Menu.Dropdown>
      </Menu>
    </div>
  );
}
