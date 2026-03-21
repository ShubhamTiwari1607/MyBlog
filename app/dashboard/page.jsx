"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getReadBlogsForUser } from "../../lib/read-history";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [readBlogs, setReadBlogs] = useState([]);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/auth/get-session", {
      method: "GET",
      credentials: "include",
      cache: "no-store",
    });
    const data = await res.json().catch(() => ({}));
    const currentUser = data?.user || null;
    setUser(currentUser);
    if (currentUser?.email) {
      setReadBlogs(getReadBlogsForUser(currentUser.email));
    } else {
      setReadBlogs([]);
    }
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    function onAuthChanged() {
      load();
    }
    window.addEventListener("auth:changed", onAuthChanged);
    return () => window.removeEventListener("auth:changed", onAuthChanged);
  }, []);

  return (
    <main className="min-h-screen px-6 py-12" style={{ fontFamily: "cursive" }}>
      <section className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold text-white mb-3">Dashboard</h1>
        <p className="text-white/80 mb-8">
          Your personal reading dashboard. You can only see blogs read by your signed-in account.
        </p>

        {loading ? (
          <div className="rounded-xl border border-white/10 bg-black/70 p-6 text-white/80">
            Loading dashboard...
          </div>
        ) : !user ? (
          <div className="rounded-xl border border-white/10 bg-black/70 p-6 text-white">
            <p className="mb-4">You are not signed in.</p>
            <Link href="/signin" className="rounded-lg bg-green-500 px-4 py-2 font-semibold hover:bg-green-600">
              Sign in
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="rounded-xl border border-white/10 bg-black/70 p-5 text-white">
              <div className="font-semibold">Signed in as: {user.name || user.email}</div>
              <div className="text-white/70 text-sm">{user.email}</div>
            </div>

            <div className="rounded-xl border border-white/10 bg-black/70 p-5 text-white">
              <h2 className="text-2xl font-bold mb-4">Read blogs</h2>
              {readBlogs.length === 0 ? (
                <div className="text-white/70">
                  You have not read any blogs yet. Visit{" "}
                  <Link href="/blog" className="text-green-400 hover:underline">
                    Blogs
                  </Link>{" "}
                  to start reading.
                </div>
              ) : (
                <div className="space-y-3">
                  {readBlogs.map((blog) => (
                    <article key={blog.id} className="rounded-lg border border-white/10 bg-white/5 p-4">
                      <Link href={`/blog/${blog.id}`} className="text-xl font-semibold text-green-400 hover:underline">
                        {blog.title}
                      </Link>
                      <p className="text-white/80 mt-1">{blog.body}</p>
                      <p className="text-white/50 text-xs mt-2">
                        Last read: {new Date(blog.readAt).toLocaleString()}
                      </p>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

