"use client";
import { formattedDate } from "@/lib/utils";

import { Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

function SinglePost({ post }) {
  const { slug, title, description, image, createdAt, category, views } = post;
  const formatDate = formattedDate(createdAt);
  const categoryTitle = category?.title || "Uncategorized";
  const [sanitizedDescription, setSanitizedDescription] = useState(description);

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("dompurify").then((DOMPurifyModule) => {
        const DOMPurify = DOMPurifyModule.default;

        // ✅ Always sanitize to prevent untrusted input from rendering
        setSanitizedDescription(DOMPurify.sanitize(description));
      });
    } else {
      // Fallback for SSR: Keep original content
      setSanitizedDescription(description);
    }
  }, [description]);

  return (
    <div className="mb-[50px] flex gap-10 items-center mt-5">
      <div className="hidden lg:flex flex-1 h-[350px] relative">
        <Image src={image} alt="" fill className="rounded-md object-cover" />
      </div>
      <div className="flex-1 flex flex-col gap-5">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-3 text-sm">
            <span className="text-muted-foreground">{formatDate}</span>
            <span className="font-medium text-red-500">{categoryTitle}</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Eye
              className="text-muted-foreground"
              size={20}
              strokeWidth={1.5}
            />
            <span className="text-sm font-medium text-muted-foreground">
              {views}
            </span>
          </div>
        </div>
        <Link href={`/post/${slug}`}>
          <h1 className="text-2xl font-bold cursor-pointer">{title}</h1>
        </Link>

        <div
          dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
          className="text-sm font-normal text-muted-foreground line-clamp-5"
        />

        <Link
          href={`/post/${slug}`}
          className="size-fit font-medium bg-zinc-200 py-2 px-4 rounded-md text-zinc-700 hover:text-black"
        >
          Read More
        </Link>
      </div>
    </div>
  );
}
export default SinglePost;
