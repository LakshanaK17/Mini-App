"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "./lib/authStore";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FcGoogle } from "react-icons/fc";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { FaDoorOpen } from "react-icons/fa";
import { Carousel } from "@/components/ui/carousel";

const images = ["/1.jpg", "/2.jpg", "/3.jpg", "/4.jpg", "/5.jpg"];

export default function Home() {
  const { isLoggedIn, login } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{
    email?: string;
    password?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/dashboard");
    }
  }, [isLoggedIn, router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setFieldErrors({});

    const newErrors: typeof fieldErrors = {};

    if (!email) newErrors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Invalid email format.";

    if (!password) newErrors.password = "Password is required.";

    if (Object.keys(newErrors).length > 0) {
      setFieldErrors(newErrors);
      return;
    }

    if (email === "test@visionexdigital.com.au" && password === "password123") {
      setIsLoading(true);
      login(email, password);
      setIsLoading(false);
    } else {
      setError("Invalid email or password.");
    }
  };

  if (isLoggedIn) return null;

  const handleImageChange = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-[#0f0f0f] text-white">
      <div className="w-full md:w-1/2 flex flex-col justify-center px-6 sm:px-10 py-10">
        <div className="mb-10">
          <div className="flex items-center gap-2 text-xl font-bold mb-6 sm:mb-8">
            <div className="bg-purple-600 p-2 rounded-md">
              <FaDoorOpen className="text-white text-2xl" />
            </div>
            <span>ROOM.ME</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">
            Welcome back to Room.me!
          </h1>
          <p className="text-gray-400 mb-6 text-sm sm:text-base">
            Room.me is an innovative video conference product that
            revolutionizes virtual meetings.
          </p>
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Email address</label>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#181818] text-white border border-[#2a2a2a] focus:ring-purple-500 w-full"
            />
            {fieldErrors.email && (
              <p className="text-red-500 text-sm mt-1">{fieldErrors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm mb-1">Password</label>
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-[#181818] text-white border border-[#2a2a2a] focus:ring-purple-500 w-full"
            />
            {fieldErrors.password && (
              <p className="text-red-500 text-sm mt-1">
                {fieldErrors.password}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-purple-600 hover:bg-purple-700 font-semibold"
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>

          <Button
            type="button"
            variant="outline"
            className="w-full flex items-center justify-center gap-2 bg-white text-black font-semibold hover:bg-gray-100"
          >
            <FcGoogle className="text-xl" />
            Sign in with Google
          </Button>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm text-gray-400 gap-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember" className="text-gray-400">
                Remember for 30 days
              </Label>
            </div>
            <a href="#" className="text-purple-400 hover:underline">
              Forgot password
            </a>
          </div>

          <div className="text-center text-sm text-gray-400">
            Don’t have an account?{" "}
            <a href="#" className="text-white underline font-medium">
              Sign up
            </a>
          </div>
        </form>
      </div>

      <div className="hidden md:flex w-full md:w-1/2 items-center justify-center p-6 relative">
        <div className="relative w-full md:w-[70vh] h-[40vh] md:h-[90vh] rounded-3xl overflow-hidden shadow-xl">
          <div className="relative w-full h-full">
            <Image
              src={images[currentImageIndex]}
              alt={`Image ${currentImageIndex + 1}`}
              layout="fill"
              objectFit="cover"
              className="rounded-3xl transition-all duration-500"
            />
          </div>
        </div>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex justify-center space-x-2">
          {images.map((_, index) => (
            <div
              key={index}
              onClick={() => handleImageChange(index)}
              className={`w-2.5 h-2.5 rounded-full cursor-pointer ${
                currentImageIndex === index ? "bg-purple-600" : "bg-gray-500"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
