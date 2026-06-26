"use client";
import StatusDropdown from "@/app/components/modals/status-dropwdown";
import { useState } from "react";
import { DetailedView } from "./detailed-view";
import { useTasks } from "@/context/task-context";
import PriorityDropdown from "@/app/components/modals/priority-dropdown";
import AssigneeDropdown from "@/app/components/modals/assignee-dropdown";
import { CalendarIcon } from "@heroicons/react/24/outline";
import { EmptyStatusView } from "./empty-status-view";
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

  const filteredTask = tasks.filter((task) => task.status === status);

  if (filteredTask.length === 0) {
    if (tasks.length === 0) {
      return <EmptyTaskList />;
    }
    return <EmptyStatusView status={status} />;
  }

  if (openDetailedView) {
    return (
      <DetailedView
        setOpenDetailedView={setOpenDetailedView}
        selectedListItem={selectedListItem}
      />
    );
  }

  return (
    <div className="px-6 py-4 max-w-8xl mx-auto space-y-2.5">
      {filteredTask.map((task) => (
        <div
          key={task.id}
          onClick={() => {
            setOpenDetailedView(true);
            setselectedListItem(task);
          }}
          className="w-full bg-white border border-slate-100 hover:border-slate-200/80 rounded-xl p-3.5 px-4 shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/30 group"
        >
          {/* Left Section: Status + Title */}
          <div className="flex items-center gap-3 min-w-0">
            <div onClick={(e) => e.stopPropagation()} className="shrink-0">
              <StatusDropdown
                value={task.status}
                selectedListId={task.id}
                showOnlyIconsInList
              />
            </div>

            <div className="min-w-0">
              <span className="text-sm font-semibold text-slate-700 group-hover:text-slate-900 transition-colors truncate block">
                {task.title}
              </span>
              {task.description && (
                <p className="text-xs text-slate-400 truncate max-w-md mt-0.5 font-normal">
                  {task.description}
                </p>
              )}
            </div>
          </div>

          {/* Right Section: Attributes & Date */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-1.5">
              <div onClick={(e) => e.stopPropagation()}>
                <PriorityDropdown
                  value={task.priority}
                  selectedListId={task.id}
                  ShowOnlyPriorityIcon
                />
              </div>
              <div onClick={(e) => e.stopPropagation()}>
                <AssigneeDropdown
                  value={task.assignedTo}
                  selectedListId={task.id}
                  ShowOnlyUSerIcon
                />
              </div>
            </div>

            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 border border-slate-100 rounded-lg text-slate-400">
              <CalendarIcon className="w-3.5 h-3.5 shrink-0" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 whitespace-nowrap">
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
};
