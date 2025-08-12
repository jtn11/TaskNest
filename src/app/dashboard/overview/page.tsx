"use client";
import { useAuth } from "@/context/AuthContext";
import { useWorkspace } from "@/context/workspace-context";
import { useEffect, useState } from "react";
import StatusDropdown from "@/app/components/modals/status-dropwdown";
import {
  ArrowDownCircleIcon,
  ArrowLeftIcon,
  ArrowRightCircleIcon,
  ArrowUpCircleIcon,
} from "@heroicons/react/24/outline";
import { GetOverViewTasks } from "./overview";
import { UserCircleIcon } from "@heroicons/react/16/solid";
import { Tooltip } from "@mantine/core";
import PriorityDropdown from "@/app/components/modals/priority-dropdown";

interface PriorityDropdownTypes {
  value?: string;
  onChange?: (val: string) => void;
}

interface Task {
  id: string;
  title: string;
  description: string;
  createdBy: string;
  assignedTo: string;
  status: string;
  priority: string;
  createdAt: string;
}

export default function OverView() {
  const [expandTask, setExpandTask] = useState(true);
  const { currentUser } = useAuth();
  const { activeWorkspace, token } = useWorkspace();
  const [tasks, setTasks] = useState<Task[]>([]);
  // const [priority, setPriority] = useState("Priority");
  // const [showDropdown, setShowDropdown] = useState(false);


  useEffect(() => {
    const handleTask = async () => {
      const workspaceId = activeWorkspace?.id;
      if (!currentUser || !workspaceId) return;
      const taskByStatus = await GetOverViewTasks(workspaceId, token);
      setTasks(taskByStatus || []);
    };
    handleTask();
  }, [currentUser, activeWorkspace]);
  


  if (expandTask) {
    return (
      <div>
        {tasks.map((task) => (
          <div key={task.id} className="w-full p-2 hover:bg-gray-100">
            <div className="flex items-center justify-between gap-4 px-4 cursor-pointer">
              {/* Left Section: Status + Title */}
              <div className="flex items-center gap-3">
                <StatusDropdown />

                <div
                  className="text-sm font-medium"
                  onClick={() => setExpandTask(false)}
                >
                  <span>{task.title}</span>
                </div>
              </div>

              {/* Right Section: Icons + Date */}
              <div className="flex items-center gap-2 text-sm"
              // onClick={() => setShowDropdown(prev => !prev)}
              >
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
}
