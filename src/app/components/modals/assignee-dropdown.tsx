"use client";

import { useState } from "react";
import { Popover, Avatar } from "@mantine/core";
import { CheckIcon } from "@heroicons/react/20/solid";

export default function AssigneeDropdown() {
  const [opened, setOpened] = useState(false);
  const [selected, setSelected] = useState("Alice Johnson");

  const assignees = [
    { name: "Alice Johnson", avatar: "https://i.pravatar.cc/40?u=alice" },
    { name: "Bob Smith", avatar: "https://i.pravatar.cc/40?u=bob" },
    { name: "Charlie Doe", avatar: "https://i.pravatar.cc/40?u=charlie" },
  ];

  const handleSelect = (name: string) => {
    setSelected(name);
    setOpened(false);
  };

  const selectedUser = assignees.find((a) => a.name === selected);

  return (
    <Popover
      opened={opened}
      onChange={setOpened}
      position="bottom-start"
      withArrow
      offset={8}
    >
      <Popover.Target>
        <div
          onClick={() => setOpened((o) => !o)}
          className="w-35 h-6 px-2 cursor-pointer flex items-center gap-2 rounded bg-gray-100 hover:bg-gray-200 transition"
        >
          <img
            src={selectedUser?.avatar}
            alt={selectedUser?.name}
            className="w-5 h-5 rounded-full"
          />
          <span className="text-xs text-gray-800 truncate">
            {selectedUser?.name}
          </span>
        </div>
      </Popover.Target>

      <Popover.Dropdown>
        <div className="w-50 bg-white rounded-md ">
          {assignees.map((user) => {
            const isSelected = selected === user.name;
            return (
              <div
                key={user.name}
                onClick={() => handleSelect(user.name)}
                className={`flex items-center justify-between p-1 m-1 rounded cursor-pointer ${
                  isSelected ? "bg-gray-100" : "hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-2">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="text-xs">{user.name}</span>
                </div>
                {isSelected && (
                  <CheckIcon className="h-4 w-4 text-indigo-500" />
                )}
              </div>
            );
          })}
        </div>
      </Popover.Dropdown>
    </Popover>
  );
}
