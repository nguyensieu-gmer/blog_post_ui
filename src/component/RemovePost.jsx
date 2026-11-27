export function RmBTN({ postId, setCount }) {
  const apiUrl = import.meta.env.VITE_API_URL || "?";
  const handleRemovePost = async () => {
    try {
      const res = await fetch(`${apiUrl}/api/posts/${postId}`, {
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
  return (
    <button
      onClick={handleRemovePost}
      className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-red-700 active:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
    >
      Remove post
    </button>
  );
}
