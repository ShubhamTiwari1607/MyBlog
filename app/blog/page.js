import Link from "next/link";
import { blogs } from "../../lib/blog-data";

export default function BlogPage() {
  return (
    <div style={{ textAlign: "center", fontFamily: "cursive", fontSize: "20px" }}>
      <h1 style={{ fontSize: "40px" }}>Blogs posts</h1>
      {blogs.map((blog) => (
        <article key={blog.id} style={{ marginTop: "20px", width: "80%", maxWidth: "800px", marginInline: "auto" }}>
          <Link href={`/blog/${blog.id}`}>
            <h2 style={{ color: "green", fontWeight: 700 }}>
              {blog.title}
            </h2>
          </Link>
          <p style={{ fontSize: "18px", lineHeight: "1.6", fontWeight: 400 }}>
            {blog.body}
          </p>
        </article>
      ))}
    </div>
  );
}
