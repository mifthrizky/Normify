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
    <nav className="bg-black/40 backdrop-blur-md pt-6 px-4 border-b border-white/5 sticky top-0 z-50">
      {/* CARD NAVBAR */}
      <div className="mx-auto max-w-7xl bg-white/5 rounded-xl border border-white/10 hover:border-white/20 transition-all px-6 py-4 flex justify-between items-center shadow-xl shadow-cyan-500/5">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-lg blur group-hover:blur-md transition-all opacity-75 group-hover:opacity-100" />
            <img src="/logo.png" alt="Normify Logo" className="relative w-12 h-12 rounded-lg" />
          </div>
          <span className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 group-hover:from-cyan-300 group-hover:to-purple-400 transition-all">
            Normify
          </span>
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative text-m font-medium text-white/100 hover:text-cyan-400 transition-colors group"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden md:block">
          <Link
            href="/uji"
            className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-bold text-sm hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
          >
            Mulai Uji ⚡
          </Link>
        </div>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-2xl text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* MOBILE DROPDOWN */}
      {isOpen && (
        <div className="md:hidden bg-white/5 border border-white/10 rounded-xl mt-3 mx-auto max-w-7xl px-6 py-4 backdrop-blur-md shadow-xl">
          <div className="space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block py-2 px-3 text-white/80 hover:text-cyan-400 hover:bg-white/5 rounded-lg transition-all font-medium"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/uji"
              className="block py-2 px-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-bold text-white text-center hover:shadow-lg hover:shadow-blue-500/50 transition-all mt-3"
              onClick={() => setIsOpen(false)}
            >
              Mulai Uji ⚡
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
