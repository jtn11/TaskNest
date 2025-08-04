"use client";
import { useState } from "react";
import { Menu, Button, Avatar, Divider } from "@mantine/core";
import { UserCircleIcon, UserIcon } from "@heroicons/react/24/outline";
import { useWorkspace } from "@/context/workspace-context";

interface AssigneeDropdownTypes {
  value: string;
  onChange: (val: string) => void;
}

export default function AssigneeDropdown({
  value,
  onChange,
}: AssigneeDropdownTypes) {
  const { members } = useWorkspace();

  const handleAssignee = (assignee: string) => {
    setAssignedTo(assignee);
    onChange(assignee);
  };

  const [assignedTo, setAssignedTo] = useState("Assignee");

  return (
    <div className="flex items-center gap-3 rounded-sm cursor-pointer">
      <Menu shadow="md" width={180} position="bottom-start" withArrow>
        <Menu.Target>
          <div className="inline-flex items-center gap-2 px-2 py-1 text-sm border border-gray-200 hover:bg-gray-100 rounded-lg ">
            <UserIcon className="w-4 h-4 text-blue-600" />
            <span>{assignedTo}</span>
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
                    handleAssignee(member.email.split("@")[0]);
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
