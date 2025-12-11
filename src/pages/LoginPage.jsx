import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const LoginPage = () => {
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
        "http://localhost:5000/api/auth/login",
        { email, password }
      );

      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      setError(
        err.response?.data?.message ||
          "Invalid credentials. Please check your email and password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-display min-h-screen w-screen bg-background-dark text-white flex items-center justify-center">
      <div className="w-full max-w-md px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center">
          <div className="flex justify-center items-center gap-3 mx-auto mb-6">
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-12"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCdXW7CcM6qIV551q1CIf-IjHw8wpnBFhWoVHyNur1P2p0EVr69r-9dk1sQruE96o-RzUnriUwgjCKMx2yPiJwqMR3rEy_OxBPfgCock4xhwnqIPhzsK8PjS0pIOa26ZkhnmCSPmmiP-w-YqJY7KR5VqJ0-aOzJxgQejIeOempBF53SpQpfRDZf-joZRFa9yRpXpvwUZniDxmULD590YJLLn-3oKK5fIu21GnoX_HePrL5ScSmZ-gNIPLWeOHxxZdOHy-sk0SfDURY")',
              }}
            ></div>
            <h1 className="text-white text-3xl font-bold leading-normal">
              Vehicle Sales Aggregator
            </h1>
          </div>
          <h2 className="mt-2 text-center text-3xl font-bold tracking-tight text-white">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-text-muted-dark">
            Or{" "}
            <Link
              className="font-medium text-primary hover:text-primary/90"
              to="/signup"
            >
              create an account
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
                className="block text-sm font-medium text-text-muted-dark"
                htmlFor="email"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-lg border border-border-dark bg-background-dark px-3 py-2.5 text-white"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  className="block text-sm font-medium text-text-muted-dark"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    className="font-medium text-primary hover:text-primary/90"
                    href="#"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>
              <div className="mt-1">
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-lg border border-border-dark bg-background-dark px-3 py-2.5 text-white"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>

          <button
            className="flex w-full justify-center rounded-lg border border-transparent bg-primary py-3 px-4 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 disabled:opacity-60"
            type="submit"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
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

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border-dark"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-background-dark px-2 text-text-muted-dark">
              Or continue with
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <a
            className="inline-flex w-full items-center justify-center gap-3 rounded-lg border border-border-dark bg-background-dark py-2.5 px-4 text-sm font-medium text-white hover:bg-border-dark/50"
            href="#"
          >
            {/* Google icon */}
            <svg
              className="h-5 w-5"
              fill="currentColor"
              role="img"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Google</title>
              <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.02 1.02-2.62 1.9-4.63 1.9-5.62 0-10.17-4.4-10.17-9.8s4.55-9.8 10.17-9.8c3.18 0 5.22 1.34 6.61 2.62l2.54-2.38C19.83 1.18 16.63 0 12.48 0 5.88 0 .04 5.36.04 12s5.84 12 12.44 12c3.54 0 6.4-1.2 8.44-3.34 2.14-2.23 2.82-5.46 2.82-8.78 0-.68-.06-1.3-.18-1.92H12.48z"></path>
            </svg>
            <span>Google</span>
          </a>
          <a
            className="inline-flex w-full items-center justify-center gap-3 rounded-lg border border-border-dark bg-background-dark py-2.5 px-4 text-sm font-medium text-white hover:bg-border-dark/50"
            href="#"
          >
            {/* Facebook icon */}
            <svg
              className="h-5 w-5"
              fill="currentColor"
              role="img"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Facebook</title>
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path>
            </svg>
            <span>Facebook</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
