"use client";
import StatusDropdown from "@/app/components/modals/status-dropwdown";
import { useState } from "react";
import { DetailedView } from "./detailed-view";
import { useTasks } from "@/context/task-context";
import PriorityDropdown from "@/app/components/modals/priority-dropdown";
import AssigneeDropdown from "@/app/components/modals/assignee-dropdown";
import { EmptyTaskList } from "./empty-task-list";

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
  const [openDetailedView, setOpenDetailedView] = useState(false);
  const [selectedListItem, setselectedListItem] = useState<Task | undefined>(
    undefined,
  );
  const { tasks } = useTasks();

  if (tasks.length === 0) {
    return <EmptyTaskList />;
  }

  const filteredTask = tasks.filter((task) => task.status === status);

  if (openDetailedView) {
    return (
      <DetailedView
        setOpenDetailedView={setOpenDetailedView}
        selectedListItem={selectedListItem}
      />
    );
  } else {
    return (
      <div>
        {filteredTask.map((task) => (
          <div key={task.id} className="w-full p-2 hover:bg-gray-100">
            <div className="flex items-center justify-between gap-4 px-4 cursor-pointer">
              {/* Left Section: Status + Title */}
              <div className="flex items-center gap-3">
                <StatusDropdown
                  value={task.status}
                  selectedListId={task.id}
                  showOnlyIconsInList
                />

                <div
                  className="text-sm font-medium"
                  onClick={() => {
                    setOpenDetailedView(true);
                    setselectedListItem(task);
                  }}
                >
                  <span>{task.title}</span>
                </div>
              </div>

              {/* Right Section: Icons + Date */}

              <div className="flex items-center gap-2 text-sm">
                <PriorityDropdown
                  value={task.priority}
                  selectedListId={task.id}
                  ShowOnlyPriorityIcon
                />
                <AssigneeDropdown
                  value={task.assignedTo}
                  selectedListId={task.id}
                  ShowOnlyUSerIcon
                />

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
