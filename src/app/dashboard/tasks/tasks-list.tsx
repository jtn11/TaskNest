import StatusDropdown from "@/app/components/status-dropdown";
import { ArrowLeftIcon, LifebuoyIcon } from "@heroicons/react/24/outline";
import { Button, Menu } from "@mantine/core";
import { useState } from "react";

export const TaskList = () => {
  const [expandTask, setExpandTask] = useState(true);

  const toggleTask = () => {
    setExpandTask(true);
  };

  if (expandTask) {
    return (
      <div className="w-full space-y-2 py-4 overflow-y-auto">
        <div className="flex items-center gap-3 border border-gray-100 rounded-sm px-4 py-1 bg-white  hover:bg-gray-50 transition cursor-pointer">
          {/* <StatusDropdown/> */}
          <Menu width={200} position="bottom-start">
            <Menu.Target>
              <LifebuoyIcon className="w-4 h-5" />
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item>Change Status</Menu.Item>

              <Menu.Sub>
                <Menu.Sub.Target>
                  <Menu.Sub.Item>In-Progress</Menu.Sub.Item>
                </Menu.Sub.Target>
              </Menu.Sub>

              <Menu.Sub>
                <Menu.Sub.Target>
                  <Menu.Sub.Item>In-Review</Menu.Sub.Item>
                </Menu.Sub.Target>
              </Menu.Sub>

              <Menu.Sub>
                <Menu.Sub.Target>
                  <Menu.Sub.Item>Completed</Menu.Sub.Item>
                </Menu.Sub.Target>
              </Menu.Sub>
            </Menu.Dropdown>
          </Menu>

          <div className="w-full" onClick={() => setExpandTask(false)}>
            <span>This is the first task </span>
          </div>
        </div>

        <div className="flex items-center gap-3 border border-gray-100 rounded-sm px-4 py-1 bg-white  hover:bg-gray-50 transition cursor-pointer">
          <Menu width={200} position="bottom-start">
            <Menu.Target>
              <LifebuoyIcon className="w-4 h-5" />
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item>Change Status</Menu.Item>

              <Menu.Sub>
                <Menu.Sub.Target>
                  <Menu.Sub.Item>In-Progress</Menu.Sub.Item>
                </Menu.Sub.Target>
              </Menu.Sub>

              <Menu.Sub>
                <Menu.Sub.Target>
                  <Menu.Sub.Item>In-Review</Menu.Sub.Item>
                </Menu.Sub.Target>
              </Menu.Sub>

              <Menu.Sub>
                <Menu.Sub.Target>
                  <Menu.Sub.Item>Completed</Menu.Sub.Item>
                </Menu.Sub.Target>
              </Menu.Sub>
            </Menu.Dropdown>
          </Menu>
          {/* <StatusDropdown/> */}
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
