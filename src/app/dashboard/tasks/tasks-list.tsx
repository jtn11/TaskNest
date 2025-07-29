import StatusDropdown from "@/app/components/modals/status-dropwdown";
import { ArrowLeftIcon, LifebuoyIcon } from "@heroicons/react/24/outline";
import { UnstyledButton } from "@mantine/core";
import { useState } from "react";

export const TaskList = () => {
  const [expandTask, setExpandTask] = useState(true);

  const button = (
    <UnstyledButton>
      <LifebuoyIcon className="w-4 h-4" />
    </UnstyledButton>
  );

  if (expandTask) {
    return (
      <div className="w-full space-y-2 py-4 overflow-y-auto">
        <div className="flex items-center gap-3 border border-gray-100 rounded-sm px-4 py-1 bg-white  hover:bg-gray-50 transition cursor-pointer">
          <StatusDropdown button={button} />

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
