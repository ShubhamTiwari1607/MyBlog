"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

async function fetchJson(url, options) {
  const res = await fetch(url, {
    ...options,
    cache: "no-store",
    credentials: "include",
    headers: {
      ...(options?.headers || {}),
      "Content-Type": "application/json",
    },
  });
  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, data };
}

export default function AuthStatus() {
  const pathname = usePathname();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [signingOut, setSigningOut] = useState(false);

  async function loadSession() {
    setLoading(true);
    const { ok, data } = await fetchJson("/api/auth/get-session", { method: "GET" });
    setSession(ok ? data : null);
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

  async function onSignOut() {
    setSigningOut(true);
    await fetchJson("/api/auth/sign-out", { method: "POST", body: JSON.stringify({}) });
    window.dispatchEvent(new Event("auth:changed"));
    await loadSession();
    setSigningOut(false);
  }

  const user = session?.user;
  const displayName = user?.name || user?.email || "Account";

  return (
    <div className="flex items-center gap-3 text-sm font-semibold">
      {loading ? (
        <span className="text-white/70">Loading...</span>
      ) : user ? (
        <>
          <div className="hidden flex-col leading-tight sm:flex">
            <span className="text-white font-semibold">Hi, {displayName}</span>
            <span className="text-white/70 text-xs">Signed in</span>
          </div>
          <Link
            className="rounded-lg px-3 py-2 hover:bg-white/10 hover:text-green-400 transition-colors"
            href="/profile"
          >
            Profile
          </Link>
          <button
            type="button"
            disabled={signingOut}
            onClick={onSignOut}
            className="rounded-lg px-3 py-2 hover:bg-white/10 hover:text-green-400 transition-colors disabled:opacity-60"
          >
            {signingOut ? "Signing out..." : "Sign out"}
          </button>
        </>
      ) : (
        <>
          <Link
            className="hidden rounded-lg px-3 py-2 hover:bg-white/10 hover:text-green-400 transition-colors sm:inline-flex"
            href="/login"
          >
            Login
          </Link>
          <Link className="rounded-lg px-3 py-2 hover:bg-white/10 hover:text-green-400 transition-colors" href="/signin">
            Sign In
          </Link>
          <Link className="rounded-lg bg-green-500 px-4 py-2 text-white hover:bg-green-600 transition-colors" href="/signup">
            Sign Up
          </Link>
        </>
      )}
    </div>
  );
}

