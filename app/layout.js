import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import ImportantLinksDropdown from "../components/Stunning/ImportantLinksDropdown";
import AuthStatus from "./auth/_components/AuthStatus";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "My Blog",
  description: "A Next.js Blog Website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-black`}
        style={{ fontFamily: "cursive" }}
      >
        <header className="sticky top-0 z-50 border-b border-white/10 bg-black/90 backdrop-blur">
          <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 text-white sm:px-6 lg:px-8">
            <div className="flex items-center gap-8">
              <Link href="/" className="text-xl font-bold tracking-wide">
                MyBlog
              </Link>

              <div className="hidden items-center gap-6 text-sm font-semibold md:flex">
                <Link className="hover:text-green-400 transition-colors" href="/">
                  Home
                </Link>
                <Link className="hover:text-green-400 transition-colors" href="/blog">
                  Blogs
                </Link>
                <ImportantLinksDropdown />
              </div>
            </div>

            <AuthStatus />
          </nav>
        </header>

        {/* Page Content */}
        <main>{children}</main>
      </body>
    </html>
  );
}
