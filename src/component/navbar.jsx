import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { UserContext } from "../context";

export function NavBar() {
  const { user, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    const fetchUser = async () => {
      const res = await fetch("http://localhost:3000/api/users/me", {
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
  }, [setUser]);

  const handleLogOut = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/users/log-out", {
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
    <div>
      <h1>Hello {user?.name || "World!"} </h1>
      {!user ? (
        <>
          <Link to="sign-up">Sign up</Link>
          <Link to="log-in">Log in</Link>
        </>
      ) : (
        <div>
          <form onSubmit={handleLogOut}>
            <button disabled={loading} type="submit">
              Log out
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
