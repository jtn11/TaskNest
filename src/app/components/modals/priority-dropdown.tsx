"use client";

import { useEffect, useState } from "react";
import { Menu, Button, Divider } from "@mantine/core";
import {
  ArrowDownCircleIcon,
  EllipsisHorizontalCircleIcon,
  ArrowUpCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/outline";
import { cn } from "@/lib/cn";
import { useAuth } from "@/context/auth-context";
import { useWorkspace } from "@/context/workspace-context";
import { updateTasks } from "./update-dropdowns";

interface PriorityDropdownTypes {
  value?: string;
  onChange?: (val: string) => void;
  ShowOnlyPriorityIcon?: boolean;
  label?: string;
  createMode?: boolean;
  selectedListId?: string;
}

export default function PriorityDropdown({
  onChange,
  value,
  label,
  ShowOnlyPriorityIcon,
  selectedListId,
  createMode,
}: PriorityDropdownTypes) {
  const [priority, setPriority] = useState("Priority");
  const [currentlabel, setCurrentlabel] = useState<string | undefined>(
    "Priority",
  );
  const { currentUser } = useAuth();
  const { activeWorkspace } = useWorkspace();

  const handlePriority = async (Priority: string, label: string) => {
    setPriority(Priority);
    setCurrentlabel(label);
    if (onChange) {
      onChange(Priority);
    }

    if (createMode) {
      return;
    }
    const userToken = await currentUser?.getIdToken();
    const workspaceId = activeWorkspace?.id;
    if (!userToken || !selectedListId || !workspaceId) {
      return;
    }

    await updateTasks(userToken, selectedListId, workspaceId, {
      priority: Priority,
    });
  };

  function PriorityIcon({ priority }: { priority: string }) {
    switch (priority) {
      case "low":
        return <ArrowDownCircleIcon className="w-5 h-5" />;
      case "medium":
        return <ArrowRightCircleIcon className="w-5 h-5" />;
      case "high":
        return <ArrowUpCircleIcon className="w-5 h-5" />;
      default:
        return <EllipsisHorizontalCircleIcon className="w-5 h-5" />;
    }
  }

  useEffect(() => {
    if (value) {
      setPriority(value);
      setCurrentlabel(value);
    }
  }, [value]);

  const displayLabel = label === "priority" ? currentlabel : label;

  return (
    <div className="flex items-center gap-3 rounded-sm cursor-pointer">
      <Menu shadow="md" width={180} position="bottom-start" withArrow>
        <Menu.Target>
          <div
            className={cn(
              "inline-flex items-center gap-2 px-2 py-1 text-sm border border-gray-200 hover:bg-gray-100 rounded-lg",
              ShowOnlyPriorityIcon
                ? "px-1 py-1 border-none cursor-default"
                : "gap-2 py-1 cursor-pointer",
            )}
          >
            <PriorityIcon priority={priority} />
            {!ShowOnlyPriorityIcon && currentlabel && (
              <span>{currentlabel}</span>
            )}
          </div>
        </Menu.Target>

        <Menu.Dropdown className="bg-white border border-gray-200 rounded-b-lg shadow-lg">
          <span className="pl-2 pb-2 text-sm font-medium">Set Priority...</span>
          <Divider className="border-t border-gray-100 my-1" />
          <div className="w-full">
            <Menu.Item
              component="div"
              className="hover:bg-transparent"
              onClick={() => handlePriority("low", "Low")}
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
              onClick={() => handlePriority("medium", "Medium")}
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
              onClick={() => handlePriority("high", "High")}
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
