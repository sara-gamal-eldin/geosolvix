"use client";

import Link from "next/link";
import { Globe, Link as LinkIcon, Mail } from "lucide-react";
import { ScrollAnimation } from "@/components/scroll-animation";

export default function Footer() {
  return (
    <footer id="footer" className="bg-[#faf9ff] border-t border-[#EAECF0]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 px-4 md:px-12 py-20 max-w-[1280px] mx-auto">
        <ScrollAnimation delay={0.1} className="mb-8 md:mb-0">
          <div className="flex items-center gap-2.5 mb-4">
            <Globe className="w-8 h-8 text-[#006ff0] shrink-0 animate-spin-slow" />
            <span className="text-2xl font-extrabold text-[#0057c0] font-[family-name:var(--font-hanken)]">
              Geosolvix
            </span>
          </div>
          <p className="text-sm leading-relaxed text-[#475467] mb-6 max-w-md">
            Unlock the power of in-database spatial analysis. Run AI operations where your coordinates and geographic markers stay secure.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-[#475467] hover:text-[#0057c0] transition-colors">
              <LinkIcon className="w-4 h-4" />
            </Link>
            <Link href="#" className="text-[#475467] hover:text-[#0057c0] transition-colors">
              <LinkIcon className="w-4 h-4" />
            </Link>
          </div>
        </ScrollAnimation>
        
        <ScrollAnimation delay={0.2} className="flex flex-col md:items-end text-left md:text-right justify-center">
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#181b24] mb-4">
            Contact & Support
          </h4>
          <p className="text-sm leading-relaxed text-[#475467] mb-5 max-w-sm md:text-right">
            For technical inquiries, sandbox trials, enterprise custom workshops, and migration deployment consults, reach out to our team directly.
          </p>
          <a
            href="mailto:support@geosolvix.com"
            className="text-sm font-bold text-[#006ff0] hover:text-[#0057c0] inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-50 hover:bg-blue-100 transition-all border border-blue-100/50 shadow-sm w-fit group"
          >
            <Mail className="w-4 h-4 transition-transform group-hover:scale-110" />
            support@geosolvix.com
          </a>
        </ScrollAnimation>
      </div>
      
      <div className="border-t border-[#EAECF0]">
        <ScrollAnimation
          delay={0.6}
          className="px-4 md:px-12 py-6 max-w-[1280px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-xs text-[#475467]">
            © 2026 Geosolvix, Inc. All rights reserved. Registered under Delaware corporate registries.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-xs text-[#475467] hover:text-[#0057c0] transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-xs text-[#475467] hover:text-[#0057c0] transition-colors">
              Terms of Service
            </Link>
          </div>
        </ScrollAnimation>
      </div>
    </footer>
  );
}
