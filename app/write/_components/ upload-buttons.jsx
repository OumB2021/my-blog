"use client";

import { ImageIcon } from "lucide-react";
import { useRef, useState } from "react";
import { useEdgeStore } from "@/lib/edgestore"; // Assuming this is your EdgeStore import

function UploadButtons({ setFile, setFileUrl }) {
  // ✅ Fixed useRef (removed TypeScript generic)
  const fileInputRef = useRef(null);

  // ✅ Fixed useState (removed TypeScript generic)
  const [uploadProgress, setUploadProgress] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const { edgestore } = useEdgeStore();

  // 🔹 Handles file selection
  const handleFileChange = async (event) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);

    if (selectedFile) {
      await uploadFile(selectedFile);
    }
  };

  // 🔹 Uploads the file to EdgeStore
  const uploadFile = async (file) => {
    try {
      setIsUploading(true);
      const res = await edgestore.publicFiles.upload({
        file,
        onProgressChange: (progress) => {
          setUploadProgress(progress);
          console.log("Upload Progress:", progress);
        },
      });

      setFileUrl(res.url);
      console.log("Upload Complete:", res);
    } catch (error) {
      console.error("Upload Error:", error);
    } finally {
      setIsUploading(false);
      setUploadProgress(null);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-[180px]">
      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange} // Trigger upload on file selection
      />

      {/* Upload Button */}
      <button
        type="button"
        className="p-3 w-full border border-1 rounded-sm bg-white flex justify-start items-center gap-2 disabled:opacity-50"
        onClick={() => fileInputRef.current?.click()} // Triggers file selection
        disabled={isUploading}
      >
        <ImageIcon className="text-muted-foreground" size={16} />
        <p className="text-sm text-muted-foreground">
          {isUploading ? "Uploading..." : "Upload Image"}
        </p>
      </button>

      {/* Progress Indicator */}
      {uploadProgress !== null && (
        <div className="w-full bg-gray-200 h-2 rounded-md">
          <div
            className="h-2 bg-blue-500 rounded-md transition-all"
            style={{ width: `${uploadProgress}%` }}
          ></div>
        </div>
      )}
    </div>
  );
}

export default UploadButtons;
