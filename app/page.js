import Link from "next/link";
import RisingStar from "../components/Stunning/RisingStar.jsx";

export default function Page() {
  return (
    <main className="relative min-h-screen overflow-hidden">

      {/* Background Animation */}
      <RisingStar className="-z-10" />
       <section className="relative z-10 py-24 text-center">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-24 px-6 relative z-10" style={{fontFamily:"cursive"}}>
        
        <h1 className="text-5xl font-bold text-white mb-6 " >
          Welcome to My Blog !
        </h1>

        <p className="text-white text-lg max-w-xl mb-8">
          Articles about development, coding tips, system design, and
          useful resources to help you become a better developer.
        </p>

        <Link
          href="/blog"
          className="bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition shadow-md"
        >
          Explore Blogs
        </Link>

      </section>

      {/* Featured Blogs */}
      <section className="py-16 px-8 relative z-10" style={{fontFamily:"cursive"}}>

        <h2 className="text-3xl font-bold text-center mb-12 text-white">
          Featured Blogs
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3">
              Next.js Guide
            </h3>
            <p className="text-gray-600 mb-4">
              Learn the fundamentals of Next.js including routing,
              layouts and server components.
            </p>

            <Link
              href="/blog/1"
              className="text-green-500 font-semibold hover:underline"
            >
              Read More →
            </Link>
          </div>

          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3">
              Tailwind CSS Tips
            </h3>
            <p className="text-gray-600 mb-4">
              Discover useful Tailwind utilities to build modern
              responsive UI quickly.
            </p>

            <Link
              href="/blog/2"
              className="text-green-500 font-semibold hover:underline"
            >
              Read More →
            </Link>
          </div>

          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3">
              DSA for Interviews
            </h3>
            <p className="text-gray-600 mb-4">
              Important data structures and algorithms concepts
              asked in FAANG interviews.
            </p>

            <Link
              href="/blog/3"
              className="text-green-500 font-semibold hover:underline"
            >
              Read More →
            </Link>
          </div>

        </div>

      </section>
      </section>

    </main>
  );
}