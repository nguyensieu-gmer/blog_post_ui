import { useState } from "react";

export function CommentForm({ postId, setCount }) {
  const [comment, setComment] = useState("");
  const handleAddComment = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/posts/${postId}/comment`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          body: JSON.stringify({
            comment,
          }),
        },
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error(
          data.message ||
            "Something wrong in add comment process. Please try again",
        );
      }
      setCount((prev) => prev + 1);
    } catch (error) {
      alert(error.message);
      console.error(error);
    }
  };
  const handleChangeComment = (e) => {
    setComment(e.target.value);
  };
  return (
    <form onSubmit={handleAddComment}>
      <input
        type="text"
        placeholder="Comment"
        value={comment}
        onChange={handleChangeComment}
      />
      <button>Send</button>
    </form>
  );
}
