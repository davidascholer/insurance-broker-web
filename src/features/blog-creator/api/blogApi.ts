import type { InternalComponentItem } from "../utils/internal-types";
import { createBlog, updateBlog, getBlogByName } from "@/api/admin/blog";
import type { CreateBlogData, UpdateBlogData } from "@/api/admin/types";
import { internalToExport } from "../utils/helpers";

interface SavePageData {
  pageName: string;
  components: InternalComponentItem[];
  blogTitle: string;
  blogDescription: string;
  blogDate: string;
  blogImageUrl: string;
  blogLabels: string[];
}

export const savePage = async (
  data: SavePageData,
): Promise<{ success: boolean; message: string }> => {
  try {
    console.log("Saving page to server:", data);

    const token = localStorage.getItem("pipaAdminAccessToken") || "";
    if (!token) {
      return {
        success: false,
        message: "Authentication token not found. Please log in.",
      };
    }

    // Convert internal components to export format
    const exportComponents: ComponentItem[] = data.components.map((comp) =>
      internalToExport(comp),
    );

    // Check if blog already exists
    const existingBlog = await getBlogByName(data.pageName, token);

    let result;
    if (existingBlog.success && existingBlog.data) {
      // Update existing blog
      const updateData: UpdateBlogData = {
        card: {
          title: data.blogTitle,
          description: data.blogDescription,
          date: data.blogDate,
          imageURLs: [data.blogImageUrl],
          labels: data.blogLabels,
        },
        component: exportComponents,
        user: "admin", // You might want to get this from auth context
      };

      result = await updateBlog(data.pageName, updateData, token);
    } else {
      // Create new blog
      const createData: CreateBlogData = {
        pageName: data.pageName,
        card: {
          title: data.blogTitle,
          description: data.blogDescription,
          date: data.blogDate,
          imageURLs: [data.blogImageUrl],
          labels: data.blogLabels,
        },
        component: exportComponents,
        user: "admin",
        isPublished: false,
      };

      result = await createBlog(createData, token);
    }

    if (result.success) {
      console.log("Server response:", result);
      return {
        success: true,
        message: "Page saved successfully",
      };
    } else {
      return {
        success: false,
        message: result.error || "Failed to save page",
      };
    }
  } catch (error) {
    console.error("Error saving page:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to save page",
    };
  }
};
