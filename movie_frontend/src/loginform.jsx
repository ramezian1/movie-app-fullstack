import { useState } from "react";
import axios from "axios";

export default function LoginForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("http://127.0.0.1:8000/auth/login", 
        new URLSearchParams({ username, password }),
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );
      onLogin(res.data.access_token); // Pass the token up!
  } catch {
        setError("Login failed. Check your username/password.");
        }
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: "2em 0" }}>
      <div>
        <input
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
      </div>
      <div>
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Log In</button>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </form>
  );
}