import React, { useState } from "react";
import { Mail, Lock, User, ArrowRight, Trophy } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login({ handelClick }) {
  const { user, login, signup } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const toggleForm = () => setIsLogin(!isLogin);
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handelChange = (e) => {
    if (e.target.name == "username") {
      setUserName(e.target.value);
    } else if (e.target.name == "email") {
      setEmail(e.target.value);
    } else if (e.target.name == "password") {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    try {
      if (isLogin) {
        await login(email, password);
        navigate("/dashboard");
      } else {
        await signup(username, email, password);
        setIsLogin(true);
      }
    } catch (err) {
      setError("Invalid credentials");
    }
  };
  return (
    <div className="min-h-screen d from-[#426f51]/5 via-white to-[#426f51]/10 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
          {/* Left Side - Image */}
          <div className="md:w-1/2 relative hidden md:block">
            <div className="absolute inset-0 bg-[#426f51]/40 backdrop-blur-[2px] z-10" />
            <img
              src="https://images.unsplash.com/photo-1531415074968-036ba1b575da"
              alt="Cricket Stadium"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <div className="text-center p-8">
                <Trophy className="h-16 w-16 text-white mb-4 mx-auto" />
                <h2 className="text-2xl font-bold text-white mb-4">
                  CricScorer
                </h2>
                <p className="text-white/90 max-w-md mx-auto">
                  Your ultimate cricket scoring companion. Track matches,
                  analyze performance, and elevate your game.
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="md:w-1/2 p-8 lg:p-12">
            <div className="max-w-md mx-auto">
              <div className="flex items-center gap-3 mb-2 justify-center">
                <Trophy className="h-8 w-8 text-[#426f51]" />
                <h2 className="text-xl font-bold text-[#426f51]">
                  {isLogin ? "Welcome Back" : "Join CricScorer"}
                </h2>
              </div>
              <p className="text-gray-600 mb-5 text-center">
                {isLogin
                  ? "Sign in to continue scoring matches"
                  : "Create an account to start scoring matches"}
              </p>

              <form className="space-y-4" action={handleSubmit}>
                {!isLogin && (
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#426f51] h-5 w-5 transition-colors" />
                    <input
                      type="text"
                      placeholder="Full Name"
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-100 rounded-xl focus:outline-none focus:border-[#426f51] transition-colors bg-gray-50 focus:bg-white"
                      name="username"
                      onChange={handelChange}
                      autoComplete=""
                    />
                  </div>
                )}

                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#426f51] h-5 w-5 transition-colors" />
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-100 rounded-xl focus:outline-none focus:border-[#426f51] transition-colors bg-gray-50 focus:bg-white"
                    name="email"
                    autoComplete=""
                    onChange={handelChange}
                  />
                </div>

                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#426f51] h-5 w-5 transition-colors" />
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-100 rounded-xl focus:outline-none focus:border-[#426f51] transition-colors bg-gray-50 focus:bg-white"
                    name="password"
                    autoComplete="current-password"
                    onChange={handelChange}
                  />
                </div>

                {isLogin && (
                  <div className="flex items-center justify-center text-sm">
                    <a
                      href="#"
                      className="text-[#426f51] hover:text-[#426f51]/80 font-medium transition-colors"
                    >
                      Forgot Password?
                    </a>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-[#426f51] text-white py-3 rounded-xl hover:bg-[#426f51]/90 transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 group font-medium text-lg"
                >
                  {isLogin ? "Sign In to Score" : "Create Account"}
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>

              <div className="mt-4 text-center mb-2">
                <p className="text-gray-600">
                  {isLogin ? "New to CricScorer?" : "Already have an account?"}
                  <button
                    onClick={toggleForm}
                    className="ml-2 text-[#426f51] hover:text-[#426f51]/80 font-medium transition-colors"
                  >
                    {isLogin ? "Sign Up" : "Sign In"}
                  </button>
                </p>
              </div>
              <hr />
              <br />
              {isLogin && (
                <button
                  type="submit"
                  className="w-full  py-3 rounded-xl  transition-all transform hover:scale-[1.02] active:scale-[0.98] flex text-[#426f51] items-center justify-center gap-2 group font-medium text-lg hover:border-[#426f51] hover:border-2 border-2"
                  onClick={handelClick}
                >
                  Login with Google
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
