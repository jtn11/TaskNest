"use client";
import {
  ChevronDownIcon,
  UserPlusIcon,
  UsersIcon,
  EnvelopeIcon,
  XMarkIcon,
  ExclamationCircleIcon,
  CheckCircleIcon,
  ClockIcon,
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
import { useState, useEffect } from "react";
import { AddWorkspaceMember } from "@/app/workspaces/members";
import { useAuth } from "@/context/auth-context";

interface RecentInvite {
  email: string;
  username?: string;
  avatarColor: string;
}

export const MemberWorkSpace = () => {
  const { members, activeWorkspace, setmembers } = useWorkspace();
  const [showModal, setShowModal] = useState(false);

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [recentInvites, setRecentInvites] = useState<RecentInvite[]>([]);
  const { currentUser } = useAuth();

  // Load recent invites when modal opens
  useEffect(() => {
    if (showModal && typeof window !== "undefined") {
      const stored = localStorage.getItem("tasknest_recent_invites");
      if (stored) {
        try {
          setRecentInvites(JSON.parse(stored));
        } catch (e) {
          console.error("Error loading recent invites:", e);
        }
      }
    }
  }, [showModal]);

  // Save new invite to recent invites list
  const saveRecentInvite = (emailStr: string, usernameStr?: string) => {
    const emailLower = emailStr.trim().toLowerCase();
    const currentInvites = [...recentInvites];
    const existingIndex = currentInvites.findIndex(
      (item) => item.email.toLowerCase() === emailLower
    );

    const avatarColors = [
      "blue",
      "indigo",
      "violet",
      "purple",
      "pink",
      "teal",
      "cyan",
    ];
    const randomColor =
      avatarColors[Math.floor(Math.random() * avatarColors.length)];

    const newItem: RecentInvite = {
      email: emailLower,
      username: usernameStr || emailLower.split("@")[0],
      avatarColor: randomColor,
    };

    if (existingIndex > -1) {
      // Remove it from its current position so we can move it to the top
      currentInvites.splice(existingIndex, 1);
    }

    const updated = [newItem, ...currentInvites].slice(0, 5);
    setRecentInvites(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("tasknest_recent_invites", JSON.stringify(updated));
    }
  };

  // Remove a recent invite from the list
  const removeRecentInvite = (emailStr: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Stop click from auto-filling the input
    const updated = recentInvites.filter(
      (item) => item.email.toLowerCase() !== emailStr.trim().toLowerCase()
    );
    setRecentInvites(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("tasknest_recent_invites", JSON.stringify(updated));
    }
  };

  const handleAddMember = async () => {
    if (!activeWorkspace || !currentUser) return;
    
    const cleanEmail = email.trim();
    if (!cleanEmail) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const token = await currentUser.getIdToken();
      const result = await AddWorkspaceMember(activeWorkspace.id, cleanEmail, token);
      
      if (result && result.user) {
        // Resolve uid/userId mismatch for consistent key mapping
        const newUser = {
          ...result.user,
          uid: result.user.uid || result.user.userId,
        };

        setmembers((prev) => {
          if (prev.some((m) => m.uid === newUser.uid)) return prev;
          return [...prev, newUser];
        });

        // Add to recent invites
        saveRecentInvite(cleanEmail, result.user.username);

        setSuccessMessage(result.message || "Member invited successfully!");
        setEmail("");

        // Keep modal open briefly to show success animation/banner
        setTimeout(() => {
          setShowModal(false);
          setSuccessMessage(null);
        }, 1500);
      } else {
        setError(result?.message || "Failed to add member");
      }
    } catch (err: any) {
      setError(err?.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

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

      <Modal
        opened={showModal}
        onClose={() => {
          setShowModal(false);
          setError(null);
          setSuccessMessage(null);
        }}
        withCloseButton={false}
        size="md"
        radius="lg"
        padding="xl"
        centered
        styles={{
          content: {
            position: "relative",
            overflow: "hidden",
          },
        }}
      >
        {/* Custom Close Button */}
        <button
          onClick={() => {
            setShowModal(false);
            setError(null);
            setSuccessMessage(null);
          }}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer outline-none"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>

        <Stack gap="lg">
          {/* Header Section */}
          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-400 to-blue-500 flex items-center justify-center text-white shadow-md shadow-blue-500/10 shrink-0">
              <UserPlusIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-lg leading-tight">
                Invite Team Member
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Add collaborators to this workspace
              </p>
            </div>
          </div>

          {/* Message Banner for Errors or Success */}
          {error && (
            <div className="flex items-start space-x-2.5 p-3 rounded-xl bg-rose-50 border border-rose-100 text-rose-700 text-sm">
              <ExclamationCircleIcon className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
              <span className="font-medium">{error}</span>
            </div>
          )}

          {successMessage && (
            <div className="flex items-start space-x-2.5 p-3 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm">
              <CheckCircleIcon className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <span className="font-medium">{successMessage}</span>
            </div>
          )}

          {/* Input Form */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              Member's Email Address
            </label>
            <TextInput
              placeholder="e.g., alex@company.com"
              value={email}
              onChange={(e) => {
                setEmail(e.currentTarget.value);
                if (error) setError(null);
              }}
              leftSection={<EnvelopeIcon className="w-4 h-4 text-slate-400" />}
              styles={{
                input: {
                  height: "44px",
                  borderRadius: "10px",
                  border: "1px solid var(--mantine-color-gray-2)",
                  fontSize: "14px",
                  "&:focus": {
                    borderColor: "var(--mantine-color-blue-5)",
                  },
                },
              }}
              required
            />
          </div>

          {/* Recent Invites Section */}
          {recentInvites.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center space-x-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                <ClockIcon className="w-3.5 h-3.5" />
                <span>Recent Invites</span>
              </div>
              <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                {recentInvites.map((invite) => (
                  <div
                    key={invite.email}
                    onClick={() => setEmail(invite.email)}
                    className="flex items-center justify-between p-2 rounded-xl border border-slate-100 hover:border-blue-100 hover:bg-blue-50/40 cursor-pointer transition-all duration-200 group"
                  >
                    <div className="flex items-center space-x-2.5 min-w-0">
                      <Avatar
                        color={invite.avatarColor || "blue"}
                        radius="lg"
                        size="sm"
                        className="w-7 h-7 text-[10px] font-bold"
                      >
                        {invite.username
                          ? invite.username.charAt(0).toUpperCase()
                          : invite.email.charAt(0).toUpperCase()}
                      </Avatar>
                      <div className="min-w-0 flex flex-col">
                        {invite.username && (
                          <span className="text-xs font-semibold text-slate-700 truncate">
                            {invite.username}
                          </span>
                        )}
                        <span className="text-[11px] text-slate-400 truncate">
                          {invite.email}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={(e) => removeRecentInvite(invite.email, e)}
                      className="p-1 rounded-lg text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition-all opacity-0 group-hover:opacity-100 cursor-pointer outline-none"
                      title="Remove from recents"
                    >
                      <XMarkIcon className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-end space-x-3 mt-2">
            <Button
              variant="subtle"
              color="gray"
              onClick={() => {
                setShowModal(false);
                setError(null);
                setSuccessMessage(null);
              }}
              className="rounded-lg font-medium text-slate-500 hover:bg-slate-100 px-4 h-10 transition-colors cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddMember}
              loading={loading}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg shadow-md hover:shadow-lg shadow-blue-500/10 px-5 h-10 transition-all transform hover:-translate-y-0.5 active:translate-y-0 font-medium cursor-pointer"
            >
              Send Invite
            </Button>
          </div>
        </Stack>
      </Modal>
    </div>
  );
};

