import { useEffect, useState } from "react";
import { transformMMDDYYYY } from "../lib/transformDate";
import { CommentForm } from "./CommentForm";
import { useOutletContext } from "react-router";

export function Posts() {
  const [count, setCount] = useOutletContext();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/posts", {
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
  }, [count]);

  return (
    <>
      <ul>
        {posts &&
          posts.map((post) => {
            return (
              <li key={post.id}>
                <p>
                  Publish at {transformMMDDYYYY(post.date)} by post.author.name
                </p>
                <h1>{post.title}</h1>
                <p>{post.content}</p>
                <CommentForm postId={post.id} setCount={setCount} />
                {post.comments.length !== 0 && <h4>comments</h4>}
                <ul>
                  {post.comments.map((comment) => {
                    return (
                      <li key={comment.id}>
                        <p>{comment.comment}</p>
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
      </ul>
    </>
  );
}
