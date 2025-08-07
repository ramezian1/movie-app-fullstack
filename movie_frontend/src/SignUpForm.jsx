import { useState } from "react";
import axios from "axios";

export default function SignUpForm({ onSignUp, onToggle }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await axios.post(
        "http://127.0.0.1:8000/auth/signup",
        { username, password }
      );
      onSignUp();
    } catch {
      setError("Sign-up failed. Username may already exist.");
    }
  };

  return (
    <div className="bg-gray-100 rounded-lg p-6 mb-4 shadow max-w-xs mx-auto">
      <form onSubmit={handleSubmit}>
        <input
          className="border border-gray-300 rounded p-2 mb-4 w-full"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          className="border border-gray-300 rounded p-2 mb-4 w-full"
          placeholder="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <input
          className="border border-gray-300 rounded p-2 mb-4 w-full"
          placeholder="Re-enter Password"
          type="password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded w-full transition"
        >
          Sign Up
        </button>
        {error && <div className="mt-4 text-red-600 text-center">{error}</div>}
      </form>
      <div className="mt-2 text-center text-sm">
        Already have an account?{' '}
        <button
          className="underline text-blue-700"
          onClick={onToggle}
        >
          Log In
        </button>
      </div>
    </div>
  );
}