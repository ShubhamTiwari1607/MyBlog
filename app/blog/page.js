import Link from "next/link";

export default function BlogPage() {
  const blogs = [
    {
      id: 1,
      title: "Dhurandar",
      body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
    {
      id: 2,
      title: "Jab tak h jaan",
      body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
  ];

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
