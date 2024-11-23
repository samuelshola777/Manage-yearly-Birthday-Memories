"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FiMail, FiLock, FiArrowRight } from "react-icons/fi";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [bgColor, setBgColor] = useState("from-emerald-100 to-sky-100");
  const [formColor, setFormColor] = useState("bg-white");
  const router = useRouter();

  const colors = [
    "from-emerald-100 to-sky-100",
    "from-amber-50 to-rose-100",
    "from-violet-100 to-indigo-100", 
    "from-teal-100 to-cyan-100",
    "from-blue-100 to-purple-100"
  ];

  const formColors = [
    "bg-white",
    "bg-slate-50",
    "bg-zinc-50",
    "bg-stone-50",
    "bg-neutral-50"
  ];

  const emojiColors = [
    "#374151", // gray-700
    "#1F2937", // gray-800
    "#065F46", // emerald-800
    "#0F766E", // teal-700
    "#1E40AF", // blue-800
    "#6B21A8", // purple-800
    "#9D174D", // pink-800
    "#7C2D12", // orange-900
  ];

  const emojis = ["😊", "😄", "🥳", "💃", "🕺", "😎", "🤗", "🌟", "⭐", "✨", "🎉", "🎊"];

  useEffect(() => {
    const interval = setInterval(() => {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      const randomFormColor = formColors[Math.floor(Math.random() * formColors.length)];
      setBgColor(randomColor);
      setFormColor(randomFormColor);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid credentials");
      } else {
        router.push("/app-user");
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputClick = () => {
    setEmail("");
    setPassword("");
  };

  const fallingVariants = {
    initial: {
      y: -20,
      opacity: 0,
      scale: 0.5,
      rotate: 0
    },
    animate: {
      y: 800,
      opacity: [0, 1, 1, 0.8, 0],
      scale: [0.5, 1.5, 1.5, 1, 0.5],
      rotate: [0, 45, -45, 0],
      transition: {
        duration: 6,
        ease: "easeInOut",
        repeat: Infinity,
      }
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br ${bgColor} p-4 relative overflow-hidden`}>
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          variants={fallingVariants}
          initial="initial"
          animate="animate"
          style={{
            position: "absolute",
            left: `${Math.random() * 100}%`,
            top: `-${Math.random() * 20}%`,
            fontSize: `${Math.random() * (3 - 2) + 2}rem`,
            color: emojiColors[Math.floor(Math.random() * emojiColors.length)],
            textShadow: "0 0 10px rgba(255,255,255,0.5)",
          }}
          transition={{
            delay: i * 0.2,
            duration: Math.random() * (8 - 4) + 4,
          }}
        >
          {emojis[Math.floor(Math.random() * emojis.length)]}
        </motion.div>
      ))}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <motion.div
          className={`${formColor} p-8 rounded-lg shadow-lg backdrop-blur-lg bg-opacity-95`}
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-2xl font-semibold text-center mb-8 text-gray-800"
          >
            Welcome Back
          </motion.h2>

          {error && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-4 p-3 rounded bg-red-50 text-red-600 text-sm"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onClick={handleInputClick}
                  className="w-full pl-10 pr-4 py-2.5 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition-all duration-200 outline-none"
                  placeholder="Email address"
                  required
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onClick={handleInputClick}
                  className="w-full pl-10 pr-4 py-2.5 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition-all duration-200 outline-none"
                  placeholder="Password"
                  required
                />
              </div>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-md font-medium transition-colors duration-200"
            >
              <span className="flex items-center justify-center gap-2">
                {isLoading ? "Signing in..." : "Sign In"}
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.button>
          </form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 text-center text-sm text-gray-600"
          >
            <p>Test Account:</p>
            <p>Email: test@gmail.com</p>
            <p>Password: password</p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
