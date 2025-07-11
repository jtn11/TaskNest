// import { Button, Modal, Textarea } from "@mantine/core"

import { Button, Modal, Switch, Textarea } from "@mantine/core";

interface ModalProps {
  opened: boolean;
  onClose: () => void;
}

export const TaskModal = ({ opened, onClose }: ModalProps) => {
  const renderBody = () => {
    return (
      <div className="px-6 py-1 space-y-4">
        {/* Title Input */}
        <Textarea
          size="md"
          radius="md"
          placeholder="Issue title"
          minRows={1}
          maxRows={1}
          autosize
          classNames={{
            input:
              "text-bold text-lg font-medium border-none focus:border-blue-500",
          }}
        />

        {/* Description Input */}
        <Textarea
          size="md"
          radius="md"
          placeholder="Add description..."
          minRows={6}
          classNames={{
            input: "border-gray-300 focus:border-blue-500",
          }}
        />

        {/* Bottom Section */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          {/* Left side - Tags and Options */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              leftSection={
                <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
              }
              classNames={{
                root: "border-gray-300 text-gray-700 hover:bg-gray-50",
              }}
            >
              Backlog
            </Button>

            <Button
              variant="outline"
              size="sm"
              classNames={{
                root: "border-gray-300 text-gray-700 hover:bg-gray-50",
              }}
            >
              --- Priority
            </Button>

            <Button
              variant="outline"
              size="sm"
              leftSection={
                <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center text-xs font-semibold text-black">
                  JS
                </div>
              }
              classNames={{
                root: "border-gray-300 text-gray-700 hover:bg-gray-50",
              }}
            >
              Asignee
            </Button>

            <Button
              variant="subtle"
              size="sm"
              p={4}
              classNames={{
                root: "text-gray-500 hover:text-gray-700 hover:bg-gray-100",
              }}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </Button>

            <Button
              variant="subtle"
              size="sm"
              p={4}
              classNames={{
                root: "text-gray-500 hover:text-gray-700 hover:bg-gray-100",
              }}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                />
              </svg>
            </Button>
          </div>

          {/* Right side - Actions */}

          <Button
            size="sm"
            classNames={{
              root: "bg-blue-600 hover:bg-blue-700 text-white",
            }}
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
        <span className="text-gray-900 text-xl font-medium">Add Task</span>
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
        header: "p-4 mb-0  bg-white",
      }}
    >
      {renderBody()}
    </Modal>
  );
};
