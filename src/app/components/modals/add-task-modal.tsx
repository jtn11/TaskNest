import { Button, Modal, Textarea } from "@mantine/core";
import { useState } from "react";
import PriorityDropdown from "./priority-dropdown";
import StatusDropdown from "./status-dropwdown";
import AssigneeDropdown from "./assignee-dropdown";
import { PaperClipIcon } from "@heroicons/react/24/solid";
import { getAuth } from "firebase/auth";
import { CreateUsersTask } from "@/app/dashboard/tasks/create-tasks";
import { useWorkspace } from "@/context/workspace-context";
import { useTasks } from "@/context/task-context";

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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { currentUser } = getAuth();
  const { activeWorkspace } = useWorkspace();
  const { triggerListRefresh } = useTasks();

  const handleSubmit = async () => {
    if (title.trim() === "") {
      alert("Title cannot be empty");
      return;
    }
    if (!activeWorkspace || !currentUser) return;
    setIsSubmitting(true);
    try {
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
        triggerListRefresh();
        console.log("Created Task : ", task);
        onClose();
        setTitle("");
        setDescription("");
      } else {
        alert("Failed to create Task");
      }
    } catch (err) {
      console.error("Error creating task:", err);
      alert("Failed to create task");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderBody = () => {
    return (
      <div className="space-y-4">
        {/* Title Input */}
        <Textarea
          placeholder="Task title"
          minRows={1}
          maxRows={4}
          autosize
          variant="unstyled"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          autoFocus
          classNames={{
            input: "text-lg font-bold text-slate-800 placeholder-slate-400 p-0 focus:outline-none focus:ring-0 leading-tight",
          }}
        />

        {/* Description Input */}
        <Textarea
          placeholder="Add description..."
          minRows={3}
          maxRows={10}
          autosize
          variant="unstyled"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          classNames={{
            input: "text-sm text-slate-600 placeholder-slate-400 p-0 focus:outline-none focus:ring-0 leading-relaxed",
          }}
        />

        {/* Action Controls and Submit */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-100">
          {/* Dropdown Options */}
          <div className="flex flex-wrap items-center gap-2">
            <StatusDropdown
              value={status}
              onChange={setStatus}
              createMode
            />
            <PriorityDropdown
              value={priority}
              onChange={setPriority}
              createMode
            />
            <AssigneeDropdown
              value={assignedTo}
              onChange={setAssignedTo}
              createMode
            />
            <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 border border-transparent hover:border-slate-200/50 rounded-lg transition-all cursor-pointer">
              <PaperClipIcon className="w-4 h-4" />
            </button>
          </div>

          {/* Form Actions */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <Button
              size="sm"
              variant="subtle"
              color="gray"
              onClick={onClose}
              disabled={isSubmitting}
              className="text-xs font-semibold text-slate-500 hover:bg-slate-100 cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleSubmit}
              loading={isSubmitting}
              disabled={title.trim() === ""}
              className="text-xs font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg shadow-sm px-4 cursor-pointer disabled:opacity-50 transition-all duration-150 active:scale-95"
            >
              Create Task
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Modal
      opened={opened}
      centered
      onClose={onClose}
      title={
        <span className="text-slate-800 text-base font-bold tracking-tight">Create New Task</span>
      }
      size={800}
      closeButtonProps={{
        size: "sm",
      }}
      overlayProps={{
        opacity: 0.3,
        blur: 2,
      }}
      classNames={{
        close: "text-slate-400 hover:text-slate-600 transition-colors cursor-pointer",
        body: "bg-white p-6",
        root: "z-[var(--z-modal)]",
        content: "shadow-2xl bg-white rounded-[24px] overflow-hidden border border-slate-100",
        header: "mb-0 bg-white border-b border-slate-100 px-6 py-4",
      }}
    >
      {renderBody()}
    </Modal>
  );
};
