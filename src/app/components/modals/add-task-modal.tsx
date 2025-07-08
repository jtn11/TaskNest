import { Button, Modal, Textarea } from "@mantine/core"

interface ModalProps {
    opened: boolean,
    onClose: () => void
}

export const TaskModal = ({ opened, onClose }: ModalProps) => {

    const renderBody = () => {

        return (
            <>
            <Textarea
                size="md"
                radius="md"
                label="Input label"
                description="Input description"
                placeholder="Input placeholder"
            />
                        <Textarea
                size="md"
                radius="md"
                label="Input label"
                description="Input description"
                placeholder="Input placeholder"
            />
            <Button/>
            <Button/>
            </>
        )
    }

    return (
        <Modal
            opened={opened}
            centered
            onClose={onClose}
            
            title={
                "Create New Issue"
            }
            size={'xl'}
            closeButtonProps={{
                size: 'sm'
            }}
            overlayProps={{
                opacity: 0.8
            }}
            classNames={{
                close: 'text-secondary title-prompt-close-button mr-3',
                body: 'bg-primary p-0',
                root: 'z-[var(--z-modal)] bg-primary border-primary border-2 border-solid',
                content: 'w-200 flex-none shadow-none p-0',
                header: 'p-0 mb-0 border-b border-gray-200 bg-primary h-12'
            }}
        >
            {renderBody()}
        </Modal>
    )
}