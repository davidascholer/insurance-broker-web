import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/header/Header";
import Footer from "@/components/Footer";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { getAllBlogs, deleteBlog } from "@/api/admin/blog";
import type { BlogData } from "@/api/admin/types";
import Loader from "@/components/Loader";

type SavedPage = {
  name: string;
  components: unknown[];
  timestamp: Date;
  card?: {
    title: string;
    description: string;
    date: string;
    imageUrl: string;
    labels: string[];
  };
};

const BlogCreationList = () => {
  useRequireAuth();
  const [pages, setPages] = useState<SavedPage[]>([]);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [newPageName, setNewPageName] = useState("");
  const [nameError, setNameError] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const loadPages = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const token = localStorage.getItem("pipaAdminAccessToken") || "";
      const result = await getAllBlogs(token);

      if (result.success && result.data) {
        // Convert BlogData to SavedPage format
        const convertedPages: SavedPage[] = result.data.map(
          (blog: BlogData) => ({
            name: blog.name,
            components: blog.components,
            timestamp: new Date(blog.updatedAt || blog.createdAt || new Date()),
            card: {
              title: blog.card.title,
              description: blog.card.description,
              date: blog.card.date,
              imageUrl: blog.card.imageURLs[0] || "",
              labels: blog.card.labels,
            },
          }),
        );
        setPages(convertedPages);
      } else {
        setError(result.error || "Failed to load blogs");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load blogs");
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch blogs every time the page loads
  useEffect(() => {
    loadPages();
  }, [loadPages]);

  const handleEdit = (pageName: string) => {
    navigate(`/blog/creator/${pageName}`);
  };

  const handleDelete = async (pageName: string) => {
    if (window.confirm(`Are you sure you want to delete "${pageName}"?`)) {
      try {
        const token = localStorage.getItem("pipaAdminAccessToken") || "";
        const result = await deleteBlog(pageName, token);

        if (result.success) {
          // Remove from local state
          setPages(pages.filter((p) => p.name !== pageName));
        } else {
          alert(`Failed to delete blog: ${result.error}`);
        }
      } catch (err) {
        alert(
          `Error deleting blog: ${err instanceof Error ? err.message : "Unknown error"}`,
        );
      }
    }
  };

  const validatePageName = (name: string) => {
    if (!name.trim()) {
      return "Page name is required";
    }
    if (!/^[A-Z]/.test(name)) {
      return "Page name must start with an uppercase letter";
    }
    if (!/^[A-Za-z0-9]+$/.test(name)) {
      return "Page name can only contain letters and numbers";
    }
    if (pages.some((p) => p.name === name)) {
      return "A page with this name already exists";
    }
    return "";
  };

  const handleCreateNew = () => {
    setIsCreatingNew(true);
    setNewPageName("");
    setNameError("");
  };

  const handleCancelCreate = () => {
    setIsCreatingNew(false);
    setNewPageName("");
    setNameError("");
  };

  const handleSubmitNewPage = () => {
    const error = validatePageName(newPageName);
    if (error) {
      setNameError(error);
      return;
    }
    navigate(`/blog/creator/${newPageName}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center h-screen">
          <Loader />
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="pt-30 pb-8">
          <div className="max-w-7xl mx-auto px-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <h2 className="text-xl font-bold text-red-700 mb-2">
                Error Loading Blogs
              </h2>
              <p className="text-red-600">{error}</p>
              <button
                onClick={() => loadPages()}
                className="mt-4 px-6 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="pt-30 pb-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-(--primary-teal-dark) sansita-bold mb-2">
                Blog Pages
              </h1>
              <p className="text-(--text-dark) nunito-sans">
                Manage your blog pages
              </p>
            </div>
            <button
              onClick={handleCreateNew}
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-(--primary-teal) text-white font-semibold hover:bg-(--primary-teal-dark) transition-colors"
            >
              <Plus className="w-5 h-5" />
              Create New Page
            </button>
          </div>

          {pages.length === 0 ? (
            <div className="bg-white rounded-lg shadow-lg p-12 text-center">
              {!isCreatingNew ? (
                <>
                  <p className="text-gray-500 text-lg mb-4">
                    No blog pages created yet
                  </p>
                  <button
                    onClick={handleCreateNew}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-(--primary-teal) text-white font-semibold hover:bg-(--primary-teal-dark) transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                    Create Your First Page
                  </button>
                </>
              ) : (
                <div className="max-w-md mx-auto">
                  <h3 className="text-xl font-bold text-(--primary-teal-dark) mb-4">
                    Create New Page
                  </h3>
                  <div className="mb-4">
                    <input
                      type="text"
                      value={newPageName}
                      onChange={(e) => {
                        setNewPageName(e.target.value);
                        setNameError("");
                      }}
                      placeholder="Enter page name (e.g., MyNewPage)"
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-(--primary-teal) focus:outline-none"
                      autoFocus
                    />
                    {nameError && (
                      <p className="text-red-500 text-sm mt-2">{nameError}</p>
                    )}
                    <p className="text-xs text-gray-500 mt-2">
                      Must start with uppercase letter and contain only letters
                      and numbers
                    </p>
                  </div>
                  <div className="flex gap-3 justify-center">
                    <button
                      onClick={handleSubmitNewPage}
                      className="px-6 py-2 rounded-lg bg-(--primary-teal) text-white font-semibold hover:bg-(--primary-teal-dark) transition-colors"
                    >
                      Create
                    </button>
                    <button
                      onClick={handleCancelCreate}
                      className="px-6 py-2 rounded-lg bg-gray-300 text-gray-700 font-semibold hover:bg-gray-400 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {isCreatingNew && (
                <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-(--primary-teal)">
                  <h3 className="text-lg font-bold text-(--primary-teal-dark) mb-3">
                    New Page
                  </h3>
                  <div className="mb-4">
                    <input
                      type="text"
                      value={newPageName}
                      onChange={(e) => {
                        setNewPageName(e.target.value);
                        setNameError("");
                      }}
                      placeholder="Page name"
                      className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-(--primary-teal) focus:outline-none text-sm"
                      autoFocus
                    />
                    {nameError && (
                      <p className="text-red-500 text-xs mt-1">{nameError}</p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">
                      Uppercase start, letters & numbers only
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleSubmitNewPage}
                      className="flex-1 px-4 py-2 rounded-lg bg-(--primary-teal) text-white text-sm font-semibold hover:bg-(--primary-teal-dark) transition-colors"
                    >
                      Create
                    </button>
                    <button
                      onClick={handleCancelCreate}
                      className="px-4 py-2 rounded-lg bg-gray-300 text-gray-700 text-sm font-semibold hover:bg-gray-400 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
              {pages.map((page) => (
                <div key={page.name} className="group">
                  <div className="mb-2">
                    <h3 className="text-lg font-bold text-(--primary-teal-dark) sansita-bold">
                      {page.name}
                    </h3>
                  </div>
                  <div className="flex flex-col bg-white rounded-xl shadow-md overflow-hidden border-2 border-gray-200 hover:shadow-xl transition-shadow">
                    <div className="w-full h-48 overflow-hidden bg-gray-100">
                      {page.card?.imageUrl ? (
                        <img
                          src={page.card.imageUrl}
                          alt={page.card.title || page.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "https://via.placeholder.com/400x300?text=No+Image";
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          No image
                        </div>
                      )}
                    </div>
                    <div className="p-6 flex flex-col gap-3">
                      <h4 className="text-(--primary-teal-dark) text-xl sansita-bold line-clamp-2">
                        {page.card?.title || "Untitled"}
                      </h4>
                      <p className="text-(--text-dark) text-sm nunito-sans">
                        {page.card?.date
                          ? new Date(
                              page.card.date + "T00:00:00",
                            ).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })
                          : "No date"}
                      </p>
                      <p className="text-(--text-dark) nunito-sans line-clamp-3">
                        {page.card?.description || "No description"}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {page.card?.labels && page.card.labels.length > 0 ? (
                          page.card.labels.map((label) => (
                            <span
                              key={label}
                              className="px-3 py-1 text-xs rounded-full bg-(--light-pink) text-(--primary-teal-dark) nunito-sans font-semibold"
                            >
                              {label}
                            </span>
                          ))
                        ) : (
                          <span className="text-gray-400 text-sm">
                            No labels
                          </span>
                        )}
                      </div>
                      <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200">
                        <button
                          onClick={() => handleEdit(page.name)}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-(--primary-teal) text-white font-semibold hover:bg-(--primary-teal-dark) transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(page.name)}
                          className="px-4 py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogCreationList;
