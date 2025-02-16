"use client";

import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";
import Link from "next/link";
import AuthLinks from "./auth-links/auth-links";
import Image from "next/image";
import { useState } from "react";

const links = [
  { title: "Home", href: "/" },
  { title: "Contact", href: "/" },
  { title: "About", href: "/" },
];
function HamburgerMenu() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="md:hidden text-white bg-zinc-800 dark:bg-zinc-100 p-2 rounded-md">
        <Menu />
      </SheetTrigger>
      <SheetContent>
        <SheetTitle className="text-center">
          <Link
            href="/"
            className="font-bold text-3xl  text-zinc-700 hover:text-black"
            onClick={() => setOpen(false)}
          >
            OumBlog
          </Link>
        </SheetTitle>
        <div className="relative w-full h-full flex flex-col gap-10 text-center mt-8">
          {/* Links Section (takes up available space) */}
          <div className="flex flex-col gap-10 flex-1">
            {links.map((link, key) => (
              <Link
                className="flex flex-col text-2xl hover:bg-zinc-200 p-2 rounded-md"
                href={link.href}
                key={key}
                onClick={() => setOpen(false)}
              >
                {link.title}
              </Link>
            ))}
            <AuthLinks className="text-2xl" />
          </div>

          {/* Footer Section (Always at the bottom) */}
          <div className="absolute bottom-20  w-full flex flex-col text-sm text-zinc-700 dark:text-zinc-800 gap-3 -mt-4">
            <div className="flex gap-[10px] justify-center">
              <Image src="/facebook.png" width={24} height={24} alt="logo" />
              <Image src="/instagram.png" width={24} height={24} alt="logo" />
              <Image src="/tiktok.png" width={24} height={24} alt="logo" />
              <Image src="/youtube.png" width={24} height={24} alt="logo" />
            </div>
            <p>© 2024 OumBlog. All rights reserved.</p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
export default HamburgerMenu;
