"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "../lib/authStore";
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

const Dashboard = () => {
  const { isLoggedIn, email, logout } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f0f] to-[#1f1f1f] flex items-center justify-center px-4">
      <Card className="w-full max-w-md bg-white dark:bg-[#181818] shadow-2xl rounded-2xl border border-gray-200 dark:border-gray-800 animate-fadeInUp">
        <CardHeader className="text-center space-y-1">
          <CardTitle className="text-3xl font-extrabold tracking-tight text-purple-600 dark:text-purple-400">
            Welcome Back 👋
          </CardTitle>
          <p className="text-gray-500 dark:text-gray-300 text-sm">
            You’re now logged into <span className="font-semibold">Room.me</span>
          </p>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-6 mt-2">
          <div className="text-sm sm:text-base text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-[#2a2a2a] px-4 py-2 rounded-lg font-medium w-full text-center">
            Signed in as: <br /> <span className="text-purple-600 dark:text-purple-400">{email}</span>
          </div>

          <Button
            onClick={() => {
              logout();
              router.push("/");
            }}
            variant="destructive"
            className="w-full flex gap-2 items-center"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
