// components/admin/ImageUpload.js
import { useState } from "react";
import { Upload, Loader2 } from "lucide-react";

export const ImageUpload = ({ onImageUploaded, className = "" }) => {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      onImageUploaded(data.url);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        disabled={uploading}
      />
      <div className="flex items-center justify-center px-6 py-4 border-2 border-dashed border-gray-700 rounded-lg hover:border-pink-500 transition-colors">
        {uploading ? (
          <>
            <Loader2 className="w-6 h-6 text-pink-500 animate-spin mr-2" />
            <span className="text-gray-400">Uploading...</span>
          </>
        ) : (
          <>
            <Upload className="w-6 h-6 text-gray-400 mr-2" />
            <span className="text-gray-400">Click to upload image</span>
          </>
        )}
      </div>
    </div>
  );
};
