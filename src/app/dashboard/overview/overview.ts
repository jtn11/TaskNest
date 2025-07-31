export const GetOverViewTasks = async (workspaceId: string, token: string) => {
  const res = await fetch(
    `http://localhost:8000/api/tasks?workspaceId=${workspaceId}`,
    {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    },
  );

  if (!res.ok) throw new Error(`Failed to fetch task: ${res.status}`);
  const task = await res.json();
  return task;
};
