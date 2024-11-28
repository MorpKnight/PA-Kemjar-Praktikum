import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    // On successful login
    navigate("/dashboard");
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-8 shadow-md rounded-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-4">Login</h2>
        <label className="flex flex-col">
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded mt-1"
            required
          />
        </label>
        <label className="flex flex-col">
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 rounded mt-1"
            required
          />
        </label>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 mt-4">
          Login
        </button>
      </form>
    </div>
  );
}