export function PublishBTN({ isPublish, postId, setCount }) {
  const valueFetch = !isPublish ? "publish" : "unpublish";
  const handlePublish = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/posts/${postId}/${valueFetch}`,
        {
          method: "post",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        },
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      }
      setCount((prev) => prev + 1);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <button onClick={handlePublish}>
      {!isPublish ? "Publish" : "Unpublish"}
    </button>
  );
}
