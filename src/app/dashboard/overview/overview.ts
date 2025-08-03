export const GetOverViewTasks = async (workspaceId: string, token: string) => {
  // /api/workspace/:id/tasks

  const res = await fetch(
    `http://localhost:8000/api/workspace/${workspaceId}/tasks`,
    {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    },
  );

  if (!res.ok) throw new Error(`Failed to fetch task: ${res.status}`);
  const task = await res.json();
  return task;
};
