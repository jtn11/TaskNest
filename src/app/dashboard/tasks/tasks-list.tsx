import StatusDropdown from "@/app/components/modals/status-dropwdown";
import {
  ArrowLeftIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/outline";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

export const TaskList = () => {
  const [expandTask, setExpandTask] = useState(true);

  if (expandTask) {
    return (
      <>
        <div className="w-full overflow-y-auto p-2 hover:bg-gray-100">
          <div className="flex items-center gap-3 rounded-sm px-4 cursor-pointer">
            <StatusDropdown />

            <div className="w-full" onClick={() => setExpandTask(false)}>
              <span>This is the first task </span>
            </div>

            <ArrowRightCircleIcon className="w-5 h-5" />
            <UserCircleIcon className="w-5 h-5" />
            <span>time</span>
          </div>
        </div>

        <div className="w-full overflow-y-auto p-2 hover:bg-gray-100">
          <div className="flex items-center gap-3 rounded-sm px-4 cursor-pointer">
            <StatusDropdown />

            <div className="w-full" onClick={() => setExpandTask(false)}>
              <span>This is the first task </span>
            </div>
          </div>
        </div>

        <div className="w-full overflow-y-auto p-2 hover:bg-gray-100">
          <div className="flex items-center gap-3 rounded-sm px-4 cursor-pointer">
            <StatusDropdown />

            <div className="w-full" onClick={() => setExpandTask(false)}>
              <span>This is the first task </span>
            </div>
          </div>
        </div>
      </>
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
