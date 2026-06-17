import { Modal, Button, TextInput } from "@mantine/core";
import { useState } from "react";
import { useWorkspace } from "@/context/workspace-context";

interface WorkspaceModalProps {
  open: boolean;
  onClose: () => void;
  onWorkspaceCreated?: (workspace: unknown) => void;
}

export const WorkspaceModal = ({ open, onClose }: WorkspaceModalProps) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const { handleCreateWorkspace } = useWorkspace();

  const handleCreate = async () => {
    if (name.trim() === "") return;
    setLoading(true);
    try {
      await handleCreateWorkspace(name);
      setName("");
      onClose();
    } catch (err) {
      console.error("Error creating workspace:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      opened={open}
      onClose={onClose}
      title={
        <span className="text-slate-800 text-base font-bold tracking-tight">Create Workspace</span>
      }
      centered
      size="md"
      closeButtonProps={{
        size: "sm",
      }}
      overlayProps={{
        opacity: 0.3,
        blur: 2,
      }}
      classNames={{
        close: "text-slate-400 hover:text-slate-600 transition-colors cursor-pointer",
        body: "bg-white p-6 space-y-4",
        root: "z-[var(--z-modal)]",
        content: "shadow-2xl bg-white rounded-[24px] overflow-hidden border border-slate-100",
        header: "mb-0 bg-white border-b border-slate-100 px-6 py-4",
      }}
    >
      <div className="space-y-4">
        <TextInput
          label="Workspace Name"
          placeholder="e.g., Dev Team"
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
          required
          autoFocus
          classNames={{
            input: "border-slate-200 focus:border-blue-500 rounded-lg text-sm text-slate-800 placeholder-slate-400 h-10 transition-colors",
            label: "text-xs font-semibold text-slate-500 mb-1.5"
          }}
        />

        <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
          <Button
            size="sm"
            variant="subtle"
            color="gray"
            onClick={onClose}
            disabled={loading}
            className="text-xs font-semibold text-slate-500 hover:bg-slate-100 cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            size="sm"
            onClick={handleCreate}
            loading={loading}
            disabled={name.trim() === ""}
            className="text-xs font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg shadow-sm px-4 cursor-pointer transition-all duration-150 active:scale-95"
          >
            Create Workspace
          </Button>
        </div>
      </div>
    </Modal>
  );
};
