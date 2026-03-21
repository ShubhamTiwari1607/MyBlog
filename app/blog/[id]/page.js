
"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { getBlogById } from "../../../lib/blog-data";
import { markBlogAsRead } from "../../../lib/read-history";

export default function BlogDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id;
  const blog = useMemo(() => getBlogById(id), [id]);
  const [loadingSession, setLoadingSession] = useState(true);
  const [sessionEmail, setSessionEmail] = useState("");

  useEffect(() => {
    async function run() {
      const res = await fetch("/api/auth/get-session", {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      });
      const data = await res.json().catch(() => ({}));
      const email = data?.user?.email || "";
      setSessionEmail(email);
      setLoadingSession(false);
      if (email && blog) {
        markBlogAsRead(email, blog);
        window.dispatchEvent(new Event("auth:changed"));
      }
    }
    run();
  }, [blog]);

  if (!blog) {
    return (
      <main className="min-h-screen grid place-items-center px-6" style={{ fontFamily: "cursive" }}>
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Blog not found</h1>
          <Link href="/blog" className="text-green-600 font-semibold hover:underline">
            Back to blogs
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-6 py-12" style={{ fontFamily: "cursive" }}>
      <article className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-white/95 p-8 shadow-xl">
        <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
        <p className="text-gray-700 leading-8 mb-6">{blog.content}</p>

        {loadingSession ? (
          <p className="text-gray-500 text-sm">Checking session...</p>
        ) : sessionEmail ? (
          <p className="text-green-700 text-sm">
            Saved to your dashboard read history.
          </p>
        ) : (
          <div className="rounded-lg border border-amber-300 bg-amber-50 p-3 text-amber-900 text-sm">
            Sign in to save this blog in your personal dashboard.
            <button
              type="button"
              onClick={() => router.push("/signin")}
              className="ml-2 font-semibold underline"
            >
              Sign in
            </button>
          </div>
        )}

        <div className="mt-8">
          <Link href="/blog" className="text-green-600 font-semibold hover:underline">
            Back to blogs
          </Link>
        </div>
      </article>
    </main>
  );
}