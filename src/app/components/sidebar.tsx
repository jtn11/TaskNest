"use client";
import {
  HomeIcon,
  CheckCircleIcon,
  InboxIcon,
  ChartPieIcon,
  ChevronLeftIcon,
} from "@heroicons/react/24/outline";
import { NavItem } from "./nav-items";
import { usePathname } from "next/navigation";
import { MemberWorkSpace } from "./workspace/member-workspace";

interface SideBarProps {
  setSidebarOpen: (open: boolean) => void;
}

export const SideBar = ({ setSidebarOpen }: SideBarProps) => {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <div className="w-60 bg-slate-50 border-r border-slate-200/60 flex flex-col min-h-screen shrink-0">
      {/* Header */}
      <div className="px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-center shadow-sm">
            <svg
              className="w-3.5 h-3.5 text-blue-600"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2L2 7L12 12L22 7L12 2Z"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 12L12 17L22 12"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 17L12 22L22 17"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="text-sm font-bold tracking-tight bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">
            TaskNest
          </span>
        </div>

        <button
          onClick={() => setSidebarOpen(false)}
          className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-200/50 transition-colors cursor-pointer outline-none"
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </button>
      </div>

      {/* Workspace Selector */}
      <MemberWorkSpace />

      {/* Navigation List */}
      <div className="px-2 py-1 space-y-0.5">
        <NavItem
          href="/dashboard/overview"
          Icon={HomeIcon}
          label="Overview"
          isActive={isActive("/dashboard/overview")}
        />
        <NavItem
          href="/dashboard/tasks"
          Icon={CheckCircleIcon}
          label="Tasks"
          isActive={isActive("/dashboard/tasks")}
        />
        <NavItem
          href="/dashboard/inbox"
          Icon={InboxIcon}
          label="Inbox"
          isActive={isActive("/dashboard/inbox")}
        />
        <NavItem
          href="/dashboard/analytics"
          Icon={ChartPieIcon}
          label="Analytics"
          isActive={isActive("/dashboard/analytics")}
        />
      </div>
    </div>
  );
};
