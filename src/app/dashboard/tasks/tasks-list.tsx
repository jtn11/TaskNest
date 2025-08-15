"use client";
import StatusDropdown from "@/app/components/modals/status-dropwdown";
import {
  ArrowDownCircleIcon,
  ArrowRightCircleIcon,
  ArrowUpCircleIcon,
} from "@heroicons/react/24/outline";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { DetailedView } from "./detailed-view";
import { useTasks } from "@/context/task-context";

interface TaskListProps {
  status: string;
}

export const TaskList = ({ status }: TaskListProps) => {
  const [openDetailedView, setOpenDetailedView] = useState(false);
  const { tasks } = useTasks();

  const filteredTask = tasks.filter((task) => task.status === status);

  if (openDetailedView) {
    return <DetailedView setOpenDetailedView={setOpenDetailedView} />;
  } else {
    return (
      <div>
        {filteredTask.map((task) => (
          <div
            key={task.id}
            className="w-full p-2 hover:bg-gray-100"
            onClick={() => setOpenDetailedView(true)}
          >
            <div className="flex items-center justify-between gap-4 px-4 cursor-pointer">
              {/* Left Section: Status + Title */}
              <div className="flex items-center gap-3">
                <StatusDropdown CurrentTaskListStatus={status} />

                <div className="text-sm font-medium">
                  <span>{task.title}</span>
                </div>
              </div>

              {/* Right Section: Icons + Date */}
              <div className="flex items-center gap-2 text-sm">
                {task.priority === "low" ? (
                  <ArrowDownCircleIcon className="w-5 h-5" />
                ) : task.priority === "high" ? (
                  <ArrowUpCircleIcon className="w-5 h-5" />
                ) : (
                  <ArrowRightCircleIcon className="w-5 h-5" />
                )}

                <UserCircleIcon className="w-5 h-5 text-blue-500" />
                <span>
                  {new Date(task.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
};
