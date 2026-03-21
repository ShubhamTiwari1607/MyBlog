"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export default function ImportantLinksDropdown() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="rounded-lg px-3 py-2 hover:bg-white/10 hover:text-green-400 transition-colors"
      >
        Important Links
      </button>

      {open && (
  <div className="absolute left-0 top-full mt-2 w-44 overflow-hidden rounded-xl border border-white/10 bg-black/95 text-white shadow-lg z-50">

    <a
      href="/ShubhamTiwari.pdf"
      className="block px-4 py-2 hover:bg-white/10"
      target="_blank"
      rel="noopener noreferrer"
    >
      Resume
    </a>

    <a
      href="https://www.linkedin.com/in/shubham-tiwari16"
      className="block px-4 py-2 hover:bg-white/10"
      target="_blank"
      rel="noopener noreferrer"
    >
      LinkedIn
    </a>

  </div>
)}
    </div>
  );
}