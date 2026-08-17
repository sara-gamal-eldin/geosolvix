"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const getLinkClass = (path: string) => {
    return `text-sm font-semibold transition-colors relative py-1.5 ${
      pathname === path || (path !== "/" && pathname?.startsWith(path))
        ? "text-white border-b-2 border-[#006ff0]"
        : "text-[#aec6ff] hover:text-white"
    }`;
  };

  const getMobileLinkClass = (path: string) => {
    return `text-left text-lg font-semibold py-2 ${
      pathname === path || (path !== "/" && pathname?.startsWith(path))
        ? "text-white"
        : "text-[#aec6ff]"
    }`;
  };

  return (
    <nav
      id="navbar"
      className="bg-[#001a43] text-white sticky top-0 z-50 w-full border-b border-transparent shadow-lg shadow-black/5"
    >
      <div className="flex justify-between items-center w-full px-4 md:px-12 py-4 max-w-[1280px] mx-auto">
        <Link
          href="/"
          id="nav-logo"
          onClick={() => setIsMobileMenuOpen(false)}
          className="flex items-center gap-2.5 cursor-pointer hover:opacity-90 transition-all select-none"
        >
          <Globe className="w-8 h-8 text-[#5b96f5] shrink-0 animate-spin-slow" />
          <span className="text-2xl leading-none font-extrabold tracking-tight font-[family-name:var(--font-hanken)] text-white">
            Geosolvix
          </span>
        </Link>
        <div id="desktop-menu" className="hidden md:flex items-center gap-8">
          <div className="flex gap-7">
            <Link href="/products" id="btn-nav-products" className={getLinkClass("/products")}>
              Products
            </Link>
            <Link href="/services" id="btn-nav-services" className={getLinkClass("/services")}>
              Services
            </Link>
            <Link href="/resources" id="btn-nav-resources" className={getLinkClass("/resources")}>
              Resources
            </Link>
          </div>
          <div className="flex items-center gap-3.5 border-l border-[#004397] pl-8">
            <Link
              href="/scout"
              id="btn-nav-scout"
              className="text-[#aec6ff] hover:text-white transition-colors text-sm font-semibold hover:underline"
            >
              Try Scout Free
            </Link>
            <Link
              href="/demo"
              id="btn-nav-demo"
              className="px-4 py-2 rounded text-sm font-bold bg-[#011432] border border-[#2b5ba3] text-[#aec6ff] hover:bg-[#00275a] hover:text-white transition-all hover:scale-[1.02]"
            >
              Request a demo
            </Link>
          </div>
        </div>
        <button
          id="mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-white p-2 hover:bg-white/10 rounded-md transition-colors"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      {isMobileMenuOpen && (
        <div
          id="mobile-drawer"
          className="md:hidden bg-[#001230] border-t border-[#00275a] px-5 py-6 flex flex-col gap-4 animate-in fade-in slide-in-from-top duration-200"
        >
          <Link href="/products" id="mob-btn-products" onClick={() => setIsMobileMenuOpen(false)} className={getMobileLinkClass("/products")}>
            Products
          </Link>
          <Link href="/services" id="mob-btn-services" onClick={() => setIsMobileMenuOpen(false)} className={getMobileLinkClass("/services")}>
            Services
          </Link>
          <Link href="/resources" id="mob-btn-resources" onClick={() => setIsMobileMenuOpen(false)} className={getMobileLinkClass("/resources")}>
            Resources
          </Link>

          <hr className="border-[#00275a] my-1" />
          <div className="flex flex-col gap-3 pt-2">
            <Link
              href="/scout"
              id="mob-btn-scout"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-[#aec6ff] hover:text-white transition-colors text-lg font-semibold text-left py-1"
            >
              Try Scout Free
            </Link>
            <Link
              href="/demo"
              id="mob-btn-demo"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full text-center py-3 rounded text-lg font-bold bg-[#011432] border border-[#2b5ba3] text-[#aec6ff] hover:bg-[#00275a] hover:text-white transition-all"
            >
              Request a demo
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
