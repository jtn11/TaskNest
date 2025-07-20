import { useState } from "react";
import { WorkspaceModal } from "./workspaceModal";

export const WorkspaceUI = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [workspaces, setWorkspaces] = useState<any[]>([]);

  const handleAddWorkspace = (workspace: any) => {
    setWorkspaces((prev) => [...prev, workspace]);
  };

  return (
    <div className="w-64 border-r p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Workspaces</h2>
        <button
          onClick={() => setModalOpen(true)}
          className="text-blue-500 hover:underline text-sm"
        >
          + New
        </button>
      </div>

      <ul className="space-y-2">
        <li>user1</li>
        <li>user1</li>
        <li>user1</li>
        <li>user1</li>
      </ul>

      <WorkspaceModal
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        onWorkspaceCreated={handleAddWorkspace}
      />
    </div>
  );
};
