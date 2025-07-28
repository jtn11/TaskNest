import { Modal, Button, TextInput, Group, Stack } from "@mantine/core";
import { useState } from "react";

interface WorkspaceModalProps {
  open: boolean;
  onClose: () => void;
  onWorkspaceCreated?: (workspace: any) => void;
}

export const WorkspaceModal = ({ open, onClose }: WorkspaceModalProps) => {
  const [name, setName] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddEmail = () => {};

  const handleCreateWorkspace = async () => {
    setLoading(true);
    try {
      setLoading(false);
      // onClose();
    } catch (err) {
      console.error("Error creating workspace:", err);
      setLoading(false);
    }
  };

  return (
    <Modal opened={open} onClose={close} title="Create Workspace" centered>
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
            Add Member
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
};
