const STORAGE_PREFIX = "myapp:readBlogs:";

function getStorageKey(email) {
  return `${STORAGE_PREFIX}${email.toLowerCase()}`;
}

export function getReadBlogsForUser(email) {
  if (!email || typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(getStorageKey(email));
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function markBlogAsRead(email, blog) {
  if (!email || !blog || typeof window === "undefined") return [];
  const existing = getReadBlogsForUser(email);
  const filtered = existing.filter((item) => Number(item.id) !== Number(blog.id));
  const next = [
    {
      id: Number(blog.id),
      title: blog.title,
      body: blog.body,
      readAt: new Date().toISOString(),
    },
    ...filtered,
  ];
  window.localStorage.setItem(getStorageKey(email), JSON.stringify(next));
  return next;
}

