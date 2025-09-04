export const createComment = async (
  workspaceId: string,
  taskId: string,
  token: string,
  comment: string,
  displayName : string
) => {
  const res = await fetch(
    `http://localhost:8000/api/workspace/${workspaceId}/tasks/${taskId}/comments`,
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorisation: `Bearer ${token}`,
      },
      body: JSON.stringify({ text: comment ,  userName: displayName}),
    },
  );


  if (!res.ok) {
    throw new Error(`Failed to create comment: ${res.status}`);
  }

  const data = await res.json();
  return data;
};
