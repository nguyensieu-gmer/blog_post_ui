import { useEffect, useState } from "react";
import { transformMMDDYYYY } from "../lib/transformDate";
import { CommentForm } from "./CommentForm";
import { useOutletContext } from "react-router";

export function Posts() {
  const [count, setCount] = useOutletContext();
  const [posts, setPosts] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL || "?";

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/posts`, {
          method: "GET",
          signal: controller.signal,
          credentials: "include",
        });
        if (!res.ok) {
          throw new Error(`HTTP error: status ${res.status}`);
        }
        const data = await res.json();
        setPosts(data.post);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Fetch failed:", error);
        }
      }
    };
    fetchData();

    return () => controller.abort();
  }, [apiUrl, count]);

  return (
    <div>
      <ul className="space-y-6">
        {posts &&
          posts.map((post) => {
            return (
              <li
                className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
                key={post.id}
              >
                <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm text-gray-500">
                    Publish at{" "}
                    <span className="font-medium text-gray-700">
                      {transformMMDDYYYY(post.date)}
                    </span>
                  </p>
                  <p className="text-sm text-gray-500">
                    By{" "}
                    <span className="font-semibold text-blue-700">
                      {post.author.name}
                    </span>
                  </p>
                </div>
                <div className="border-b border-gray-100 pb-5">
                  <h2 className="mb-3 text-xl font-bold text-gray-800">
                    {post.title}
                  </h2>
                  <p className="whitespace-pre-wrap wrap-break-word leading-7 text-gray-600">
                    {post.content}
                  </p>
                </div>
                <div className="mt-5 space-y-4">
                  <h3>
                    Comments{" "}
                    <span className="bg-sky-200 rounded-full px-1.5">
                      {post.comments.length}
                    </span>
                  </h3>
                  <CommentForm postId={post.id} setCount={setCount} />
                  {post.comments.length > 0 ? (
                    <ul className="space-y-3">
                      {post.comments.map((comment) => (
                        <li
                          key={comment.id}
                          className="rounded-lg bg-gray-50 p-4"
                        >
                          <p className="text-sm wrap-break-word leading-6 text-gray-700">
                            <span className="text-blue-700">
                              {comment.author.name}
                            </span>
                            : {comment.comment}
                          </p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm italic text-gray-400">
                      No comments yet. Be the first to comment!
                    </p>
                  )}
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
