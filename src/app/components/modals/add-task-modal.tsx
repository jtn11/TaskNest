import { Button, Modal, Textarea, TextInput } from "@mantine/core";
import { useState } from "react";
import PriorityDropdown from "./priority-dropdown";
import StatusDropdown from "./status-dropwdown";
import AssigneeDropdown from "./assignee-dropdown";
import { PaperClipIcon } from "@heroicons/react/24/outline";
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
      <div className="space-y-5 text-left bg-white">
        {/* Title Input */}
        <div className="flex flex-col border border-slate-200/80 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 rounded-xl p-3 bg-white shadow-sm transition-all">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block select-none">Title</span>
          <TextInput
            variant="unstyled"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
            classNames={{
              input:
                "text-sm font-bold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-0 p-0 leading-tight w-full mt-1",
            }}
          />
        </div>

        {/* Description Input */}
        <div className="flex flex-col border border-slate-200/80 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 rounded-xl p-3 bg-white shadow-sm transition-all">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block select-none">Description</span>
          <Textarea
            variant="unstyled"
            placeholder="Add description..."
            minRows={3}
            maxRows={10}
            autosize
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            classNames={{
              input:
                "text-sm text-slate-600 overflow-y-auto leading-relaxed placeholder-slate-400 focus:outline-none focus:ring-0 p-0 w-full mt-1 min-h-[80px]",
            }}
          />
          <Button
            leftSection={<PaperClipIcon className="w-3.5 h-3.5 text-slate-500" />}
            variant="subtle"
            color="gray"
            size="xs"
            className="px-2 text-slate-500 text-xs rounded-lg font-semibold flex items-center gap-1 hover:bg-slate-100 cursor-pointer mt-2 self-start"
          >
            Attach image
          </Button>
        </div>

        {/* Dropdowns Row */}
        <div className="space-y-1.5 pt-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Attributes</span>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 bg-slate-50/50 border border-slate-200/60 rounded-xl px-2.5 py-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider select-none">Status:</span>
              <StatusDropdown value={status} onChange={setStatus} createMode />
            </div>
            
            <div className="flex items-center gap-1.5 bg-slate-50/50 border border-slate-200/60 rounded-xl px-2.5 py-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider select-none">Priority:</span>
              <PriorityDropdown value={priority} onChange={setPriority} createMode />
            </div>

            <div className="flex items-center gap-1.5 bg-slate-50/50 border border-slate-200/60 rounded-xl px-2.5 py-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider select-none">Assignee:</span>
              <AssigneeDropdown value={assignedTo} onChange={setAssignedTo} createMode />
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
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
            className="text-xs font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg shadow-sm px-4.5 py-2 cursor-pointer transition-all duration-150 active:scale-95"
          >
            Create Task
          </Button>
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
      size={1000}
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
