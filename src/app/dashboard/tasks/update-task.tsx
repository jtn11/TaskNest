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

export const UpdateTask = async (
  taskId: string,
  updates: Task,
  userToken: string,
) => {
  const res = await fetch(`/api/tasks/${taskId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userToken}`, // from AuthContext
    },
    body: JSON.stringify(updates),
  });
  if (!res.ok) throw new Error("Failed to update task");
  return res.json();
};
