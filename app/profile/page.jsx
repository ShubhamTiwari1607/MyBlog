"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

async function getSession() {
  const res = await fetch("/api/auth/get-session", {
    method: "GET",
    cache: "no-store",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });
  const data = await res.json().catch(() => ({}));
  return res.ok ? data : null;
}

export default function ProfilePage() {
  const pathname = usePathname();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  async function loadSession() {
    setLoading(true);
    const s = await getSession();
    setSession(s);
    setLoading(false);
  }

  useEffect(() => {
    loadSession();
  }, [pathname]);

  useEffect(() => {
    function onAuthChanged() {
      loadSession();
    }
    window.addEventListener("auth:changed", onAuthChanged);
    return () => window.removeEventListener("auth:changed", onAuthChanged);
  }, []);

  const user = session?.user;

  return (
    <main
      className="min-h-screen px-6 py-14 flex items-center justify-center"
      style={{ fontFamily: "cursive" }}
    >
      <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-black/70 backdrop-blur-md p-8 shadow-2xl text-white">
        <h1 className="text-3xl font-bold mb-2">Profile</h1>
        <p className="text-white/70 text-sm mb-6">
          Session information from Better Auth.
        </p>

        {loading ? (
          <div className="text-white/70">Loading...</div>
        ) : user ? (
          <div className="space-y-4">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="text-white font-semibold">
                {user.name || user.email}
              </div>
              <div className="text-white/70 text-sm">{user.email}</div>
              <div className="text-white/70 text-sm">
                emailVerified: {String(user.emailVerified)}
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="text-white/80 text-sm font-semibold mb-2">
                Raw user object
              </div>
              <pre className="text-white/70 text-xs whitespace-pre-wrap break-words">
                {JSON.stringify(user, null, 2)}
              </pre>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-white/80">
              You’re not signed in.
            </div>
            <div className="flex gap-4">
              <Link
                className="rounded-xl bg-green-500 px-4 py-3 font-semibold hover:bg-green-600 transition"
                href="/signin"
              >
                Sign In
              </Link>
              <Link
                className="rounded-xl border border-white/20 px-4 py-3 font-semibold hover:border-white/40 transition"
                href="/signup"
              >
                Sign Up
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

