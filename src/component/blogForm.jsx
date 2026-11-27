import { useState } from "react";

export function BlogForm({ setOpenForm }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const handleSubmit = async () => {
    const apiUrl = import.meta.env.VITE_API_URL || "?";
    try {
      const res = await fetch(`${apiUrl}/api/posts/`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify({
          title,
          content,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Title */}
      <div className="space-y-2">
        <label
          htmlFor="title"
          className="block text-sm font-semibold text-gray-700"
        >
          Title
        </label>

        <input
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={handleTitleChange}
          required
          placeholder="Enter post title..."
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </div>

      {/* Content */}
      <div className="space-y-2">
        <label
          htmlFor="content"
          className="block text-sm font-semibold text-gray-700"
        >
          Content
        </label>

        <textarea
          name="content"
          id="content"
          value={content}
          onChange={handleContentChange}
          required
          rows={6}
          placeholder="Write your post content..."
          className="w-full resize-y rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm leading-6 text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 border-t border-gray-100 pt-4">
        <button
          type="button"
          onClick={() => setOpenForm(false)}
          className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100 active:bg-gray-200"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Add
        </button>
      </div>
    </form>
  );
}
