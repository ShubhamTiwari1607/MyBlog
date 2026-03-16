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
        className="hover:text-green-400 transition"
      >
        Important Links
      </button>

      {open && (
  <div className="absolute left-0 top-full mt-2 w-40 bg-black text-white rounded-md shadow-lg z-50">

    <a
      href="/resume.pdf"
      className="block px-4 py-2 hover:bg-gray-800"
      target="_blank"
      rel="noopener noreferrer"
    >
      Resume
    </a>

    <a
      href="https://www.linkedin.com/in/shubham-tiwari16"
      className="block px-4 py-2 hover:bg-gray-800"
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