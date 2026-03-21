"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function EmailPasswordAuthForm({ variant }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isSignUp = variant === "signup";
  const isLogin = variant === "login";

  const { endpoint, title, submitLabel, footerText, footerLink } = useMemo(() => {
    if (isSignUp) {
      return {
        endpoint: "/api/auth/sign-up/email",
        title: "Create your account",
        submitLabel: loading ? "Creating..." : "Sign Up",
        footerText: "Already have an account?",
        footerLink: { label: "Sign in", href: "/signin" },
      };
    }

    if (isLogin) {
      return {
        endpoint: "/api/auth/sign-in/email",
        title: "Welcome back",
        submitLabel: loading ? "Signing in..." : "Login",
        footerText: "New here?",
        footerLink: { label: "Create an account", href: "/signup" },
      };
    }

    return {
      endpoint: "/api/auth/sign-in/email",
      title: "Sign in to continue",
      submitLabel: loading ? "Signing in..." : "Sign In",
      footerText: "Don’t have an account?",
      footerLink: { label: "Sign up", href: "/signup" },
    };
  }, [isLogin, isSignUp, loading]);

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const payload = isSignUp
        ? { name, email, password }
        : { email, password, rememberMe };

      if (isSignUp) {
        // Better Auth expects password non-empty for email/password sign-up.
        payload.rememberMe = rememberMe;
      }

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await res
        .json()
        .catch(() => ({}));

      if (!res.ok) {
        throw new Error(data?.message || "Request failed. Please try again.");
      }

      window.dispatchEvent(new Event("auth:changed"));
      router.push("/blog");
      router.refresh();
    } catch (err) {
      setError(err?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="w-full max-w-md rounded-2xl border border-white/10 bg-black/70 backdrop-blur-md p-8 shadow-2xl"
      style={{ fontFamily: "cursive" }}
    >
      <h1 className="text-3xl font-bold text-white mb-2">{title}</h1>
      <p className="text-white/70 text-sm mb-6">
        {isSignUp
          ? "Register with your email and password."
          : "Use your email and password to sign in."}
      </p>

      <form onSubmit={onSubmit} className="space-y-4">
        {isSignUp && (
          <div>
            <label className="text-white/80 text-sm font-medium" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white outline-none focus:border-green-400"
              placeholder="Your name"
              autoComplete="name"
            />
          </div>
        )}

        <div>
          <label className="text-white/80 text-sm font-medium" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white outline-none focus:border-green-400"
            placeholder="you@example.com"
            autoComplete="email"
          />
        </div>

        <div>
          <label className="text-white/80 text-sm font-medium" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white outline-none focus:border-green-400"
            placeholder="••••••••"
            autoComplete={isSignUp ? "new-password" : "current-password"}
          />
        </div>

        {!isSignUp && (
          <label className="flex items-center gap-2 text-white/80 text-sm select-none">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            Remember me
          </label>
        )}

        {error && (
          <div
            role="alert"
            className="rounded-xl border border-red-400/40 bg-red-400/10 px-4 py-3 text-red-100 text-sm"
          >
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-green-500 text-white font-semibold px-4 py-3 hover:bg-green-600 transition shadow-lg disabled:opacity-60"
        >
          {submitLabel}
        </button>

        <div className="text-center pt-1">
          <span className="text-white/70 text-sm">{footerText} </span>
          <Link
            href={footerLink.href}
            className="text-green-400 hover:underline text-sm"
          >
            {footerLink.label}
          </Link>
        </div>
      </form>
    </div>
  );
}

