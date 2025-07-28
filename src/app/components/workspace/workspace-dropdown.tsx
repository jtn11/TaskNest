"use client";
import { useWorkspace } from "@/context/workspace-context";
import { PlusIcon } from "@heroicons/react/24/outline";
import { HomeIcon } from "@heroicons/react/24/solid"; // Using 24 for consistency if available, otherwise 16
import { Menu, Group, Divider, Avatar, Tooltip } from "@mantine/core";
import { useRouter } from "next/navigation";

export const WorkSpaceDropdown = () => {
  const { workspaces } = useWorkspace();
  const router = useRouter();

  return (
    <Menu shadow="md" width={240} position="bottom-start" withArrow>
      <Menu.Target>
        <Tooltip className="text-xs" label="Manage Workspaces">
          <div className="flex items-center gap-1 rounded-full p-2 hover:bg-gray-100 shadow-md cursor-pointer">
            <HomeIcon className="w-5 h-5 " />
          </div>
        </Tooltip>
      </Menu.Target>

      <Menu.Dropdown className="bg-white border border-gray-200 rounded-b-lg shadow-lg">
        {/* Members Section */}
        <Menu.Label className="px-4 py-2">
          <Group className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <HomeIcon className="w-4 h-4 text-gray-600 mr-2" />
              <span className="text-gray-700 text-sm font-medium">
                Workspaces
              </span>
            </div>
            <span className="text-xs ml-15 text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              {workspaces.length}
            </span>
          </Group>
        </Menu.Label>

        <div className="space-y-2">
          {workspaces.map((WorkSpace) => (
            <Menu.Item
              key={WorkSpace.id}
              component="div"
              className="py-0 px-0 hover:bg-transparent"
            >
              {/* No hover, no padding */}
              <div className="flex items-center space-x-2">
                <Avatar
                  color="blue"
                  radius="xl"
                  size="sm"
                  className="w-6 h-6 flex items-center justify-center text-white text-xs font-medium"
                >
                  W
                </Avatar>
                <span className="text-sm text-gray-600">{WorkSpace.name}</span>
              </div>
            </Menu.Item>
          ))}
        </div>

        {/* Divider */}
        <Divider className="border-t border-gray-100 my-1" />

        {/* Add Member Button */}
        <Menu.Item
          className="flex items-center w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-150"
          onClick={() => router.push("/workspaces")}
          leftSection={<PlusIcon className="w-4 h-4 text-gray-600 mr-3" />}
        >
          <span className="text-gray-700 text-sm font-medium">
            Add Workspace
          </span>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
