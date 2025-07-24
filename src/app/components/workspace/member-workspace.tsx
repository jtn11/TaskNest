"use client";
import {
  ChevronDownIcon,
  HomeIcon,
  UserPlusIcon,
  UsersIcon,
} from "@heroicons/react/24/solid"; // Using 24 for consistency if available, otherwise 16
import { Menu, Button, Group, Text, Divider, Avatar } from "@mantine/core";
import { useWorkspace } from "@/context/workspace-context";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

export const MemberWorkSpace = () => {
  const { workspaces , activeWorkspace } = useWorkspace();

  // useEffect(()=>{
  //   const fetchWorkspace = async()=>{
  //     if(currentUser){
  //       const data  = await c
  //     }
  //   }
  // })

  return (
    <Menu shadow="md" width={240} position="bottom-start" withArrow>
      <Menu.Target>
        <Button
          variant="transparent" // Mantine variant to remove default button styles
          fullWidth
          className="flex items-center justify-between w-full px-4 py-3 text-left bg-white hover:bg-gray-50 border-b border-gray-200 transition-colors duration-200"
          styles={{
            inner: { justifyContent: "space-between", alignItems: "center" },
            label: { flexGrow: 1 },
          }}
        >
          <div className="flex items-center justify-center space-x-3">
            <HomeIcon className="w-4 h-4 text-gray-700" />
            <span className="font-medium text-gray-900 text-sm">
              {activeWorkspace ? activeWorkspace.name : "Workspace"}
            </span>

            <ChevronDownIcon className="w-4 h-4 mt-1 text-gray-600 transition-transform duration-220" />
          </div>
        </Button>
      </Menu.Target>

      <Menu.Dropdown className="bg-white border border-gray-200 rounded-b-lg shadow-lg">
        {/* Members Section */}
        <Menu.Label className="px-4 py-2">
          <Group className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <UsersIcon className="w-4 h-4 text-gray-600 mr-2" />
              <span className="text-gray-700 text-sm font-medium">Members</span>
            </div>
            <span className="text-xs ml-20 text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              3
            </span>
          </Group>
        </Menu.Label>

        {/* Member List */}
        <div className="space-y-2 ml-6">
          <Menu.Item component="div" className="py-0 px-0 hover:bg-transparent">
            {" "}
            {/* No hover, no padding */}
            <div className="flex items-center space-x-2">
              <Avatar
                color="blue"
                radius="xl"
                size="sm"
                className="w-6 h-6 flex items-center justify-center text-white text-xs font-medium"
              >
                J
              </Avatar>
              <span className="text-sm text-gray-600">John Doe</span>
            </div>
          </Menu.Item>
          <Menu.Item component="div" className="py-0 px-0 hover:bg-transparent">
            <div className="flex items-center space-x-2">
              <Avatar
                color="green"
                radius="xl"
                size="sm"
                className="w-6 h-6 flex items-center justify-center text-white text-xs font-medium"
              >
                S
              </Avatar>
              <span className="text-sm text-gray-600">Sarah Smith</span>
            </div>
          </Menu.Item>
          <Menu.Item component="div" className="py-0 px-0 hover:bg-transparent">
            <div className="flex items-center space-x-2">
              <Avatar
                color="purple"
                radius="xl"
                size="sm"
                className="w-6 h-6 flex items-center justify-center text-white text-xs font-medium"
              >
                M
              </Avatar>
              <span className="text-sm text-gray-600">Mike Johnson</span>
            </div>
          </Menu.Item>
        </div>

        {/* Divider */}
        <Divider className="border-t border-gray-100 my-1" />

        {/* Add Member Button */}
        <Menu.Item
          className="flex items-center w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-150"
          onClick={() => console.log("Add Member clicked")}
          leftSection={<UserPlusIcon className="w-4 h-4 text-gray-600 mr-3" />}
        >
          <span className="text-gray-700 text-sm font-medium">Add Member</span>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
