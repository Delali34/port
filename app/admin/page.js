"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Trash2,
  Edit2,
  Loader2,
  Eye,
  EyeOff,
  Image as ImageIcon,
  Link as LinkIcon,
  ListOrdered,
  Bold,
  Italic,
} from "lucide-react";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { Fonts } from "@/styles/fonts";
import ReactMarkdown from "react-markdown";

export default function AdminPage() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isPreview, setIsPreview] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const router = useRouter();

  const categories = [
    "Technology",
    "Design",
    "Development",
    "Business",
    "Tutorial",
    "News",
    "Other",
  ];

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/posts");
      if (!response.ok) throw new Error("Failed to fetch posts");
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setError("Failed to fetch posts");
    }
  };

  const calculateReadTime = (content) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (!title || !content || !excerpt || !category || !author) {
        throw new Error("Please fill in all required fields");
      }

      const readTime = calculateReadTime(content);
      const slug = title
        .toLowerCase()
        .replace(/[^\w\s]/gi, "")
        .replace(/\s+/g, "-");

      const postData = {
        title,
        slug,
        content,
        excerpt,
        category,
        author,
        coverImage: coverImage || "https://placehold.co/600x400",
        readTime,
      };

      const url = editingId ? `/api/posts/${editingId}` : "/api/posts";
      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save post");
      }

      clearForm();
      fetchPosts();
      setEditingId(null);
    } catch (error) {
      console.error("Error saving post:", error);
      setError(error.message || "Failed to save post");
    } finally {
      setLoading(false);
    }
  };

  const clearForm = () => {
    setTitle("");
    setContent("");
    setExcerpt("");
    setCategory("");
    setAuthor("");
    setCoverImage("");
    setError("");
    setEditingId(null);
  };

  const handleEdit = (post) => {
    setEditingId(post.id);
    setTitle(post.title);
    setContent(post.content);
    setExcerpt(post.excerpt);
    setCategory(post.category);
    setAuthor(post.author);
    setCoverImage(post.coverImage);
  };

  const uploadToCloudinary = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
      );

      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
      if (!cloudName) {
        throw new Error("Cloudinary cloud name is not configured");
      }

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Upload failed");
      }

      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      throw new Error("Failed to upload image to Cloudinary");
    }
  };

  const insertMarkdown = async (type) => {
    const textarea = document.getElementById("content-editor");
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    let insertion = "";
    let cursorOffset = 0;

    switch (type) {
      case "image":
        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.accept = "image/*";

        fileInput.onchange = async (e) => {
          const file = e.target.files[0];
          if (file) {
            try {
              setLoading(true);
              setError("");
              const imageUrl = await uploadToCloudinary(file);
              const imageMarkdown = `![${
                selectedText || file.name
              }](${imageUrl})`;
              const newContent =
                content.substring(0, start) +
                imageMarkdown +
                content.substring(end);
              setContent(newContent);
            } catch (error) {
              console.error("Error uploading image:", error);
              setError(error.message || "Failed to upload image");
            } finally {
              setLoading(false);
            }
          }
        };

        fileInput.click();
        return;

      case "bold":
        insertion = selectedText ? `**${selectedText}**` : "**bold text**";
        cursorOffset = selectedText ? insertion.length : 2;
        break;

      case "italic":
        insertion = selectedText ? `*${selectedText}*` : "*italic text*";
        cursorOffset = selectedText ? insertion.length : 1;
        break;

      case "link":
        insertion = selectedText
          ? `[${selectedText}](url)`
          : "[link text](url)";
        cursorOffset = selectedText ? insertion.length - 1 : 1;
        break;

      case "list":
        insertion = `\n1. ${
          selectedText || "First item"
        }\n2. Second item\n3. Third item\n`;
        cursorOffset = selectedText
          ? insertion.length
          : insertion.indexOf("First item");
        break;
    }

    if (type !== "image") {
      const newContent =
        content.substring(0, start) + insertion + content.substring(end);
      setContent(newContent);

      // Reset focus and cursor position
      textarea.focus();
      const newCursorPos = start + cursorOffset;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }
  };

  const handleDeleteClick = (post) => {
    setPostToDelete(post);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (postToDelete) {
      try {
        const response = await fetch(`/api/posts/${postToDelete.id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Failed to delete post");
        }

        fetchPosts();
        setShowDeleteModal(false);
        setPostToDelete(null);
      } catch (error) {
        console.error("Error deleting post:", error);
        setError("Failed to delete post");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 md:p-8">
      <Fonts />
      <div className="max-w-6xl mx-auto mt-20">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Blog Admin</h1>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 font-medium">Title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-none transition"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Category *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-none transition"
                required
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block mb-2 font-medium">Excerpt *</label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-none transition"
              rows="3"
              required
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="font-medium">
                Content * (Markdown supported)
              </label>
              <button
                type="button"
                onClick={() => setIsPreview(!isPreview)}
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                {isPreview ? (
                  <>
                    <EyeOff size={16} />
                    Hide Preview
                  </>
                ) : (
                  <>
                    <Eye size={16} />
                    Show Preview
                  </>
                )}
              </button>
            </div>

            <div className="flex gap-2 mb-2 bg-gray-800 p-2 rounded-t border border-gray-700">
              {[
                { icon: <Bold size={16} />, action: "bold", title: "Bold" },
                {
                  icon: <Italic size={16} />,
                  action: "italic",
                  title: "Italic",
                },
                {
                  icon: <LinkIcon size={16} />,
                  action: "link",
                  title: "Insert Link",
                },
                {
                  icon: <ImageIcon size={16} />,
                  action: "image",
                  title: "Insert Image",
                },
                {
                  icon: <ListOrdered size={16} />,
                  action: "list",
                  title: "Ordered List",
                },
              ].map((item) => (
                <button
                  key={item.action}
                  type="button"
                  onClick={() => insertMarkdown(item.action)}
                  className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
                  title={item.title}
                >
                  {item.icon}
                </button>
              ))}
            </div>

            <div
              className={`grid ${
                isPreview ? "grid-cols-2 gap-6" : "grid-cols-1"
              }`}
            >
              <div>
                <textarea
                  id="content-editor"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full p-3 rounded-b bg-gray-800 border border-gray-700 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-none transition font-mono"
                  rows="20"
                  required
                />
              </div>
              {isPreview && (
                <div className="prose prose-invert max-w-none bg-gray-800 p-3 rounded border border-gray-700 overflow-y-auto h-[500px]">
                  <ReactMarkdown
                    components={{
                      img: ({ node, ...props }) => (
                        <img {...props} className="max-w-full h-auto rounded" />
                      ),
                      p: ({ node, ...props }) => (
                        <p {...props} className="my-4" />
                      ),
                      h1: ({ node, ...props }) => (
                        <h1
                          {...props}
                          className="text-2xl font-bold mt-6 mb-4"
                        />
                      ),
                      h2: ({ node, ...props }) => (
                        <h2
                          {...props}
                          className="text-xl font-bold mt-5 mb-3"
                        />
                      ),
                      h3: ({ node, ...props }) => (
                        <h3
                          {...props}
                          className="text-lg font-bold mt-4 mb-2"
                        />
                      ),
                      ul: ({ node, ...props }) => (
                        <ul {...props} className="list-disc list-inside my-4" />
                      ),
                      ol: ({ node, ...props }) => (
                        <ol
                          {...props}
                          className="list-decimal list-inside my-4"
                        />
                      ),
                      li: ({ node, ...props }) => (
                        <li {...props} className="my-1" />
                      ),
                      a: ({ node, ...props }) => (
                        <a
                          {...props}
                          className="text-blue-400 hover:text-blue-300"
                        />
                      ),
                    }}
                  >
                    {content}
                  </ReactMarkdown>
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block mb-2 font-medium">Author *</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-none transition"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Cover Image</label>
            <ImageUpload
              onImageUploaded={(url) => setCoverImage(url)}
              className="mt-1"
            />
            {coverImage && (
              <div className="mt-2">
                <img
                  src={coverImage}
                  alt="Cover preview"
                  className="w-40 h-40 object-cover rounded"
                />
              </div>
            )}
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {loading
                ? "Saving..."
                : editingId
                ? "Update Post"
                : "Create Post"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={clearForm}
                className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* Posts List */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Posts</h2>
          <div className="space-y-4">
            {posts.map((post) => (
              <div
                key={post.id}
                className="p-4 bg-gray-800 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors"
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-1">{post.title}</h3>
                    <p className="text-gray-400 text-sm mb-2">
                      {post.category}
                    </p>
                    <p className="text-gray-300 text-sm line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(post)}
                      className="p-2 text-blue-400 hover:text-blue-300 transition-colors"
                      title="Edit post"
                    >
                      <Edit2 size={20} />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(post)}
                      className="p-2 text-red-400 hover:text-red-300 transition-colors"
                      title="Delete post"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {posts.length === 0 && (
              <p className="text-gray-400 text-center py-4">No posts yet</p>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-bold mb-4">Confirm Delete</h3>
            <p className="mb-6">
              Are you sure you want to delete "{postToDelete?.title}"? This
              action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
