import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { UserContext } from "../context";

export function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const handleEmailInput = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordInput = (e) => {
    setPassword(e.target.value);
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    const apiUrl = import.meta.env.VITE_API_URL || "?";
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/users/log-in`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      if (!response.ok) {
        setMessage(data.message || "Invalid email or password");
        return;
      }
      const data = await response.json();
      setUser(data.user);
      localStorage.setItem("access_token", data.token);
      navigate("/");
    } catch (error) {
      setMessage(error.message);
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="mt-10 mx-auto max-w-md space-y-6 rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="text-sm font-medium text-blue-600 transition-colors hover:text-blue-800"
          >
            Go home
          </Link>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
          >
            Go back
          </button>
        </div>

        {/* Heading */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Welcome back</h1>
          <p className="mt-2 text-sm text-gray-500">Log in to your account</p>
        </div>

        {/* Message */}
        {message !== "" && (
          <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
            {message}
          </p>
        )}

        {/* Login form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700"
            >
              Email <span className="text-red-500">*</span>
            </label>

            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={handleEmailInput}
              required
              placeholder="Enter your email"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-700"
            >
              Password
            </label>

            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={handlePasswordInput}
              required
              placeholder="Enter your password"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 active:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>
      </div>
    </>
  );
}
