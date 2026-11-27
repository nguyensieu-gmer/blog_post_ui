import { useContext, useEffect, useState } from "react";
import { BlogForm } from "./blogForm";
import { UserContext } from "../context";
import { PublishBTN } from "./PublishBTN";
import { RmBTN } from "./RemovePost";
import { CommentForm } from "./CommentForm";
import { useOutletContext } from "react-router";
import { transformMMDDYYYY } from "../lib/transformDate";

export function YourPost() {
  const [count, setCount] = useOutletContext();
  const [userPost, setUserPost] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const { user } = useContext(UserContext);
  const apiUrl = import.meta.env.VITE_API_URL || "?";

  const handleOpenForm = () => {
    setOpenForm(true);
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const res = await fetch(`${apiUrl}/api/comments/${commentId}`, {
        method: "delete",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Something wrong with api");
      }
      setCount((prev) => prev + 1);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/posts/user-post`, {
          method: "GET",
          signal: controller.signal,
          credentials: "include",
        });
        const data = await res.json();
        if (!res.ok) {
          console.error(data);
          return;
        }
        setUserPost(data.post);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Fetch failed:", error);
        }
        console.error(error);
      }
    };
    fetchData();
    return () => controller.abort();
  }, [apiUrl, count]);

  return !user ? (
    <div className="flex min-h-[600px] items-center justify-center rounded-xl bg-white p-8 shadow-sm">
      <div className="text-center">
        <h1 className="text-xl font-bold text-gray-800">
          Please login to use this service
        </h1>
      </div>
    </div>
  ) : (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Your Posts</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your posts and comments.
          </p>
        </div>

        {!openForm && (
          <button
            className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 active:bg-blue-800"
            onClick={handleOpenForm}
          >
            + Add new Post
          </button>
        )}
      </div>

      {/* Blog Form */}
      {openForm && (
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <BlogForm setOpenForm={setOpenForm} />
        </div>
      )}

      {/* Posts */}
      <ul className="space-y-6">
        {userPost?.map((post) => (
          <li
            key={post.id}
            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            {/* Actions and status */}
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <PublishBTN
                  postId={post.id}
                  isPublish={post.published}
                  setCount={setCount}
                />

                <RmBTN postId={post.id} setCount={setCount} />
              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  post.published
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {post.published ? "Published" : "Draft"}
              </span>
            </div>

            {/* Post content */}
            <div className="border-b border-gray-100 pb-5">
              <p className="text-sm text-gray-500">
                Publish at{" "}
                <span className="font-medium text-gray-700">
                  {transformMMDDYYYY(post.date)}
                </span>{" "}
                by {post.author.name}
              </p>
              <h2 className="my-3 text-xl font-bold text-gray-800">
                {post.title}
              </h2>

              <p className="whitespace-pre-wrap break-words leading-7 text-gray-600">
                {post.content}
              </p>
            </div>

            {/* Comments */}
            <div className="mt-5 space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Comments ({post.comments.length})
              </h3>

              <CommentForm postId={post.id} setCount={setCount} />

              {post.comments.length > 0 ? (
                <ul className="space-y-3">
                  {post.comments.map((comment) => (
                    <li
                      className="flex items-start justify-between gap-3 rounded-lg bg-gray-50 p-4"
                      key={comment.id}
                    >
                      <div className="min-w-0 flex-1">
                        <span className="mb-1 text-sm font-semibold text-blue-600">
                          {comment.author.name}:
                        </span>{" "}
                        <span className="break-words text-sm leading-6 text-gray-700">
                          {comment.comment}
                        </span>
                      </div>

                      <button
                        className="shrink-0 rounded-md px-3 py-2 text-xs font-semibold text-red-600 transition-colors hover:bg-red-100"
                        onClick={() => handleDeleteComment(comment.id)}
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm italic text-gray-400">No comments yet.</p>
              )}
            </div>
          </li>
        ))}
      </ul>

      {/* Empty posts */}
      {userPost?.length === 0 && (
        <div className="rounded-xl border border-dashed border-gray-300 bg-white py-12 text-center">
          <p className="text-sm text-gray-500">
            You haven't created any posts yet.
          </p>
        </div>
      )}
    </div>
  );
}
