import { Button, Modal, Textarea, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";
import { PaperClipIcon } from "@heroicons/react/24/outline";
import StatusDropdown from "@/app/components/modals/status-dropwdown";
import PriorityDropdown from "@/app/components/modals/priority-dropdown";
import AssigneeDropdown from "@/app/components/modals/assignee-dropdown";
import { ArrowUpCircleIcon, XCircleIcon } from "@heroicons/react/20/solid";
import { cn } from "@/lib/cn";
import { useWorkspace } from "@/context/workspace-context";
import { UpdateTask } from "./update-task";
import { useAuth } from "@/context/auth-context";
import { createComment, deleteComment, fetchComment } from "./task-comments";
import { useTasks } from "@/context/task-context";

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

interface Comment {
  id: string;
  text: string;
  createdBy: string;
  displayName: string;
  createdAt: string;
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
  const [commentArr, setCommentArr] = useState<Comment[]>([]);

  const { activeWorkspace } = useWorkspace();
  const { currentUser } = useAuth();
  const { token } = useWorkspace();
  const { triggerListRefresh } = useTasks();

  //fetching comments

  useEffect(() => {
    const getComments = async () => {
      if (!selectedListItem?.id || !activeWorkspace?.id) {
        return;
      }
      const comments = await fetchComment(
        activeWorkspace?.id,
        selectedListItem.id,
        token,
      );
      console.log(comments);
      setCommentArr(comments.comments);
    };
    getComments();
  }, [selectedListItem?.id, activeWorkspace?.id, token]);

  const handleComments = async () => {
    if (
      !comment.trim() ||
      !selectedListItem ||
      !activeWorkspace?.id ||
      !token
    ) {
      return;
    }
    const displayName =
      currentUser?.email?.split("@")[0] ||
      currentUser?.displayName ||
      "Unknown";
    console.log(displayName);
    try {
      const newComment = await createComment(
        activeWorkspace.id,
        selectedListItem.id,
        token,
        comment,
        displayName,
      );
      setCommentArr((prev) => [...prev, newComment]);
      setComment("");
    } catch (error) {
      console.log("Error creating Comment", error);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!selectedListItem || !activeWorkspace?.id || !token) {
      return;
    }
    await deleteComment(
      activeWorkspace.id,
      selectedListItem.id,
      token,
      commentId,
    );
    setCommentArr((prev) => prev.filter((c) => c.id !== commentId));
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
        activeWorkspace.id,
        changes,
        userToken,
      );
      console.log(" Task updated successfully");
      triggerListRefresh();
      setOpenDetailedView(false);
    } catch (err) {
      console.error("Failed to update task:", err);
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
            placeholder="Add a detailed description..."
            minRows={3}
            maxRows={8}
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
              <StatusDropdown value={status} onChange={setStatus} />
            </div>
            
            <div className="flex items-center gap-1.5 bg-slate-50/50 border border-slate-200/60 rounded-xl px-2.5 py-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider select-none">Priority:</span>
              <PriorityDropdown value={priority} onChange={setPriority} />
            </div>

            <div className="flex items-center gap-1.5 bg-slate-50/50 border border-slate-200/60 rounded-xl px-2.5 py-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider select-none">Assignee:</span>
              <AssigneeDropdown value={assignedTo} onChange={setAssignedTo} />
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="pt-4 border-t border-slate-100 space-y-4">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            Comments ({commentArr ? commentArr.length : 0})
          </h4>

          {/* Comment list */}
          <div className="space-y-3 max-h-[200px] overflow-y-auto pr-1">
            {commentArr && commentArr.map((comment) => (
              <div key={comment.id} className="flex gap-3 items-start relative group">
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center text-white text-[10px] font-bold shrink-0 uppercase">
                  {comment.displayName ? comment.displayName.charAt(0) : "U"}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700">
                      {comment.displayName || "Unknown User"}
                    </span>
                    <button 
                      onClick={() => handleDeleteComment(comment.id)}
                      className="text-slate-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 cursor-pointer"
                    >
                      <XCircleIcon className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="bg-slate-50 border border-slate-100/60 rounded-2xl px-4 py-2 text-xs text-slate-600 leading-relaxed mt-1 whitespace-pre-wrap">
                    {comment.text}
                  </p>
                </div>
              </div>
            ))}
            {(!commentArr || commentArr.length === 0) && (
              <p className="text-xs text-slate-400 italic">No comments yet. Start the conversation!</p>
            )}
          </div>

          {/* New Comment Input */}
          <div className="flex gap-3 items-start pt-1">
            <div className="flex-1 rounded-xl border border-slate-200 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 overflow-hidden shadow-sm bg-white p-2 flex items-center gap-2 transition-all">
              <Textarea
                variant="unstyled"
                placeholder="Write a comment..."
                minRows={1}
                maxRows={4}
                autosize
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="flex-1"
                classNames={{
                  input: "w-full text-xs text-slate-600 placeholder-slate-400 p-0 focus:outline-none border-none bg-transparent resize-none",
                }}
              />
              <button
                onClick={handleComments}
                disabled={!comment.trim()}
                className={cn(
                  "p-1 rounded-lg transition-all cursor-pointer",
                  comment.trim()
                    ? "text-blue-500 hover:bg-blue-50"
                    : "text-slate-300 cursor-not-allowed",
                )}
              >
                <ArrowUpCircleIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
          <Button
            size="sm"
            variant="subtle"
            color="gray"
            onClick={() => setOpenDetailedView(false)}
            className="text-xs font-semibold text-slate-500 hover:bg-slate-100 cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            size="sm"
            onClick={handleUpdate}
            className="text-xs font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg shadow-sm px-4.5 py-2 cursor-pointer transition-all duration-150 active:scale-95"
          >
            Update Task
          </Button>
        </div>
      </div>
    );
  };

  return (
    <Modal
      opened
      centered
      onClose={() => setOpenDetailedView(false)}
      title={
        <span className="text-slate-800 text-base font-bold tracking-tight">
          Task Details
        </span>
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
