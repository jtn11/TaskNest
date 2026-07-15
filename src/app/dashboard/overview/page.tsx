"use client";

import { useState } from "react";
import {
  ClockIcon,
  CheckCircleIcon,
  ClipboardDocumentListIcon,
  StopCircleIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import StatusDropdown from "@/app/components/modals/status-dropwdown";
import { DetailedView } from "../tasks/detailed-view";
import { useTasks } from "@/context/task-context";
import PriorityDropdown from "@/app/components/modals/priority-dropdown";
import AssigneeDropdown from "@/app/components/modals/assignee-dropdown";
import { useWorkspace } from "@/context/workspace-context";
import { useAuth } from "@/context/auth-context";

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
  const [openDetailedView, setOpenDetailedView] = useState(false);
  const [selectedListItem, setselectedListItem] = useState<Task | undefined>(
    undefined,
  );

  const { overViewTasks, tasks, fetchTasks, hasMore, loading } = useTasks();
  const { activeWorkspace, members, token } = useWorkspace();
  const { currentUser } = useAuth();

  if (!activeWorkspace?.id) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-slate-500 font-medium">
        Select or create a workspace to view your dashboard.
      </div>
    );
  }

  // Calculate metrics based on the full list of user's tasks
  const myTasks = tasks.filter(
    (t) => t.assignedTo?.toLowerCase() === currentUser?.email?.toLowerCase()
  );
  const completedTasks = myTasks.filter((t) => t.status === "completed").length;

  const stats = [
    {
      label: "To Do / Backlog",
      count: myTasks.filter((t) => t.status === "todo" || t.status === "backlog")
        .length,
      icon: <StopCircleIcon className="w-5 h-5 text-slate-500" />,
      bgColor: "bg-slate-50/50 border-slate-200/80 hover:border-slate-300",
      iconBg: "bg-slate-100 text-slate-600",
    },
    {
      label: "In Progress",
      count: myTasks.filter((t) => t.status === "in-progress").length,
      icon: <ClockIcon className="w-5 h-5 text-amber-500" />,
      bgColor: "bg-amber-50/20 border-amber-100/80 hover:border-amber-200",
      iconBg: "bg-amber-100/50 text-amber-700",
    },
    {
      label: "In Review",
      count: myTasks.filter((t) => t.status === "review").length,
      icon: <ClipboardDocumentListIcon className="w-5 h-5 text-emerald-500" />,
      bgColor:
        "bg-emerald-50/20 border-emerald-100/80 hover:border-emerald-200",
      iconBg: "bg-emerald-100/50 text-emerald-700",
    },
    {
      label: "Completed",
      count: completedTasks,
      icon: <CheckCircleIcon className="w-5 h-5 text-blue-500" />,
      bgColor: "bg-blue-50/20 border-blue-100/80 hover:border-blue-200",
      iconBg: "bg-blue-100/50 text-blue-700",
    },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div
            key={i}
            className={`flex items-center justify-between p-4 rounded-xl border ${stat.bgColor} shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md cursor-default`}
          >
            <div>
              <span className="text-xs font-semibold text-slate-500 block uppercase tracking-wider">
                {stat.label}
              </span>
              <span className="text-2xl font-extrabold text-slate-800 block mt-1">
                {stat.count}
              </span>
            </div>
            <div
              className={`p-2.5 rounded-lg ${stat.iconBg} flex items-center justify-center shrink-0`}
            >
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Tasks */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white border border-slate-200/80 rounded-xl shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h2 className="text-sm font-bold text-slate-800 tracking-tight flex items-center gap-2">
                <span>📋</span> My Tasks
              </h2>
              <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full uppercase tracking-wider">
                {overViewTasks.length} shown
              </span>
            </div>

            {overViewTasks.length === 0 ? (
              <div className="p-10 flex flex-col items-center justify-center text-center">
                <svg
                  className="w-12 h-12 text-slate-300 mb-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.8"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  />
                </svg>
                <span className="text-sm font-semibold text-slate-700">
                  No tasks assigned to you
                </span>
                <p className="text-xs text-slate-400 mt-1 max-w-[280px]">
                  {
                    "Tasks assigned to you in this workspace will show up here. Use the '+' button to add tasks."
                  }
                </p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {overViewTasks.map((task) => (
                  <div
                    key={task.id}
                    className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 hover:bg-slate-50/30 transition-all duration-150 cursor-pointer"
                  >
                    {/* Task Title + Status */}
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <div
                        className="mt-0.5 shrink-0"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <StatusDropdown
                          value={task.status}
                          selectedListId={task.id}
                          showOnlyIconsInList
                        />
                      </div>
                      <div
                        className="flex-1 min-w-0"
                        onClick={() => {
                          setselectedListItem(task);
                          setOpenDetailedView(true);
                        }}
                      >
                        <span className="text-sm font-semibold text-slate-800 group-hover:text-blue-600 transition-colors block truncate">
                          {task.title}
                        </span>
                        {task.description && (
                          <span className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                            {task.description}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Metadata Dropdowns + Date */}
                    <div className="flex items-center justify-between sm:justify-end gap-3 self-stretch sm:self-auto pl-7 sm:pl-0">
                      <div
                        className="flex items-center gap-1.5"
                        onClick={(e) => e.stopPropagation()}
                      >
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
                      </div>
                      <div className="text-xs font-semibold text-slate-400 w-16 text-right shrink-0">
                        {new Date(task.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {hasMore && (
              <div className="p-3.5 border-t border-slate-100 bg-slate-50/20 text-center">
                <button
                  onClick={() => fetchTasks(activeWorkspace.id, token)}
                  disabled={loading}
                  className="text-xs font-bold text-blue-600 hover:text-blue-700 bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-100 rounded-lg px-4 py-2 transition-all duration-150 shadow-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Loading..." : "Load More Tasks"}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Widgets */}
        <div className="space-y-6">
          {/* Priority breakdown */}
          <div className="bg-white border border-slate-200/80 rounded-xl shadow-sm p-5 space-y-4">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Priority Breakdown
            </h3>
            <div className="space-y-3">
              {(() => {
                const highCount = tasks.filter(
                  (t) => t.priority === "high",
                ).length;
                const mediumCount = tasks.filter(
                  (t) => t.priority === "medium",
                ).length;
                const lowCount = tasks.filter(
                  (t) => t.priority === "low",
                ).length;
                const totalPriority = highCount + mediumCount + lowCount || 1;

                const highPercent = Math.round(
                  (highCount / totalPriority) * 100,
                );
                const mediumPercent = Math.round(
                  (mediumCount / totalPriority) * 100,
                );
                const lowPercent = Math.round((lowCount / totalPriority) * 100);

                return (
                  <>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-red-600 flex items-center gap-1">
                          🔴 High
                        </span>
                        <span className="text-slate-500">
                          {highCount} tasks
                        </span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-red-500 rounded-full transition-all duration-500"
                          style={{ width: `${highPercent}%` }}
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-amber-600 flex items-center gap-1">
                          🟡 Moderate
                        </span>
                        <span className="text-slate-500">
                          {mediumCount} tasks
                        </span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-amber-500 rounded-full transition-all duration-500"
                          style={{ width: `${mediumPercent}%` }}
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-slate-500 flex items-center gap-1">
                          🔵 Low
                        </span>
                        <span className="text-slate-500">{lowCount} tasks</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-slate-400 rounded-full transition-all duration-500"
                          style={{ width: `${lowPercent}%` }}
                        />
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>

          {/* Team Members */}
          <div className="bg-white border border-slate-200/80 rounded-xl shadow-sm p-5 space-y-4">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <UserGroupIcon className="w-4 h-4 text-slate-400" />
              Team Members ({members.length})
            </h3>
            <div className="max-h-[220px] overflow-y-auto pr-1 space-y-3">
              {members.map((member) => (
                <div key={member.uid} className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center text-white text-[10px] font-bold shrink-0 uppercase">
                    {member.username
                      ? member.username.charAt(0)
                      : member.email?.charAt(0) || "U"}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-bold text-slate-700 truncate">
                      {member.username ||
                        member.email?.split("@")[0] ||
                        "Team Member"}
                    </span>
                    <span className="text-[10px] text-slate-400 truncate">
                      {member.email}
                    </span>
                  </div>
                </div>
              ))}
              {members.length === 0 && (
                <div className="text-xs text-slate-400 italic py-2">
                  No other members in workspace.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Conditionally Render Detailed Modal Overlay */}
      {openDetailedView && (
        <DetailedView
          setOpenDetailedView={setOpenDetailedView}
          selectedListItem={selectedListItem}
        />
      )}
    </div>
  );
}
