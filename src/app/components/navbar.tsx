"use client";
import {
  Bars3Icon,
  PencilSquareIcon,
  MagnifyingGlassIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { Avatar, Menu, TextInput, Tooltip } from "@mantine/core";
import { useState } from "react";
import { TaskModal } from "./modals/add-task-modal";
import { useAuth } from "@/context/auth-context";
import { WorkSpaceDropdown } from "./workspace/workspace-dropdown";

interface NavBarProps {
  isSidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export const NavBar = ({ isSidebarOpen, setSidebarOpen }: NavBarProps) => {
  const [openModal, setOpenModal] = useState(false);
  const { username, logout } = useAuth();

  return (
    <div className="bg-white border-b border-slate-200/60 px-6 py-3.5 flex items-center justify-between z-40">
      <div className="flex items-center space-x-4 flex-1">
        {/* Hamburger appears only when sidebar is closed */}
        {!isSidebarOpen && (
          <button
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer outline-none shrink-0"
            onClick={() => setSidebarOpen(true)}
          >
            <Bars3Icon className="w-5 h-5" />
          </button>
        )}

        <div className="max-w-md w-full">
          <TextInput
            leftSection={
              <MagnifyingGlassIcon className="text-slate-400 w-4 h-4" />
            }
            rightSection={
              <span className="text-[10px] font-mono font-medium text-slate-400 bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded mr-1 select-none">
                ⌘K
              </span>
            }
            placeholder="Search tasks..."
            type="text"
            aria-label="searchInput"
            styles={{
              input: {
                backgroundColor: "var(--mantine-color-slate-50, #f8fafc)",
                borderColor: "#e2e8f0",
                color: "#0f172a",
                borderRadius: "8px",
                height: "36px",
                fontSize: "14px",
                paddingLeft: "36px",
                paddingRight: "44px",
              },
            }}
          />
        </div>
      </div>

      <div className="flex items-center space-x-3 shrink-0 ml-4">
        {/* Create Task Button */}
        <Tooltip className="text-xs" label="Create new task">
          <div
            className="flex items-center justify-center w-8 h-8 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 border border-transparent hover:border-slate-200/40 cursor-pointer transition-all duration-150"
            onClick={() => setOpenModal(true)}
          >
            <PencilSquareIcon className="w-4.5 h-4.5" />
          </div>
        </Tooltip>

        {openModal && (
          <TaskModal opened={openModal} onClose={() => setOpenModal(false)} />
        )}

        {/* Workspace Dropdown */}
        <WorkSpaceDropdown />

        {/* Vertical divider */}
        <div className="h-4 w-px bg-slate-200"></div>

        {/* User Profile Menu */}
        <Menu width={200} position="bottom-end" shadow="md">
          <Menu.Target>
            <button className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-blue-400 flex items-center justify-center text-white text-xs font-bold shadow-sm hover:shadow-blue-500/10 cursor-pointer active:scale-95 transition-all duration-150 outline-none border border-blue-500/10">
              {username ? username.charAt(0).toUpperCase() : "U"}
            </button>
          </Menu.Target>

          <Menu.Dropdown className="bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-xl shadow-lg p-1.5 min-w-[180px]">
            {/* User Profile Header */}
            <div className="flex items-center space-x-2.5 px-3.5 py-2">
              <Avatar
                color="blue"
                radius="xl"
                size="sm"
                className="w-6 h-6 flex items-center justify-center text-white text-[10px] font-bold shrink-0"
              >
                {username ? username.charAt(0).toUpperCase() : ""}
              </Avatar>
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-semibold text-slate-800 truncate">
                  {username || "User"}
                </span>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">
                  Active User
                </span>
              </div>
            </div>

            <Menu.Divider className="border-t border-slate-100 my-1" />

            {/* Menu options */}
            <Menu.Item
              className="flex items-center w-full px-3 py-2 text-left hover:bg-slate-100/60 text-slate-700 rounded-lg transition-colors duration-150 font-medium text-sm cursor-pointer"
              leftSection={
                <Cog6ToothIcon className="w-4 h-4 text-slate-400 shrink-0 mr-1" />
              }
            >
              Settings
            </Menu.Item>

            <Menu.Item
              className="flex items-center w-full px-3 py-2 text-left hover:bg-red-50 text-red-600 hover:text-red-700 rounded-lg transition-colors duration-150 font-medium text-sm cursor-pointer"
              onClick={logout}
              leftSection={
                <ArrowRightOnRectangleIcon className="w-4 h-4 text-red-500 shrink-0 mr-1" />
              }
            >
              Log out
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
    </div>
  );
};
