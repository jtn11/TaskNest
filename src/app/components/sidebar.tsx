"use client";
import {
  HomeIcon,
  AcademicCapIcon,
  InboxIcon,
  ChartPieIcon,
  ChevronDoubleLeftIcon,
} from "@heroicons/react/24/solid";
import { NavItem } from "./nav-items";
import { usePathname } from "next/navigation";

interface SideBarProps {
  setSidebarOpen: (open: boolean) => void;
}

export const SideBar = ({ setSidebarOpen }: SideBarProps) => {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (pathname === path) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="w-64 bg-gray-50 border-r border-gray-200 flex flex-col min-h-screen">
      <div className="p-6 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-900">TaskNest</h1>
        <button
          onClick={() => setSidebarOpen(false)}
          className="text-gray-600 hover:text-gray-800"
        >
          <ChevronDoubleLeftIcon className="w-4 h-4" />
        </button>
      </div>

      <div className="p-3 hover:text-gray-800">
        <NavItem
          href="/dashboard/overview"
          Icon={HomeIcon}
          label="Overview"
          isActive={isActive("/dashboard/overview")}
        />
        <NavItem
          href="/dashboard/tasks"
          Icon={AcademicCapIcon}
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
          label="Overview"
          isActive={isActive("/dashboard/analytics")}
        />
      </div>
    </div>
  );
};
