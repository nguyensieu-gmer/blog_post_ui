import { useContext, useState } from "react";
import { UserContext } from "../context";
import { Link, useNavigate } from "react-router";

export function SignUp() {
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL || "?";

  function handleNameInput(e) {
    setUsername(e.target.value);
  }

  function handleEmailInput(e) {
    setEmail(e.target.value);
  }

  function handlePasswordInput(e) {
    setPassword(e.target.value);
  }

  function handleConfirmInput(e) {
    setConfirmpassword(e.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);

    if (password !== confirmpassword) {
      setMessage("Passwords do not match!");
      setLoading(false);
      return;
    }

    try {
      setMessage("");

      const response = await fetch(`${apiUrl}/api/users/sign-up`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
          confirmpassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Signup failed!");
      }

      setMessage("Signup successful!");
      setUser(data.user);
      localStorage.setItem("access_token", data.token);
      navigate("/");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="mt-10 mx-auto max-w-md space-y-6 rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        {/* Navigation */}
        <Link
          to="/"
          className="inline-block text-sm font-medium text-blue-600 transition-colors hover:text-blue-800"
        >
          Go home
        </Link>

        {/* Heading */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">
            Create an account
          </h1>
          <p className="mt-2 text-sm text-gray-500">Sign up to get started</p>
        </div>

        {/* Message */}
        {message && (
          <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
            {message}
          </p>
        )}

        {/* Register form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label
              htmlFor="username"
              className="block text-sm font-semibold text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              value={username}
              onChange={handleNameInput}
              required
              placeholder="Enter your username"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700"
            >
              Email
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

          <div className="space-y-2">
            <label
              htmlFor="confirmpassword"
              className="block text-sm font-semibold text-gray-700"
            >
              Confirm password
            </label>
            <input
              type="password"
              name="confirmpassword"
              id="confirmpassword"
              value={confirmpassword}
              onChange={handleConfirmInput}
              required
              placeholder="Confirm your password"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 active:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>
      </div>
    </>
  );
}
