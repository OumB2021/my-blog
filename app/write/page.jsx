"use client";

import { useEffect, useRef, useState } from "react";
import "quill/dist/quill.bubble.css";
import dynamicImport from "next/dynamic";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { createPost } from "@/actions/create-post";
import { SelectCategory } from "./_components/select-categories";
import Image from "next/image";
import UploadButtons from "./_components/ upload-buttons";

const Quill = dynamicImport(() => import("quill"), { ssr: false });
export const dynamic = "force-dynamic";
function WritePage() {
  const { status } = useSession();
  const router = useRouter();

  // ✅ Fixed useRef (Removed TypeScript-style generics)
  const editorRef = useRef(null);

  // ✅ Fixed useState (Removed TypeScript-style generics)
  const [quill, setQuill] = useState(null);
  const [value, setValue] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState("");
  const [title, setTitle] = useState("");

  console.log("Selected File:", file);

  useEffect(() => {
    if (!editorRef.current || quill) return;

    import("quill").then((QuillModule) => {
      const Quill = QuillModule.default;
      const q = new Quill(editorRef.current, {
        theme: "bubble",
        placeholder: "Write your blog content here...",
      });

      q.on("text-change", () => {
        setValue(q.root.innerHTML.trim());
      });

      setQuill(q);
    });
  }, [quill]);

  const handleSubmit = async (formData) => {
    await createPost(formData);
    router.push("/"); // Redirect after post creation
  };

  // Redirect if unauthenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/sign-in");
    }
  }, [status, router]);

  if (status === "unauthenticated") return null;

  return (
    <div className="flex flex-col gap-4">
      <div className="mt-10">
        <h1 className="text-3xl font-bold text-center md:text-left">
          Write a new blog
        </h1>
      </div>
      <form className="flex flex-col gap-4" action={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="md:placeholder:text-3xl placeholder:text-2xl placeholder:font-medium py-4 text-3xl w-full font-bold bg-transparent focus:outline-none focus:ring-0 focus-visible:ring-0"
        />

        <div className="flex flex-col gap-2">
          <SelectCategory setCategory={setCategory} />
          <input type="hidden" name="category" value={category} />
          <input type="hidden" name="fileurl" value={fileUrl} />
          <UploadButtons setFile={setFile} setFileUrl={setFileUrl} />
          {fileUrl && (
            <div className="w-[180px] h-[180px] relative">
              <Image
                src={fileUrl}
                alt="uploaded"
                fill
                className="object-cover rounded-md"
              />
            </div>
          )}
        </div>
        <div className="h-64 relative">
          {status === "loading" && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="animate-spin text-muted-foreground" />
            </div>
          )}
          <input type="hidden" name="content" value={value} />
          <div ref={editorRef} className="h-64" />
        </div>
        <button
          type="submit"
          disabled={!value.trim()}
          className="bg-zinc-800 px-4 py-[10px] text-white size-fit font-medium rounded-md disabled:bg-zinc-400 disabled:cursor-not-allowed transition-all"
        >
          Publish Blog
        </button>
      </form>
    </div>
  );
}

export default WritePage;
