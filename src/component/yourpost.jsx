import { useEffect, useState } from "react";

export function YourPost() {
  const [userPost, setUserPost] = useState(null);
  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/posts/user-post", {
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
  }, []);
  return (
    <div>
      <ul>
        {userPost?.map((post) => {
          return (
            <li key={post.id}>
              <h1>{post.title}</h1>
              <p>{post.content}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
