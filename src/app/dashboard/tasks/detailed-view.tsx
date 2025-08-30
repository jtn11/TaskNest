import { Button, Modal, Textarea, TextInput, ActionIcon } from "@mantine/core";
import { useState } from "react";
import { PaperClipIcon } from "@heroicons/react/24/outline";
import StatusDropdown from "@/app/components/modals/status-dropwdown";
import PriorityDropdown from "@/app/components/modals/priority-dropdown";
import AssigneeDropdown from "@/app/components/modals/assignee-dropdown";
import { ArrowUpCircleIcon, XCircleIcon } from "@heroicons/react/20/solid";
import { cn } from "@/lib/cn";
import { useWorkspace } from "@/context/workspace-context";
import { UpdateTask } from "./update-task";
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

interface DetailedViewTypes {
  setOpenDetailedView: (value: boolean) => void;
  selectedListItem: Task | undefined;
}

export const DetailedView = ({
  setOpenDetailedView,
  selectedListItem,
}: DetailedViewTypes) => {
  const [title, setTitle] = useState(selectedListItem?.title);
  const [description, setDescription] = useState(selectedListItem?.description);
  const [status, setStatus] = useState(selectedListItem?.status);
  const [assignedTo, setAssignedTo] = useState(selectedListItem?.assignedTo);
  const [priority, setPriority] = useState(selectedListItem?.priority);
  const [comment, setComment] = useState("");
  const [commentArr, setCommentArr] = useState<string[]>([]);

  const { activeWorkspace } = useWorkspace();
  const { currentUser } = useAuth();

  const handleComments = () => {
    if (comment.trim() != "") {
      setCommentArr((prev) => [...prev, comment]);
      setComment("");
    }
  };
  const handleDeleteComment = (index: number) => {
    const FilteredArray = commentArr.filter((_, i) => i !== index);
    setCommentArr(FilteredArray);
  };

  const handleUpdate = async () => {
    if (!selectedListItem) return;

    const changes: Partial<Task> = {};

    if (title !== selectedListItem.title) {
      changes.title = title!;
    }

    if (description !== selectedListItem.description) {
      changes.description = description!;
    }

    if (status !== selectedListItem.status) {
      changes.status = status!;
    }

    if (priority !== selectedListItem.priority) {
      changes.priority = priority!;
    }

    if (assignedTo !== selectedListItem.assignedTo) {
      changes.assignedTo = assignedTo!;
    }

    if (Object.keys(changes).length === 0) {
      console.log("No changes detected");
      return;
    }

    const userToken = await currentUser?.getIdToken();
    if (!activeWorkspace?.id || !userToken) return;

    try {
      await UpdateTask(
        selectedListItem.id,
        activeWorkspace?.id!,
        changes,
        userToken,
      );
      console.log(" Task updated successfully");
      setOpenDetailedView(false);
    } catch (err) {
      console.error("Failed to update task:", err);
    }
  };

  const renderBody = () => {
    return (
      <div className="space-y-6">
        <div>
          <TextInput
            variant="unstyled"
            size="lg"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            classNames={{
              input:
                "text-2xl font-semibold text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-0",
            }}
          />
        </div>

        <div>
          <Textarea
            variant="unstyled"
            placeholder="Add a detailed description..."
            minRows={3}
            maxRows={10}
            autosize
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            classNames={{
              input:
                "text-gray-700 overflow-y-auto leading-relaxed placeholder-gray-400 focus:outline-none focus:ring-0 mb-2",
            }}
          />
          <Button
            leftSection={<PaperClipIcon className="w-4 h-4 text-blue" />}
            variant="subtle"
            size="xs"
            className="px-2 text-black text-xs rounded-sm font-medium
             flex items-center gap-1"
          >
            Attach image
          </Button>
        </div>

        <div className="flex gap-1 mb-2">
          <StatusDropdown value={status} onChange={setStatus} />
          <PriorityDropdown value={priority} onChange={setPriority} />
          <AssigneeDropdown value={assignedTo} onChange={setAssignedTo} />
        </div>

        <div className="pt-4 border-t border-gray-100 flex flex-col gap-2">
          <span className="text-sm font-medium text-blue-500">Comments</span>

          {commentArr.length > 0 &&
            commentArr.map((comment, index) => (
              <div key={index}>
                <Textarea
                  radius="md"
                  minRows={2}
                  autosize
                  value={comment}
                  classNames={{
                    input:
                      "border border-gray-200 pr-10 placeholder-gray-400 text-gray-700",
                  }}
                  rightSection={
                    <button
                      onClick={() => handleDeleteComment(index)}
                      disabled={!comment.trim()}
                    >
                      <XCircleIcon className="w-5 h-5 text-red-500" />
                    </button>
                  }
                />
              </div>
            ))}

          <div>
            <Textarea
              radius="md"
              placeholder="Write a comment..."
              minRows={2}
              autosize
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              classNames={{
                input:
                  "border border-gray-200 pr-10 placeholder-gray-400 text-gray-700 focus:border-blue-500",
              }}
              rightSection={
                <button
                  onClick={handleComments}
                  disabled={!comment.trim()}
                  className={cn(
                    "transition-opacity",
                    comment.trim()
                      ? "cursor-pointer opacity-100"
                      : "cursor-not-allowed opacity-40",
                  )}
                >
                  <ArrowUpCircleIcon className="w-6 h-6 text-blue-500" />
                </button>
              }
            />
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button
            size="sm"
            variant="subtle"
            radius="md"
            classNames={{
              root: "bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-sm",
            }}
            onClick={() => setOpenDetailedView(false)}
          >
            cancel
          </Button>
          <Button
            size="sm"
            radius="md"
            classNames={{
              root: "bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-sm",
            }}
            onClick={handleUpdate}
          >
            Update
          </Button>
        </div>
      </div>
    );
  };

  return (
    <Modal
      opened
      centered={false}
      onClose={() => setOpenDetailedView(false)}
      yOffset={140}
      title={
        <span className="text-blue-500 ml-1 text-lg font-semibold">
          Task Details
        </span>
      }
      size="auto"
      closeButtonProps={{
        size: "sm",
      }}
      overlayProps={{
        opacity: 0.3,
      }}
      classNames={{
        close: "text-gray-400 hover:text-gray-600",
        body: "bg-white p-8",
        root: "z-[var(--z-modal)]",
        content:
          "w-400 h-200 shadow-lg bg-white rounded-xl border border-gray-100",
        header: "mb-0 bg-white border-b border-gray-100 pb-4",
      }}
    >
      {renderBody()}
    </Modal>
  );
};
