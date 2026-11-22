import { useContext, useEffect, useState } from "react";
import { BlogForm } from "./blogForm";
import { UserContext } from "../context";

export function YourPost() {
  const [userPost, setUserPost] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const { user } = useContext(UserContext);

  const handleOpenForm = () => {
    setOpenForm(true);
  };

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
  return !user ? (
    <h1>Please login to use this service</h1>
  ) : (
    <div>
      {openForm ? (
        <BlogForm setOpenForm={setOpenForm} />
      ) : (
        <button onClick={handleOpenForm}>Add new Post</button>
      )}
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
