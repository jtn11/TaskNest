import { Button, Modal, Switch, Textarea } from "@mantine/core";
import { act, useEffect, useState } from "react";
import PriorityDropdown from "./priority-dropdown";
import StatusDropdown from "./status-dropwdown";
import AssigneeDropdown from "./assignee-dropdown";
import { PaperClipIcon } from "@heroicons/react/24/solid";
import { getAuth } from "firebase/auth";
import { CreateUsersTask } from "@/app/dashboard/tasks/create-tasks";
import { useWorkspace } from "@/context/workspace-context";

interface ModalProps {
  opened: boolean;
  onClose: () => void;
}

export const TaskModal = ({ opened, onClose }: ModalProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("todo");
  const [assignedTo, setAssignedTo] = useState("no-Assignee");
  const [priority, setPriority] = useState("medium");

  const { currentUser } = getAuth();
  const { activeWorkspace } = useWorkspace();

  const handleSubmit = async () => {
    if (title.trim() === "") {
      alert("Title cannot be empty");
      return;
    }
    console.log("Title", title);
    console.log("Description", description);
    console.log("status", status);
    console.log("assignedTo", assignedTo);
    console.log("priority", priority);

    if (!activeWorkspace || !currentUser) return;
    const token = await currentUser.getIdToken();
    const workspaceId = activeWorkspace.id;

    const task = await CreateUsersTask(
      title,
      description,
      assignedTo,
      status,
      priority,
      workspaceId,
      token,
    );
    if (task) {
      console.log("Created Task : ", task);
      onClose();
    } else {
      alert("Failed to create Task");
    }

    setTitle("");
    setDescription("");
  };

  const renderBody = () => {
    return (
      <div className="py-1 space-y-4">
        <Textarea
          size="md"
          radius="md"
          placeholder="Issue title..."
          minRows={1}
          maxRows={4}
          autosize
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          classNames={{
            input:
              "text-bold text-lg font-medium border-none focus:border-blue-500",
          }}
        />

        <Textarea
          size="md"
          radius="md"
          placeholder="Add description..."
          minRows={2}
          maxRows={12}
          autosize
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          classNames={{
            input: "border-gray-300 focus:border-blue-500",
          }}
        />

        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="flex items-center gap-2">
            <StatusDropdown
              label="status"
              value={status}
              onChange={setStatus}
            />
            <PriorityDropdown value={priority} onChange={setPriority} />
            <AssigneeDropdown value={assignedTo} onChange={setAssignedTo} />
            <PaperClipIcon className="w-4 h-4" />
          </div>

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
        <span className="text-gray-900 ml-1 text-xl font-medium">Add Task</span>
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
        header: "mb-0  bg-white",
      }}
    >
      {renderBody()}
    </Modal>
  );
};
