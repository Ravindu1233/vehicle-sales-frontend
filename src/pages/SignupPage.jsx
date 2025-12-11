import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const SignupPage = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/");
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          full_name: fullName,
          email,
          password,
        }
      );
      console.log("User signed up:", response.data);
      navigate("/login");
    } catch (err) {
      console.error("Signup error:", err.response?.data || err.message);
      setError(
        err.response?.data?.message ||
          "Sign up failed. Please check your details and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-display min-h-screen w-screen bg-background-dark text-white flex items-center justify-center">
      <div className="w-full max-w-lg px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">Create your account</h1>
          <p className="mt-4 text-lg text-[#90b2cb]">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-primary hover:text-primary/80"
            >
              Sign in
            </Link>
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-card-dark p-8 shadow-2xl shadow-black/25 rounded-xl border border-border-dark space-y-6"
        >
          <div className="space-y-4">
            <div>
              <label
                className="block text-sm font-medium text-[#90b2cb]"
                htmlFor="full-name"
              >
                Full Name
              </label>
              <input
                type="text"
                id="full-name"
                name="full-name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="block w-full rounded-lg border border-[#315168] bg-[#101a22] px-3 py-2 text-white"
                placeholder="John Doe"
                required
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-[#90b2cb]"
                htmlFor="email"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-lg border border-[#315168] bg-[#101a22] px-3 py-2 text-white"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-[#90b2cb]"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-lg border border-[#315168] bg-[#101a22] px-3 py-2 text-white"
                placeholder="••••••••"
                required
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>

          <button
            type="submit"
            className="w-full justify-center rounded-lg bg-primary py-3 px-4 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
          <div className="text-center mt-4">
            <Link
              to="/"
              className="text-sm font-medium text-primary hover:text-primary/80 underline"
            >
              ← Back to Home
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
