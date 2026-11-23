export function RmBTN({ postId, setCount }) {
  const handleRemovePost = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/posts/${postId}`, {
        method: "delete",
        credentials: "include",
        headers: {
          "Content-Type": "applicaion/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      }
      setCount((prev) => prev + 1);
    } catch (error) {
      console.error(error);
    }
  };
  return <button onClick={handleRemovePost}>Remove post</button>;
}
