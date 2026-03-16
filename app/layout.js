import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import ImportantLinksDropdown from "../components/Stunning/ImportantLinksDropdown";

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
        {/* Navbar */}
        <nav className="flex justify-center gap-8 p-5 bg-black text-white font-semibold text-lg shadow-md">
          <Link className="hover:text-green-400 transition" href="/">
            Home
          </Link>
          <Link className="hover:text-green-400 transition" href="/blog">
            Blogs
          </Link>
         <ImportantLinksDropdown />
        </nav>

        {/* Page Content */}
        <main>{children}</main>
      </body>
    </html>
  );
}
