import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function Dashboard() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [secret, setSecret] = useState("");
  const [decodedToken, setDecodedToken] = useState(null);

  useEffect(() => {
    if (!token) {
      navigate("/404");
    }
  }, [navigate]);

  const handleDecodeToken = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/decode`,
        { secret },
        { headers: { cookies: `token=${token}` } }
      );
      setDecodedToken(response.data.decoded);
      toast.success("Token decoded successfully!");
    } catch (error) {
      console.error(error);
      setDecodedToken(null);
      toast.error("Failed to decode token");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-3xl p-12 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100">
            Dashboard
          </h1>
        </header>
        <div className="flex justify-center space-x-4 mb-6">
            <button
                onClick={() => navigate("/")}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
            >
                Home
            </button>
            <button
                onClick={() => navigate("/login")}
                className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-700"
            >
                Login
            </button>
            <button
                onClick={() => navigate("/register")}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
            >
                Register
            </button>
        </div>
        <div className="text-gray-800 dark:text-gray-100 text-justify leading-relaxed">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            eget tellus ut dolor consectetur posuere id at leo. Phasellus
            eleifend bibendum lectus, suscipit egestas lectus fermentum at.
            Curabitur id diam et metus sagittis efficitur. Duis a justo id lorem
            rhoncus ornare. Aliquam vel ornare massa, in commodo arcu. Nulla
            eget gravida magna. Sed et mauris sit amet ante iaculis viverra.
            Maecenas elementum sem dolor, congue porta quam vulputate a. Etiam
            eleifend neque non ex tincidunt commodo. Morbi at ante metus.
          </p>
        </div>

        <div className="mt-6 bg-gray-200 dark:bg-gray-700 p-4 rounded">
          <h2 className="text-xl font-bold mb-4">Token Information</h2>
          <div className="mb-4">
            <strong>Stored Token:</strong>
            <pre className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 p-2 rounded mt-2 whitespace-pre-wrap break-words">
              {token || "No token available"}
            </pre>
          </div>
          <div>
            <input
              type="text"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              placeholder="Enter JWT Secret"
              className="px-4 py-2 mb-4 w-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded"
            />
            <button
              type="submit"
              onClick={handleDecodeToken}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              Decode Token
            </button>
          </div>
          {decodedToken && (
            <div className="mt-4">
              <strong>Decoded Token:</strong>
              <pre className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 p-2 rounded mt-2 overflow-x-auto">
                {JSON.stringify(decodedToken, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
