import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { registerUser } from "@/utils/api";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    setError(null);
    setLoading(true);
    try {
      const data = await registerUser(name, email, password);
      console.log("Signup successful:", data);

      // Store user data in localStorage (optional)
      localStorage.setItem("userName", name);
      localStorage.setItem("userEmail", email);

      // Redirect to login page
      window.location.href = "/logins";
    } catch (err) {
      setError("Signup failed. Try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full h-screen flex justify-center items-center bg-cover bg-center"
         style={{ backgroundImage: "url('/images/image1 (2).jpeg')" }}>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="backdrop-blur-lg bg-white/10 border border-white/30 rounded-xl shadow-lg p-8 w-[350px] text-black"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>

        <div className="mb-4">
          <label className="block text-sm mb-1">Full Name</label>
          <Input type="text" placeholder="Enter your full name" className="bg-white/20 border border-white/40 text-white placeholder-black"
            value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-1">Email</label>
          <Input type="email" placeholder="Enter your email" className="bg-white/20 border border-white/40 text-white placeholder-black"
            value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-1">Password</label>
          <Input type="password" placeholder="Enter a password" className="bg-white/20 border border-white/40 text-white placeholder-black"
            value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <Button onClick={handleSignup} className="w-full bg-green-500 hover:bg-green-600" disabled={loading}>
          {loading ? "Signing Up..." : "Sign Up"}
        </Button>

        <p className="text-center text-sm mt-4">
          Already have an account? <a href="/logins" className="text-blue-400 hover:underline">Login</a>
        </p>
      </motion.div>
    </div>
  );
}
