import { useContext, useState } from "react";
import { useNavigate } from "react-router";
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
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/users/log-in", {
        method: "POST",
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
      <button onClick={() => navigate("/")}>go back</button>
      {message !== "" && <p>{message}</p>}
      <form onSubmit={handleLogin}>
        <label htmlFor="email">email:*</label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={handleEmailInput}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={handlePasswordInput}
          required
        />
        <button disabled={loading} type="submit">
          Log in
        </button>
      </form>
    </>
  );
}
