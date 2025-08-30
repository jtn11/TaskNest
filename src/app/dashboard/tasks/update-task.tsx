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

type TaskUpdate = Partial<Task>;

export const UpdateTask = async (
  taskId: string,
  workspaceId: string,
  updates: TaskUpdate,
  userToken: string,
) => {
  const res = await fetch(
    `http://localhost:8000/api/workspace/${workspaceId}/tasks/${taskId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`, // from AuthContext
      },
      body: JSON.stringify(updates),
    },
  );
  if (!res.ok) throw new Error("Failed to update task");
  return res.json();
};
