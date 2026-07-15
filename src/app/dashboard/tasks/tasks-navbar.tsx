"use client";

import {
  ClockIcon,
  ClipboardDocumentListIcon,
  CheckCircleIcon,
  StopCircleIcon,
  LifebuoyIcon,
} from "@heroicons/react/24/outline";
import { useTasks } from "@/context/task-context";
import { cn } from "@/lib/cn";
import { useAuth } from "@/context/auth-context";

interface NavBarProps {
  activeState: string;
  setActiveState: (status: string) => void;
  filterMode: "all" | "mine";
  setFilterMode: (mode: "all" | "mine") => void;
}

export const TaskNavBar = ({
  activeState,
  setActiveState,
  filterMode,
  setFilterMode,
}: NavBarProps) => {
  const { tasks } = useTasks();
  const { currentUser } = useAuth();

  const getCount = (status: string) => {
    return tasks.filter((t) => {
      const matchStatus = t.status === status;
      if (!matchStatus) return false;
      if (filterMode === "mine") {
        return t.assignedTo?.toLowerCase() === currentUser?.email?.toLowerCase();
      }
      return true;
    }).length;
  };

  const navItems = [
    {
      id: "todo",
      label: "Todo",
      icon: LifebuoyIcon,
      color: "text-slate-400",
    },
    {
      id: "backlog",
      label: "Backlog",
      icon: StopCircleIcon,
      color: "text-slate-400",
    },
    {
      id: "in-progress",
      label: "In Progress",
      icon: ClockIcon,
      color: "text-amber-500",
    },
    {
      id: "review",
      label: "In Review",
      icon: ClipboardDocumentListIcon,
      color: "text-emerald-600",
    },
    {
      id: "completed",
      label: "Completed",
      icon: CheckCircleIcon,
      color: "text-blue-600",
    },
  ];

  return (
    <div className="w-full bg-white border-b border-slate-100/80 sticky top-0 z-10">
      <div className="px-6 pt-4 pb-2">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 w-full">
          <div>
            <h1 className="text-xl font-bold text-slate-800 tracking-tight">
              Tasks
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Manage and track tasks in this workspace
            </p>
          </div>

          {/* Toggle buttons */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg self-start md:self-auto shadow-inner select-none shrink-0">
            <button
              onClick={() => setFilterMode("all")}
              className={cn(
                "px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer outline-none border-none",
                filterMode === "all"
                  ? "bg-white text-slate-800 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              )}
            >
              All Tasks
            </button>
            <button
              onClick={() => setFilterMode("mine")}
              className={cn(
                "px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer outline-none border-none",
                filterMode === "mine"
                  ? "bg-white text-slate-800 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              )}
            >
              Assigned to Me
            </button>
          </div>
        </div>
      </div>

      <div className="px-6 flex overflow-x-auto scrollbar-none border-t border-slate-50 mt-2">
        <div className="flex space-x-6 min-w-max">
          {navItems.map((item) => {
            const Icon = item.icon;
            const count = getCount(item.id);
            const isActive = activeState === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveState(item.id)}
                className={cn(
                  "flex items-center gap-2 py-3 border-b-2 font-medium text-xs tracking-wide transition-all cursor-pointer outline-none select-none",
                  isActive
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-slate-400 hover:text-slate-600",
                )}
              >
                <Icon
                  className={cn(
                    "w-4 h-4 shrink-0",
                    isActive ? "text-blue-600" : item.color,
                  )}
                />
                <span>{item.label}</span>
                <span
                  className={cn(
                    "text-[10px] font-bold px-1.5 py-0.5 rounded-full transition-colors",
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "bg-slate-100 text-slate-500",
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
