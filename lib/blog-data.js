export const blogs = [
  {
    id: 1,
    title: "Next.js Guide",
    body: "Learn the fundamentals of Next.js including routing, layouts and server components. This article gives a practical overview for building production-ready apps.",
    content:
      "Next.js gives you routing, layouts, data fetching strategies, API routes, and deployment ergonomics in one framework. Start by understanding App Router conventions, then build feature pages with clear loading/error boundaries.",
  },
  {
    id: 2,
    title: "Tailwind CSS Tips",
    body: "Discover useful Tailwind utilities to build modern responsive UI quickly. Focus on consistency, spacing scale, and composable utility-first patterns.",
    content:
      "Tailwind works best when you define predictable spacing, typography, and color choices. Use utility composition to create reusable patterns and avoid one-off style decisions.",
  },
  {
    id: 3,
    title: "DSA for Interviews",
    body: "Important data structures and algorithms concepts asked in interviews. Prioritize patterns over memorization and practice with timed problem solving.",
    content:
      "A practical interview prep strategy is to master arrays, strings, hash maps, trees, and graph traversals first. Then move to dynamic programming and system-level trade-offs.",
  },
];

export function getBlogById(id) {
  return blogs.find((blog) => blog.id === Number(id));
}

