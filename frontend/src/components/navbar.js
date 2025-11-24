"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Dashboard" },
    { href: "/teori", label: "Teori Dasar" },
    { href: "/guide", label: "Guide Book" },
    { href: "/uji", label: "Uji Kenormalan" },
  ];

  return (
    <nav className="bg-gray-60 pt-6 px-4">
      {/* CARD NAVBAR */}
      <div className="mx-auto max-w-6xl bg-white rounded-xl shadow-sm border border-gray-100 px-6 py-3 flex justify-between items-center">

        {/* LOGO */}
      <Link href="/" className="flex items-center gap-3">
        <img 
          src="/logo.png" 
          alt="Normify Logo"
          className="w-12 h-12"
        />

      <span className="text-xl font-bold text-slate-700">
        Normify
      </span>
    </Link>


        {/* DESKTOP NAV */}
        <div className="hidden md:flex gap-10">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-3xl text-slate-700"
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* MOBILE DROPDOWN */}
      {isOpen && (
        <div className="md:hidden bg-white border rounded-xl mt-2 mx-auto max-w-6xl px-6 py-4 shadow">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block py-2 text-gray-700 font-medium"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}