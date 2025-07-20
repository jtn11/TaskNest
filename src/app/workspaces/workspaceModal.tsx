import { PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
  Modal,
  Button,
  TextInput,
  Group,
  Loader,
  Text,
  Box,
  Stack,
  ActionIcon,
  Collapse,
  CheckIcon,
} from "@mantine/core";
import { useState } from "react";
// import { IconCheck, IconTrash, IconPlus } from '@tabler/icons-react';

interface WorkspaceModalProps {
  opened: boolean;
  onClose: () => void;
  onWorkspaceCreated: (workspace: any) => void;
}

export const WorkspaceModal = ({
  opened,
  onClose,
  onWorkspaceCreated,
}: WorkspaceModalProps) => {
  const [name, setName] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [memberEmails, setMemberEmails] = useState<string[]>([]);
  const [addingMember, setAddingMember] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAddEmail = () => {
    const trimmed = emailInput.trim();
    if (trimmed && !memberEmails.includes(trimmed)) {
      setMemberEmails((prev) => [...prev, trimmed]);
    }
    setEmailInput("");
  };

  const handleRemoveEmail = (email: string) => {
    setMemberEmails((prev) => prev.filter((e) => e !== email));
  };

  const handleCreateWorkspace = async () => {
    setLoading(true);
    try {
      // Your workspace creation logic here...
      // onWorkspaceCreated({...})

      setLoading(false);
      onClose();
    } catch (err) {
      console.error("Error creating workspace:", err);
      setLoading(false);
    }
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Create Workspace" centered>
      <Stack>
        <TextInput
          label="Workspace Name"
          placeholder="e.g., Dev Team"
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
          required
        />

        <Button
          leftSection={<PlusIcon className="w-4 h-4" />}
          onClick={() => setAddingMember((prev) => !prev)}
          variant="light"
        >
          Add Member
        </Button>

        <Collapse in={addingMember}>
          <Group grow mt="sm">
            <TextInput
              placeholder="Enter email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.currentTarget.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddEmail()}
            />
            <Button onClick={handleAddEmail}>Add</Button>
          </Group>
        </Collapse>

        {memberEmails.length > 0 && (
          <Box mt="sm">
            <Text fw={500} mb={6}>
              Added Members:
            </Text>
            <Stack gap={8}>
              {memberEmails.map((email) => (
                <Group justify="space-between" key={email}>
                  <Text>{email}</Text>
                  <Group gap={4}>
                    <ActionIcon color="green" variant="light">
                      <CheckIcon className="w-4 h-4" />
                    </ActionIcon>
                    <ActionIcon
                      color="red"
                      variant="light"
                      onClick={() => handleRemoveEmail(email)}
                    >
                      <TrashIcon className="w-4 h-4" />
                    </ActionIcon>
                  </Group>
                </Group>
              ))}
            </Stack>
          </Box>
        )}

        <Group mt="md">
          <Button variant="default" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleCreateWorkspace} loading={loading}>
            Create
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
};
