"use client";
import { useState } from "react";
import { Menu, Button, Avatar, Divider } from "@mantine/core";
import { UserCircleIcon, UserIcon } from "@heroicons/react/24/outline";
import { useWorkspace } from "@/context/workspace-context";
import { cn } from "@/lib/cn";

interface AssigneeDropdownTypes {
  value?: string;
  onChange?: (val: string) => void;
  ShowOnlyUSerIcon?: boolean;
}

export default function AssigneeDropdown({
  value,
  onChange,
  ShowOnlyUSerIcon,
}: AssigneeDropdownTypes) {
  const { members } = useWorkspace();

  const handleAssignee = (assignee: string) => {
    setAssignedTo(assignee);
    if (onChange) {
      onChange(assignee);
    }
  };

  const [assignedTo, setAssignedTo] = useState("Assignee");

  return (
    <div className="flex items-center gap-3 rounded-sm cursor-pointer">
      <Menu shadow="md" width={180} position="bottom-start" withArrow>
        <Menu.Target>
          <div
            className={cn(
              "inline-flex items-center gap-2 text-sm border border-gray-200 hover:bg-gray-100 rounded-lg",
              ShowOnlyUSerIcon
                ? "border border-none "
                : "border border-none px-2 py-1 ",
            )}
          >
            <Avatar
              color="blue"
              size="sm"
              className="flex items-center justify-center text-white text-xs font-medium"
            >
              {value ? value.charAt(0).toUpperCase() : "U"}
            </Avatar>
            {!ShowOnlyUSerIcon && <span>{value}</span>}
          </div>
        </Menu.Target>

        <Menu.Dropdown className="bg-white border w-full border-gray-200 rounded-b-lg shadow-lg">
          <span className="text-sm font-medium justify-center pl-2 pb-2">
            Team Members...
          </span>
          <Divider className="border-t border-gray-100 my-1" />
          <div className="w-full">
            {members.map((member) => (
              <Menu.Item
                key={member.uid}
                component="div"
                className="py-0 px-0 hover:bg-transparent"
                onClick={() => {
                  if (member.email) {
                    handleAssignee(member.email);
                  }
                }}
              >
                <div className="flex items-center space-x-2">
                  <UserCircleIcon className="w-4 h-4 text-blue-500 flex items-center justify-center text-xs font-medium" />
                  <span className="text-sm text-gray-600">
                    {member.email?.split("@")[0]}
                  </span>
                </div>
              </Menu.Item>
            ))}
          </div>
        </Menu.Dropdown>
      </Menu>
    </div>
  );
}
