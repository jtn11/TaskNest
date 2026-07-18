export const GetOverViewTasks = async (
  workspaceId: string,
  token: string,
  cursor?: number,
) => {
  // /api/workspace/:id/tasks

  let url = `http://localhost:8000/api/workspace/${workspaceId}/tasks?limit=5`;

  if (cursor) {
    url += `&cursor=${cursor}`;
  }

  const res = await fetch(url, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("Failed");

  return res.json(); // return full object
};
