"use client";
import { useState } from "react";
import { Menu, Button, Avatar, Divider } from "@mantine/core";
import { UserCircleIcon, UserIcon } from "@heroicons/react/24/outline";
import { useWorkspace } from "@/context/workspace-context";

export default function AssigneeDropdown() {
  const [opened, setOpened] = useState(false);
  const { members } = useWorkspace();

  return (
    <div className="flex items-center gap-3 rounded-sm cursor-pointer">
      <Menu shadow="md" width={180} position="bottom-start" withArrow>
        <Menu.Target>
          <Button
            variant="default"
            size="xs"
            radius="md"
            leftSection={<UserIcon className="w-4 h-4 text-blue-600" />}
            className=" rounded-sm flex items-center border border-gray-200"
          >
            Assignee
          </Button>
        </Menu.Target>
        <Menu.Dropdown className="bg-white border w-full border-gray-200 rounded-b-lg shadow-lg">
          <span className="text-xs justify-center pl-10 pb-2">
            Team Members
          </span>
          <Divider className="border-t border-gray-100 my-1" />
          <div className="w-full">
            {members.map((member) => (
              <Menu.Item
                key={member.uid}
                component="div"
                className="py-0 px-0 hover:bg-transparent"
              >
                <div className="flex items-center space-x-2">
                  <UserCircleIcon className="w-4 h-4 text-blue-500 flex items-center justify-center text-xs font-medium" />
                  <span className="text-sm text-gray-600">
                    {member.username}
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
