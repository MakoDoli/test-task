"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

type Dictionary = {
  email: string;
  password: string;
  login: string;
  dontHaveAccount: string;
  registerHere: string;
};

export function LoginForm({ dictionary }: { dictionary: Dictionary }) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      toast.success("Login successful", {
        description: " Redirecting to dashboard...",
      });

      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      toast.error("Failed to login", {
        description: error instanceof Error ? error.message : "",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">{dictionary.email}</Label>
          <Input id="email" name="email" type="email" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">{dictionary.password}</Label>
          <Input id="password" name="password" type="password" required />
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Loading..." : dictionary.login}
        </Button>
      </form>
      <div className="text-center text-sm">
        {dictionary.dontHaveAccount}{" "}
        <Link href="/register" className="underline">
          {dictionary.registerHere}
        </Link>
      </div>
    </div>
  );
}
