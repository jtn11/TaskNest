export const createComment = async (
  workspaceId: string,
  taskId: string,
  token: string,
  comment: string,
  displayName: string,
) => {
  const res = await fetch(
    `http://localhost:8000/api/workspace/${workspaceId}/tasks/${taskId}/comments`,
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ text: comment, userName: displayName }),
    },
  );

  if (!res.ok) {
    throw new Error(`Failed to create comment: ${res.status}`);
  }

  const data = await res.json();
  return data;
};

// fetch Comments
export const fetchComment = async (
  workspaceId: string,
  taskId: string,
  token: string,
) => {
  const res = await fetch(
    `http://localhost:8000/api/workspace/${workspaceId}/tasks/${taskId}/comments`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  const comments = await res.json();
  return comments;
};

export const deleteComment = async (
  workspaceId: string,
  taskId: string,
  token: string,
  commentId: string,
) => {
  const res = await fetch(
    `http://localhost:8000/api/workspace/${workspaceId}/tasks/${taskId}/comments/${commentId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  if (!res.ok) {
    throw new Error("Failed to delete comment");
  }

  return await res.json();
};
