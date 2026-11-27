import { useState } from "react";

export function CommentForm({ postId, setCount }) {
  const [comment, setComment] = useState("");
  const handleAddComment = async () => {
    const apiUrl = import.meta.env.VITE_API_URL || "?";
    try {
      const res = await fetch(`${apiUrl}/api/posts/${postId}/comment`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify({
          comment,
        }),
      });
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
    <form
      className="flex flex-col gap-3 sm:items-center sm:flex-row"
      onSubmit={handleAddComment}
    >
      <input
        type="text"
        placeholder="Comment"
        value={comment}
        onChange={handleChangeComment}
        required
        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />
      <button className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 active:bg-blue-800">
        Send
      </button>
    </form>
  );
}
