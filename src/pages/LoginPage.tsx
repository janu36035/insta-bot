import React, { useState, useEffect } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import InstaXbotLogo from "../assets/Instaxbot_Logo.png";

const words = ["Automate", "Grow", "Engage", "Analyze"];

export default function AuthPage(): JSX.Element {
  // default to login mode for this page and prefill demo credentials
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("admin@admin.com");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("admin");
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(
      () => setWordIndex((prev) => (prev + 1) % words.length),
      3000
    );
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setIsLoading(true);

    try {
      if (mode === "login") {
        // Demo login shortcut: admin@admin.com / admin
        if (email === "admin@admin.com" && password === "admin") {
          // set a demo tenant id so Packing page can operate
          try {
            localStorage.setItem('tenentid', 'demo-tenant-id');
          } catch (e) {
            console.warn('Unable to set localStorage tenentid', e);
          }
          setMessage("Demo login successful! Redirecting to packing...");
          setTimeout(() => navigate("/packing"), 700);
          return;
        }
        // Example login request for non-demo users
        const response = await axios.post(
          "https://22eeecbd471d.ngrok-free.app/api/auth/login",
          { email, password }
        );
        if (response.status === 200) {
          setMessage("Login successful! Redirecting...");
          setTimeout(() => navigate("/packing"), 1500);
        }
      } else {
        // Example signup request
        const response = await axios.post(
          "https://22eeecbd471d.ngrok-free.app/api/auth/signup",
          { name, email, password, verificationCode }
        );
        if (response.status === 200) {
          setMessage("Signup successful! Redirecting to login...");
          setTimeout(() => setMode("login"), 1500);
        }
      }
    } catch (err) {
      if (axios.isAxiosError(err))
        setError(err.response?.data?.error || "Something went wrong.");
      else setError("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen font-inter relative overflow-hidden bg-gradient-to-br from-pink-300 via-white to-purple-300">
      {/* Background Blobs */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-300/70 rounded-full mix-blend-multiply filter blur-3xl opacity-90 animate-blob"></div>
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-purple-300/70 rounded-full mix-blend-multiply filter blur-3xl opacity-90 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-pink-200/80 rounded-full mix-blend-multiply filter blur-3xl opacity-90 animate-blob animation-delay-4000"></div>
      </div>

      {/* Left Info Section */}
      <div className="hidden md:flex w-full md:w-1/2 z-10 items-center justify-center md:pl-16 text-gray-900 p-10">
        <div className="max-w-xl mx-auto space-y-8 text-center md:text-left">
          <h2 className="text-5xl font-extrabold leading-tight tracking-tight">
            Instagram <br />
            Automation <br />
            <span className="inline-block text-pink-500 transition-all duration-500">
              {words[wordIndex]}
            </span>
          </h2>
          <p className="text-lg text-gray-800 leading-relaxed">
            Boost your Instagram presence with our powerful automation tools.
            Grow your audience, engage with followers, and analyze your
            performance — all in one glass-morphic interface.
          </p>
        </div>
      </div>

      {/* Right Auth Card */}
      <div className="relative z-10 w-full md:w-[420px] p-8 flex flex-col justify-center items-center md:ml-32">
        <div className="w-full backdrop-blur-xl bg-white/90 border border-pink-300 rounded-3xl shadow-2xl p-8 space-y-6 hover:bg-white transition-all duration-300">
          {/* Header */}
          <div className="text-center">
            <div className="flex justify-center items-center mb-3">
              <img src={InstaXbotLogo} alt="Logo" className="w-9 h-9 mr-2" />
              <h1 className="text-3xl font-extrabold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                InstaX bot
              </h1>
            </div>
            <h2 className="text-lg font-semibold text-gray-900">
              {mode === "login" ? "Welcome Back!" : "Create your Account"}
            </h2>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  required
                  className="w-full p-2 bg-pink-50 border border-pink-400 rounded-lg focus:ring-2 focus:ring-pink-400 focus:bg-pink-100"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full p-2 bg-pink-50 border border-pink-400 rounded-lg focus:ring-2 focus:ring-pink-400 focus:bg-pink-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full p-2 pr-10 bg-pink-50 border border-pink-400 rounded-lg focus:ring-2 focus:ring-pink-400 focus:bg-pink-100"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-pink-500 hover:text-pink-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {mode === "signup" && (
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  <p>Verification Code (This code will be provided by admin)</p>
                </label>
                <input
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  placeholder="Enter verification code"
                  required
                  className="w-full p-2 bg-pink-50 border border-pink-400 rounded-lg focus:ring-2 focus:ring-pink-400 focus:bg-pink-100"
                />
              </div>
            )}

            {error && (
              <p className="text-red-600 text-sm font-semibold p-2 bg-red-100 rounded-lg">
                {error}
              </p>
            )}
            {message && (
              <p className="text-green-600 text-sm font-semibold p-2 bg-green-100 rounded-lg">
                {message}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-2 rounded-lg font-bold bg-gradient-to-r from-pink-500 to-purple-500 text-white transition-all duration-300 shadow-lg ${
                isLoading
                  ? "opacity-70 cursor-not-allowed flex justify-center items-center"
                  : "hover:scale-[1.02] active:scale-[0.98]"
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />{" "}
                  {mode === "login" ? "Logging In..." : "Signing Up..."}
                </>
              ) : mode === "login" ? (
                "Log In"
              ) : (
                "Sign Up"
              )}
            </button>
          </form>

          {/* Footer Links */}
          <div className="text-center text-sm text-gray-800 space-y-3">
            {mode === "signup" ? (
              <div>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setMode("login")}
                  className="text-pink-500 font-medium hover:underline"
                >
                  Log in
                </button>
              </div>
            ) : (
              <div>
                Don’t have an account?{" "}
                <button
                  type="button"
                  onClick={() => setMode("signup")}
                  className="text-pink-500 font-medium hover:underline"
                >
                  Sign up
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Blob Animation */}
      <style>{`
        @keyframes blob {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0, 0) scale(1); }
        }
        .animate-blob { animation: blob 8s infinite ease-in-out; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </div>
  );
}
