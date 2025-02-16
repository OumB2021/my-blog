"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { signoutAction } from "@/actions/auth-action";

function AuthLinks({ className }) {
  const { status } = useSession();
  return (
    <>
      {status === "unauthenticated" ? (
        <Link
          href="/sign-in"
          className={cn(
            "bg-zinc-800 hover:bg-zinc-700 px-4 py-[10px] text-white font-medium rounded-md",
            className
          )}
        >
          Login
        </Link>
      ) : (
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-[10px]">
          <Link
            href="/write"
            className={cn(
              "bg-zinc-800 hover:bg-zinc-700 px-4 py-[10px] text-white w-full font-medium rounded-md",
              className
            )}
          >
            Write
          </Link>

          <div className="bg-red-800 hover:bg-red-700 text-white w-full font-medium rounded-md cursor-pointer">
            <form action={signoutAction}>
              <button className="w-full h-full px-4 py-[10px] block text-white text-2xl md:text-sm">
                Logout
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
export default AuthLinks;
