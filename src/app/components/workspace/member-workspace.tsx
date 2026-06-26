"use client";
import {
  ChevronDownIcon,
  UserPlusIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import {
  Menu,
  Button,
  Group,
  Stack,
  TextInput,
  Divider,
  Avatar,
  Modal,
} from "@mantine/core";
import { useWorkspace } from "@/context/workspace-context";
import { useState } from "react";
import { AddWorkspaceMember } from "@/app/workspaces/members";
import { useAuth } from "@/context/auth-context";

export const MemberWorkSpace = () => {
  const { members, activeWorkspace, setmembers } = useWorkspace();
  const [showModal, setShowModal] = useState(false);

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();

  const handleAddMember = async () => {
    if (!activeWorkspace || !currentUser) return;
    if (email == " ") return;

    const token = await currentUser.getIdToken();
    const result = await AddWorkspaceMember(activeWorkspace.id, email, token);
    if (result.user) {
      setmembers((prev) => [...prev, result.user]);
      setEmail("");
      setShowModal(false);
    } else {
      alert(result?.message || "Failed to add member");
    }
  };

  if (showModal) {
    return (
      <Modal
        opened
        onClose={() => setShowModal(false)}
        title="Invite Member"
        yOffset={150}
      >
        <Stack>
          <TextInput
            label="Member's email"
            placeholder="e.g., abc@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            required
          />

          <Group mt="md">
            <Button variant="default" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddMember} loading={loading}>
              Add Member
            </Button>
          </Group>
        </Stack>
      </Modal>
    );
  }

  return (
    <div className="px-2 py-1.5">
      <Menu shadow="md" width={240} position="bottom-start" withArrow>
        <Menu.Target>
          <Button
            variant="transparent"
            fullWidth
            className="flex items-center justify-between w-full px-2 py-1.5 text-left bg-white hover:bg-slate-100/60 border border-slate-200/80 rounded-xl shadow-sm transition-all duration-200 outline-none cursor-pointer"
            styles={{
              inner: {
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              },
              label: { flexGrow: 1, width: "100%" },
            }}
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center space-x-2.5 min-w-0">
                {/* Workspace Avatar */}
                <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-blue-600 to-blue-400 flex items-center justify-center text-white text-[10px] font-bold shadow-sm shrink-0">
                  {activeWorkspace
                    ? activeWorkspace.name.charAt(0).toUpperCase()
                    : "W"}
                </div>

                <span className="font-semibold text-slate-800 text-sm truncate">
                  {activeWorkspace ? activeWorkspace.name : "Workspace"}
                </span>
              </div>

              <ChevronDownIcon className="w-4 h-4 text-slate-400 shrink-0 ml-1" />
            </div>
          </Button>
        </Menu.Target>

        <Menu.Dropdown className="bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-xl shadow-lg p-1.5 min-w-[220px]">
          {/* Members Section */}
          <Menu.Label className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            <Group className="flex items-center justify-between w-full">
              <div className="flex items-center">
                <UsersIcon className="w-3.5 h-3.5 text-slate-400 mr-2" />
                <span>Members</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 font-medium">
                {members.length}
              </span>
            </Group>
          </Menu.Label>

          {/* Member List */}
          <div className="space-y-0.5 my-1">
            {members.map((member) => (
              <Menu.Item
                key={member.uid}
                className="flex items-center px-3 py-1.5 hover:bg-slate-100/60 rounded-lg transition-colors duration-150"
              >
                <div className="flex items-center space-x-2.5">
                  <Avatar
                    color="blue"
                    radius="xl"
                    size="sm"
                    className="w-5 h-5 flex items-center justify-center text-white text-[9px] font-bold shrink-0"
                  >
                    {member.username.charAt(0).toUpperCase()}
                  </Avatar>
                  <span className="text-sm font-medium text-slate-700">
                    {member.username}
                  </span>
                </div>
              </Menu.Item>
            ))}
          </div>

          {/* Divider */}
          <Divider className="border-t border-slate-100 my-1" />

          {/* Add Member Button */}
          <Menu.Item
            className="flex items-center w-full px-3 py-2 text-left hover:bg-blue-50 text-blue-600 hover:text-blue-700 rounded-lg transition-colors duration-150 font-medium text-sm"
            onClick={() => setShowModal(true)}
            leftSection={
              <UserPlusIcon className="w-4 h-4 text-blue-500 shrink-0 mr-1" />
            }
          >
            Invite team member
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </div>
  );
};
