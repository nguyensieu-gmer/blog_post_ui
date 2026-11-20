import { useContext, useState } from "react";
import { UserContext } from "../context";
import { useNavigate } from "react-router";

export function SignUp() {
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

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

    if (password !== confirmpassword) {
      setMessage("Passwords do not match!");
      return;
    }

    try {
      setMessage("");

      const response = await fetch("http://localhost:3000/api/users/sign-up", {
        method: "POST",
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
    }
  }

  return (
    <>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          id="username"
          value={username}
          onChange={handleNameInput}
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={handleEmailInput}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={handlePasswordInput}
          required
        />

        <label htmlFor="confirmpassword">Confirm password:</label>
        <input
          type="password"
          name="confirmpassword"
          id="confirmpassword"
          value={confirmpassword}
          onChange={handleConfirmInput}
          required
        />

        <button type="submit">Sign Up</button>
      </form>
    </>
  );
}
