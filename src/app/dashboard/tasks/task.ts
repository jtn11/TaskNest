export const GetCurrentUsersTask = async (
  workspaceId: string,
  token: string,
) => {
  const res = await fetch(
    `http://localhost:8000/api/workspace/${workspaceId}/tasks?limit=100`,
    {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  const tasks = await res.json();
  return tasks;
};
