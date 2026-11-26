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
    <button
      onClick={handlePublish}
      className={`rounded-lg px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors ${
        isPublish
          ? "bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700"
          : "bg-green-600 hover:bg-green-700 active:bg-green-800"
      }`}
    >
      {!isPublish ? "Publish" : "Unpublish"}
    </button>
  );
}
