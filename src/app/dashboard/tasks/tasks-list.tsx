import StatusDropdown from "@/app/components/modals/status-dropwdown";
import {
  ArrowLeftIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/outline";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { GetCurrentUsersTask } from "./task";
import { useWorkspace } from "@/context/workspace-context";
import { useAuth } from "@/context/AuthContext";

interface TaskListProps {
  status: string;
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

export const TaskList = ({ status }: TaskListProps) => {
  const [expandTask, setExpandTask] = useState(true);
  const { currentUser } = useAuth();
  const { activeWorkspace, token } = useWorkspace();
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const handleTask = async () => {
      const workspaceId = activeWorkspace?.id;
      if (!currentUser || !workspaceId) return;
      const taskByStatus = await GetCurrentUsersTask(workspaceId, token);
      setTasks(taskByStatus || []);
    };
    handleTask();
  }, [currentUser, activeWorkspace]);

  const filteredTask = tasks.filter((task) => task.status === status);

  if (expandTask) {
    return (
      <div>
        {filteredTask.map((task) => (
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
              <div className="flex items-center gap-2 text-sm">
                <ArrowRightCircleIcon className="w-5 h-5" />
                <UserCircleIcon className="w-5 h-5" />
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
};
