import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [gender, setGender] = useState("male");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle register logic here
    // On successful registration
    navigate("/login");
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-8 shadow-md rounded-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-4">Register</h2>
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
        <label className="flex flex-col">
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded mt-1"
            required
          />
        </label>
        <label className="flex flex-col">
          Birthdate:
          <input
            type="date"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            className="border p-2 rounded mt-1"
            required
          />
        </label>
        <label className="flex flex-col">
          Gender:
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="border p-2 rounded mt-1"
            required
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>
        <label className="flex flex-col">
          Address:
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="border p-2 rounded mt-1"
            required
          />
        </label>
        <label className="flex flex-col">
          Phone:
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border p-2 rounded mt-1"
            required
          />
        </label>
        <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 mt-4">
          Register
        </button>
      </form>
    </div>
  );
}