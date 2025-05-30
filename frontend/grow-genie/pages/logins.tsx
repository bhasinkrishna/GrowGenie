import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { loginUser } from "@/utils/api"; // Import the login API helper
import { useRouter } from "next/router"; // For routing to the signup page

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null); // To handle error messages
  const [loading, setLoading] = useState<boolean>(false); // To handle loading state
  const router = useRouter(); // To handle page navigation

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = await loginUser(email, password);
      console.log("Login successful:", data);

      // Store the token in localStorage after login
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("userId", data.user._id);


      // Optionally, store user details in localStorage
      localStorage.setItem("userName", data.user.name);  // Assuming the response has user name
      localStorage.setItem("userEmail", data.user.email); // You can store other info if required
      
      // Redirect to profile page or home page after login
       window.location.href = "/"; // Redirect to home page or any other route
    } catch (err) {
      setError("Invalid credentials or server error");
      console.error("Login failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative w-full h-screen flex justify-center items-center bg-cover bg-center"
      style={{ backgroundImage: "url('/images/image1 (2).jpeg')" }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="backdrop-blur-lg bg-white/10 border border-white/30 rounded-xl shadow-lg p-8 w-[350px] text-black"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm mb-1">Email</label>
            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-white/20 border border-white/40 text-white placeholder-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm mb-1">Password</label>
            <Input
              type="password"
              placeholder="Enter your password"
              className="bg-white/20 border border-white/40 text-white placeholder-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
          
          <Button
            className="bg-green-500 hover:bg-green-600 w-full py-3"
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log In"}
          </Button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm">
            Don't have an account?{" "}
            <button
              onClick={() => router.push("/signup")}
              className="text-blue-500 hover:underline"
            >
              Sign Up
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
