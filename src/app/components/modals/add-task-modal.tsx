// import { Button, Modal, Textarea } from "@mantine/core"

import { Button, Modal, Switch, Textarea } from "@mantine/core";
import { useState } from "react";
import StatusDropdown from "../status-dropdown";
import AssigneeDropdown from "./assignee-dropdown";
import PriorityDropdown from "./priority-dropdown";

interface ModalProps {
  opened: boolean;
  onClose: () => void;
}

export const TaskModal = ({ opened, onClose }: ModalProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    if (title.trim() === "") {
      alert("Title cannot be empty");
      return;
    }
    console.log("Title", title);
    console.log("Description", description);

    setTitle("");
    setDescription("");
  };

  const renderBody = () => {
    return (
      <div className="px-6 py-1 space-y-4">
        {/* Title Input */}
        <Textarea
          size="md"
          radius="md"
          placeholder="Issue title"
          minRows={1}
          maxRows={1}
          autosize
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          classNames={{
            input:
              "text-bold text-lg font-medium border-none focus:border-blue-500",
          }}
        />

        {/* Description Input */}
        <Textarea
          size="md"
          radius="md"
          placeholder="Add description..."
          minRows={6}
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          classNames={{
            input: "border-gray-300 focus:border-blue-500",
          }}
        />

        {/* Bottom Section */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          {/* Left side - Tags and Options */}
          <div className="flex items-center gap-2">
            <StatusDropdown />
            <PriorityDropdown />
            <AssigneeDropdown />

            <Button
              variant="subtle"
              size="sm"
              p={4}
              classNames={{
                root: "text-gray-500 hover:text-gray-700 hover:bg-gray-100",
              }}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                />
              </svg>
            </Button>
          </div>

          {/* Right side - Actions */}

          <Button
            size="sm"
            classNames={{
              root: "bg-blue-600 hover:bg-blue-700 text-white",
            }}
            onClick={handleSubmit}
          >
            Create issue
          </Button>
        </div>
      </div>
    );
  };

  return (
    <Modal
      opened={opened}
      centered={false}
      onClose={onClose}
      yOffset={140}
      title={
        <span className="text-gray-900 text-xl font-medium">Add Task</span>
      }
      size="xl"
      closeButtonProps={{
        size: "sm",
      }}
      overlayProps={{
        opacity: 0.3,
      }}
      classNames={{
        close: "text-gray-500 hover:text-gray-700",
        body: "bg-white p-0",
        root: "z-[var(--z-modal)]",
        content: "shadow-lg bg-white rounded-xl",
        header: "p-4 mb-0  bg-white",
      }}
    >
      {renderBody()}
    </Modal>
  );
};
