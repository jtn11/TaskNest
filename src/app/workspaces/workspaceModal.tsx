import { Modal, Button, TextInput, Stack, Group } from "@mantine/core";
import { useState } from "react";

interface WorkspaceModalProps {
  open: boolean;
  onClose: () => void;
  onWorkspaceCreated?: (workspace: unknown) => void;
}

export const WorkspaceModal = ({ open, onClose }: WorkspaceModalProps) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateWorkspace = async () => {
    setLoading(true);
    try {
      setLoading(false);
      onClose();
    } catch (err) {
      console.error("Error creating workspace:", err);
      setLoading(false);
    }
  };

  return (
    <Modal opened={open} onClose={onClose} title="Create Workspace" centered>
      <Stack>
        <TextInput
          label="Workspace Name"
          placeholder="e.g., Dev Team"
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
          required
        />

        <Group mt="md">
          <Button variant="default" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleCreateWorkspace} loading={loading}>
            Create Workspace
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
};
