"use client";
import { useEffect, useState } from "react";

function PostRender({ description }) {
  const [sanitizedDescription, setSanitizedDescription] = useState("");

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
    <div
      dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
      className="text-sm font-normal text-muted-foreground line-clamp-5"
    />
  );
}
export default PostRender;
