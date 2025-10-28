import React, { useState, useEffect } from "react";
import { Eye, EyeOff, Loader2, CheckCircle2 } from "lucide-react";
import Button from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import InstaXbotLogo from "../assets/Instaxbot_Logo.png";

const words = ["Automate", "Grow", "Engage", "Analyze"];

export default function SignupPage(): JSX.Element {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [wordIndex, setWordIndex] = useState<number>(0);

  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(
      () => setWordIndex((prev) => (prev + 1) % words.length),
      3000
    );
    return () => clearInterval(interval);
  }, []);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post(
        "https://22eeecbd471d.ngrok-free.app/api/auth/signup",
        { name, email, password, verificationCode }
      );

      if (response.status === 201) {
        setSuccess("Signup successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || "Failed to create account");
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleTermsClick = () => navigate("/frontterms");
  const handlePrivacyClick = () => navigate("/frontpolicy");

  return (
    <div className="flex flex-col md:flex-row min-h-screen font-inter relative overflow-hidden bg-gradient-to-br from-pink-300 via-white to-purple-300">
      {/* Glowing blobs background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-300/70 rounded-full mix-blend-multiply filter blur-3xl opacity-90 animate-blob"></div>
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-purple-300/70 rounded-full mix-blend-multiply filter blur-3xl opacity-90 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-pink-200/80 rounded-full mix-blend-multiply filter blur-3xl opacity-90 animate-blob animation-delay-4000"></div>
      </div>

      {/* Left text section */}
      <div className="hidden md:flex w-full md:w-1/2 z-10 items-center justify-center md:pl-16 text-gray-900 p-10">
        <div className="max-w-xl mx-auto space-y-8 text-center md:text-left">
          <h2 className="text-5xl font-extrabold leading-tight tracking-tight">
            Start Your <br />
            Instagram Journey <br />
            <span className="inline-block text-pink-500 transition-all duration-500">
              {words[wordIndex]}
            </span>
          </h2>
          <p className="text-lg text-gray-800 leading-relaxed">
            Sign up now to access our smart automation features. Manage,
            analyze, and grow your audience effortlessly.
          </p>
          <div className="flex flex-col md:flex-row items-center gap-4 justify-center md:justify-start">
            <div className="flex -space-x-4">
              {["🚀", "🎯", "📊"].map((icon, i) => (
                <div
                  key={i}
                  className="w-12 h-12 rounded-full bg-pink-200 border-2 border-pink-400 flex items-center justify-center text-2xl shadow-md"
                >
                  {icon}
                </div>
              ))}
            </div>
            <span className="text-md font-medium text-gray-800">
              Begin your success story today!
            </span>
          </div>
        </div>
      </div>

      {/* Signup Card */}
      <div className="relative z-10 w-full md:w-[420px] p-8 flex flex-col justify-center items-center md:ml-32">
        <div className="w-full backdrop-blur-xl bg-white/90 border border-pink-300 rounded-3xl shadow-2xl p-8 space-y-6 hover:bg-white transition-all duration-300">
          <div className="text-center">
            <div className="flex justify-center items-center mb-3">
              <img
                src={InstaXbotLogo}
                alt="InstaXbot Logo"
                className="w-9 h-9 mr-2"
              />
              <h1 className="text-3xl font-extrabold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                Create Account
              </h1>
            </div>
            <h2 className="text-lg font-semibold text-gray-900">
              Join InstaX Bot to{" "}
              <span className="text-pink-500">"{words[wordIndex]}"</span> your
              social game
            </h2>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            {/* Name */}
            <div>
              <Label htmlFor="name" className="block text-sm font-medium text-gray-900 mb-1">
                Name
              </Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full p-2 bg-pink-50 border border-pink-400 rounded-lg text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:bg-pink-100"
              />
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-1">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full p-2 bg-pink-50 border border-pink-400 rounded-lg text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:bg-pink-100"
              />
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="password" className="block text-sm font-medium text-gray-900 mb-1">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full p-2 pr-10 bg-pink-50 border border-pink-400 rounded-lg text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:bg-pink-100"
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

            {/* Verification Code */}
            <div>
              <Label htmlFor="code" className="block text-sm font-medium text-gray-900 mb-1">
                Verification Code
              </Label>
              <Input
                id="code"
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="Enter verification code"
                className="w-full p-2 bg-pink-50 border border-pink-400 rounded-lg text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:bg-pink-100"
              />
            </div>

            {/* Feedback */}
            {error && (
              <p className="text-red-600 text-sm font-semibold p-2 bg-red-100 rounded-lg">
                {error}
              </p>
            )}
            {success && (
              <p className="text-green-600 text-sm font-semibold p-2 bg-green-100 rounded-lg flex items-center gap-2">
                <CheckCircle2 size={18} /> {success}
              </p>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className={`w-full py-2 rounded-lg font-bold bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white transition-all duration-300 shadow-lg ${
                isLoading
                  ? "opacity-70 cursor-not-allowed flex justify-center items-center"
                  : "hover:scale-[1.02] active:scale-[0.98]"
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Creating...
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>

          {/* Footer */}
          <div className="text-center text-sm text-gray-800 space-y-3">
            <div>
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-pink-500 font-medium hover:underline"
              >
                Log in
              </button>
            </div>
            <div className="flex justify-center space-x-4 text-xs text-gray-500">
              <button
                onClick={handleTermsClick}
                className="hover:text-pink-500 hover:underline"
              >
                Terms & Conditions
              </button>
              <span>•</span>
              <button
                onClick={handlePrivacyClick}
                className="hover:text-pink-500 hover:underline"
              >
                Privacy Policy
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Animation keyframes */}
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
