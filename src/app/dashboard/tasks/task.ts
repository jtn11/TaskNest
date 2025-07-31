export const GetCurrentUsersTask = async (
  workspaceId: string,
  SelectedStatus: string,
  token: string,
) => {
  const res = await fetch(
    `http://localhost:8000/api/tasks?workpaceId=${workspaceId}&status=${SelectedStatus}&onlyMine=true}`,
    {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  const tasks = await res.json();
  return tasks;
};
