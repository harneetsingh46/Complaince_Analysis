import React, { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Signin = () => {
  const navigate = useNavigate();
  const { signin } = useAuth();

  const [signinData, setSigninData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setSigninData({ ...signinData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await signin(signinData);
      setSigninData({ email: "", password: "" });
      navigate("/dashboard");
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err.message ||
          "Failed to sign in. Check your credentials.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white p-8 rounded-lg shadow-md"
      >
        <h2 className="text-2xl text-black font-bold text-center mb-6">
          Sign In
        </h2>

        {error && (
          <p className="mb-4 text-sm text-red-600 bg-red-50 p-2 rounded">
            {error}
          </p>
        )}

        <label className="block text-black mb-1 text-sm font-medium">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={signinData.email}
          onChange={handleChange}
          required
          placeholder="you@example.com"
          className="w-full text-black mb-4 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label className="block text-black mb-1 text-sm font-medium">
          Password
        </label>
        <input
          type="password"
          name="password"
          value={signinData.password}
          onChange={handleChange}
          required
          placeholder="••••••••"
          className="w-full text-black mb-6 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full text-black bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>

        <p className="mt-4 text-black text-sm text-center">
          Don't have an account?{" "}
          <Link to ="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>  
      </form>
    </div>
  );
};

export default Signin;
