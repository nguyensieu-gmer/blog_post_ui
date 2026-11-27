import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { UserContext } from "../context";

export function NavBar() {
  const { user, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL || "?";

  useEffect(() => {
    const controller = new AbortController();
    const fetchUser = async () => {
      const res = await fetch(`${apiUrl}/api/users/me`, {
        method: "GET",
        signal: controller.signal,
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      }
    };
    fetchUser();
    return () => controller.abort();
  }, [apiUrl, setUser]);

  const handleLogOut = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/api/users/log-out`, {
        method: "POST",
        credentials: "include",
      });
      if (!res.ok) {
        console.error(res);
        alert("Something went wrong with api. Please try again");
        return;
      }
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try agian");
    } finally {
      setLoading(false);
    }
  };
  return (
    <nav className="w-full bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-800">
          Hello <span className="text-blue-700">{user?.name || "World!"} </span>
        </h1>
        {!user ? (
          <div className="flex items-center gap-4">
            <Link
              className="text-gray-600 font-medium hover:text-blue-700 transition-colors"
              to="sign-up"
            >
              Sign up
            </Link>
            <Link
              className="bg-blue-700 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              to="log-in"
            >
              Log in
            </Link>
          </div>
        ) : (
          <div>
            <form onSubmit={handleLogOut}>
              <button
                className="bg-red-500 text-white px-5 py-2 rounded-lg font-medium hover:bg-red-600 transition-colors"
                disabled={loading}
                type="submit"
              >
                {loading ? "Logging out..." : "Log out"}
              </button>
            </form>
          </div>
        )}
      </div>
    </nav>
  );
}
