"use client";
import {
  Bars3Icon,
  UserCircleIcon,
  PencilSquareIcon,
  MagnifyingGlassCircleIcon,
  MagnifyingGlassIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import { Menu, TextInput, Tooltip } from "@mantine/core";
import { useState } from "react";
import { TaskModal } from "./modals/add-task-modal";
import { useAuth } from "@/context/AuthContext";

interface NavBarProps {
  isSidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export const NavBar = ({ isSidebarOpen, setSidebarOpen }: NavBarProps) => {
  const [openModal, setOpenModal] = useState(false);
  const { username, logout } = useAuth();

  return (
    <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Hamburger appears only when sidebar is closed */}
          {!isSidebarOpen && (
            <button
              className="p-2 text-gray-600"
              onClick={() => setSidebarOpen(true)}
            >
              <Bars3Icon className="w-5 h-5" />
            </button>
          )}

          <TextInput
            leftSection={
              <MagnifyingGlassIcon className="text-tertiary w-4 h-4" />
            }
            placeholder="Search tasks..."
            type="text"
            aria-label="searchInput"
            aria-describedby="basic-addon2"
            className="text-sm leading-5 font-normal shadow-sm rounded-md border-primary bg-secondary "
          />
        </div>

        <div className="flex items-center">
          <div className="flex items-center space-x-2">
            <Tooltip className="text-sm" label="create new task">
              <div
                className="flex items-center gap-1 rounded-full p-2 hover:bg-gray-100 shadow-md cursor-pointer"
                onClick={() => setOpenModal(true)}
              >
                <PencilSquareIcon className="w-5 h-5 " />
              </div>
            </Tooltip>
            {openModal && (
              <TaskModal
                opened={openModal}
                onClose={() => setOpenModal(false)}
              />
            )}

            <div className="w-9 h-9 rounded-full flex items-center justify-center shadow-md">
              <Menu width={200} position="bottom-start">
                <Menu.Target>
                  <UserCircleIcon className="w-7 h-7 text-blue-500 " />
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Item>{username || "Username"}</Menu.Item>
                  <Menu.Item>Settings</Menu.Item>
                  <Menu.Item onClick={logout}>Log out</Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </div>
            {/* <span className="text-sm font-medium text-gray-700 truncate max-w-[100px]">John doe</span> */}
          </div>
        </div>
      </div>
    </div>
  );
};
