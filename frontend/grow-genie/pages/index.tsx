"use client"; 
import { useState, useEffect } from "react";
import { useRouter } from "next/router"; 
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";


// Image paths
const backgroundImages = [
  "images/image.jpeg",
  "images/image1 (1).jpeg",
  "images/image1 (2).jpeg",
  "images/image1 (3).jpeg",
  "images/image1 (4).jpeg",
  "images/image1 (5).jpeg",
  "images/image1 (6).jpeg",
  "images/image1 (7).jpeg",
];

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userPhoto, setUserPhoto] = useState<string | null>(null); // User photo
  const [currentImages, setCurrentImages] = useState(backgroundImages.slice(0, 3));
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    // Check if the user is logged in by verifying token in localStorage
    const token = localStorage.getItem("authToken");
    const photo = localStorage.getItem("userPhoto"); // Get user's photo from localStorage
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }

    if (photo) {
      setUserPhoto(photo); // Set the user's photo if available
    }

    // Image carousel
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const newIndex = (prev + 1) % backgroundImages.length;
        setCurrentImages([ 
          backgroundImages[newIndex],
          backgroundImages[(newIndex + 1) % backgroundImages.length],
          backgroundImages[(newIndex + 2) % backgroundImages.length],
        ]);
        return newIndex;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    // localStorage.removeItem("userPhoto"); // Remove user photo on logout
    setIsLoggedIn(false);
    setUserPhoto(null); // Reset user photo on logout
    router.push("/");
  };

  const handleProfile = () => {
    // Navigate to the profile page
    router.push("/ProfilePage");
  };

  return (
    <div className="min-h-screen flex flex-col text-gray-900">
     <header className="w-full flex items-center justify-between px-6 py-4 border-b shadow-sm bg-white">
      <div className="flex items-center space-x-2">
       <img src="/images/logo.png" alt="Grow Genie Logo" className="w-14 h-14" />
       <h1 className="text-2xl font-bold">Grow Genie</h1>
        </div>

      <div className="flex items-center space-x-6">
       <a href="/about" className="text-green-600 hover:underline font-medium">About</a>
      <a href="/help" className="text-green-600 hover:underline font-medium">Help</a>
        {!isLoggedIn ? (
        <Button
        className="bg-green-500 hover:bg-green-600"
        onClick={() => {
          router.push("/logins");
        }}
        >
        Login / Sign Up
       </Button>
       ) : (
        <>
             <div
            onClick={handleProfile}
            className="cursor-pointer w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300"
        >
          {userPhoto ? (
            <img src={userPhoto} alt="User Photo" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-white font-bold">
              U
            </div>
          )}
        </div>
      </>
    )}
       </div>
      </header>

    
      <div
        className="relative py-12 px-6 flex flex-col items-center"
        style={{ backgroundImage: `url('images/backgound.jpeg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-white text-center z-20">
          <h2 className="text-3xl md:text-4xl font-bold">Get Personalized Gardening Suggestions!</h2>
          <p className="text-lg md:text-xl mt-2">Upload your balcony or garden images to receive tailored advice</p>
        </div>

        {/* Image Carousel with Gap */}
        <div className="relative w-full max-w-6xl overflow-hidden">
          <div className="flex gap-x-6 justify-center">
            <AnimatePresence>
              {currentImages.map((image, index) => (
                <motion.div
                  key={image}
                  className="relative w-full md:w-1/3 h-64 rounded-lg overflow-hidden flex-shrink-0"
                  initial={{ scale: 0.8, opacity: 0, x: -100 }}
                  animate={{ scale: 1, opacity: 1, x: 0 }}
                  exit={{ scale: 0.8, opacity: 0, x: 100 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  <img src={image} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <main className="flex-grow flex flex-col justify-center items-center text-center py-8">
        <p className="text-lg text-gray-700 mb-4">Upload your balcony or garden images to receive tailored layouts and plant suggestions.</p>
        {!isLoggedIn && <p className="text-red-500 font-medium">* Please log in or sign up to continue.</p>} 
        
        <Button 
          className="mt-4 px-6 py-3 bg-green-500 hover:bg-green-600"
          onClick={() => {
            if (isLoggedIn) {
              router.push("/upload");
            } else {
              alert("Please log in to continue.");
            }
          }}
        >
          Get Started
        </Button>
      </main>

      {/* How It Works Section */}
      <div className="py-16 bg-gray-100 text-center">
        <h2 className="text-4xl font-bold">How It Works</h2>
        <div className="flex flex-col md:flex-row justify-center gap-12 mt-8">
          <div className="w-full md:w-1/4">
            <h4 className="font-semibold text-lg">📸 Upload Your Space</h4>
            <p>Provide images of your balcony or gardening area to get personalized suggestions.</p>
          </div>
          <div className="w-full md:w-1/4">
            <h4 className="font-semibold text-lg">🌱 Get Custom Recommendations</h4>
            <p>Receive plant suggestions and optimized layouts based on your available space.</p>
          </div>
          <div className="w-full md:w-1/4">
            <h4 className="font-semibold text-lg">🌿 Start Gardening</h4>
            <p>Use expert tips to maximize productivity and create your perfect green space.</p>
          </div>
        </div>
      </div>

      <footer className="p-6 bg-white border-t text-gray-700 text-center">
        <div className="flex flex-col md:flex-row justify-center space-x-0 md:space-x-4 mb-4">
          <a href="#" className="hover:underline mb-2 md:mb-0">Home</a>
          <a href="#" className="hover:underline mb-2 md:mb-0">About</a>
          <a href="#" className="hover:underline mb-2 md:mb-0">Contact</a>
          <a href="#" className="hover:underline mb-2 md:mb-0">Help</a>
        </div>
        <p>&copy; 2025 Grow Genie. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
