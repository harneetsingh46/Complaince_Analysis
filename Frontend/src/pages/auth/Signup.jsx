import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import apiClient from "../../ApiClient/interceptor";

const Signup = () => {
  const navigate = useNavigate();
  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const register = async (data) => {
    const response = await apiClient.post("/auth/register", data);
    return response.data.data;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await register(signupData);
      setSignupData({ username: "", email: "", password: "" });
      navigate("/signin");
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err.message ||
          "Failed to sign up. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white p-8 rounded-lg shadow-md"
      >
        <h2 className="text-2xl text-black font-bold text-center mb-6">Sign Up</h2>

        {error && (
          <p className="mb-4 text-sm text-red-600 bg-red-50 p-2 rounded">
            {error}
          </p>
        )}

        <label className="block text-black mb-1 text-sm font-medium">Username</label>
        <input
          type="text"
          name="username"
          value={signupData.username}
          onChange={handleChange}
          required
          placeholder="johndoe"
          className="w-full text-black mb-4 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label className="block text-black mb-1 text-sm font-medium">Email</label>
        <input
          type="email"
          name="email"
          value={signupData.email}
          onChange={handleChange}
          required
          placeholder="you@example.com"
          className="w-full text-black mb-4 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label className="block text-black mb-1 text-sm font-medium">Password</label>
        <input
          type="password"
          name="password"
          value={signupData.password}
          onChange={handleChange}
          required
          minLength={6}
          placeholder="••••••••"
          className="w-full text-black mb-6 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full text-black bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>

        <p className="mt-4 text-black text-sm text-center">
          Already have an account?{" "}
          <Link to="/signin" className="text-blue-600 hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;