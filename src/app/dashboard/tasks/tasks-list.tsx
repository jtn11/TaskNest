import StatusDropdown from "@/app/components/status-dropdown";
import { ArrowLeftIcon, LifebuoyIcon } from "@heroicons/react/24/outline";
import { ChartBarIcon, CheckCircleIcon, ClipboardDocumentListIcon, ClockIcon, StopCircleIcon } from "@heroicons/react/24/solid";
import { Divider, Group, Menu } from "@mantine/core";
import { useState } from "react";

export const TaskList = () => {
  const [expandTask, setExpandTask] = useState(true);


  if (expandTask) {
    return (
      <div className="w-full space-y-2 py-4 overflow-y-auto">
        <div className="flex items-center gap-3 border border-gray-100 rounded-sm px-4 py-1 bg-white  hover:bg-gray-50 transition cursor-pointer">
          {/* <StatusDropdown/> */}

              <Menu shadow="md" width={220} position="bottom-start" withArrow>
            <Menu.Target>
              <LifebuoyIcon className="w-4 h-4" />
            </Menu.Target>

      <Menu.Dropdown className="bg-white border border-gray-200 rounded-b-lg shadow-lg">
        <Menu.Label className="px-4 py-2">
          <Group className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <ChartBarIcon className="w-4 h-4 text-gray-600 mr-2" />
              <span className="text-gray-700 mt-1 text-sm font-medium">Change Status</span>
            </div>
          </Group>
        </Menu.Label>

          <Divider className="border-t border-gray-100 my-1" />

        <div className="w-full space-y-2">
                    <Menu.Item component="div" className="hover:bg-transparent">
            
            <div className="flex items-center space-x-2">
              <StopCircleIcon
                radius="xl"
                className="w-4 h-4 flex items-center justify-center text-xs font-medium"
              >
              </StopCircleIcon>
              <span className="text-sm text-gray-600">Backlog</span>
            </div>
          </Menu.Item>

          <Menu.Item component="div" className=" hover:bg-transparent">
            <div className="flex items-center space-x-2">
              <ClockIcon
                radius="xl"
                className="w-4 h-4 flex items-center justify-center text-yellow-500 text-xs font-medium"
              >
              </ClockIcon>
              <span className="text-sm text-gray-600">In-Progress</span>
            </div>
          </Menu.Item>

          <Menu.Item component="div" className="hover:bg-transparent">
            <div className="flex items-center space-x-2">
              <ClipboardDocumentListIcon
                radius="xl"
                className="w-4 h-4 flex items-center justify-center text-green-600 text-xs font-medium"
              >
              </ClipboardDocumentListIcon>
              <span className="text-sm text-gray-600">In-Review</span>
            </div>
          </Menu.Item>

          <Menu.Item component="div" className="hover:bg-transparent">
            <div className="flex items-center space-x-2">
              <CheckCircleIcon
                radius="xl"
                className="w-4 h-4 flex items-center justify-center text-blue-600 text-xs font-medium"
              >
              </CheckCircleIcon>
              <span className="text-sm text-gray-600">Completed</span>
            </div>
          </Menu.Item>
        </div>

      </Menu.Dropdown>
    </Menu>

          <div className="w-full" onClick={() => setExpandTask(false)}>
            <span>This is the first task </span>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <ArrowLeftIcon
          className="w-4 h-4"
          onClick={() => setExpandTask(true)}
        />
        <span>detailed view</span>
      </div>
    );
  }
};
