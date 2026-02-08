import { PIPA_BLOG_URL } from "../constants";
import type { BlogData, CreateBlogData, UpdateBlogData } from "./types";
import { validateCreateBlogData, validateUpdateBlogData } from "./util";

// API Functions

/**
 * Get all blogs
 */
export const getAllBlogs = async (
  token?: string,
): Promise<{ success: boolean; data?: BlogData[]; error?: string }> => {
  try {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(PIPA_BLOG_URL, {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      return {
        success: false,
        error: `Error: ${response.status} ${response.statusText}`,
      };
    }

    const result = await response.json();
    return {
      success: true,
      data: result.data || result,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};

/**
 * Get a single blog by name
 */
export const getBlogByName = async (
  name: string,
  token?: string,
): Promise<{ success: boolean; data?: BlogData; error?: string }> => {
  try {
    if (!name || typeof name !== "string" || !name.trim()) {
      return {
        success: false,
        error: "Blog name is required and must be a non-empty string",
      };
    }

    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(
      `${PIPA_BLOG_URL}/${encodeURIComponent(name)}`,
      {
        method: "GET",
        headers,
      },
    );

    if (!response.ok) {
      return {
        success: false,
        error: `Error: ${response.status} ${response.statusText}`,
      };
    }

    const result = await response.json();
    return {
      success: true,
      data: result.data || result,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};

/**
 * Create a new blog
 */
export const createBlog = async (
  blogData: CreateBlogData,
  token: string,
): Promise<{ success: boolean; data?: BlogData; error?: string }> => {
  try {
    if (!token || typeof token !== "string" || !token.trim()) {
      return {
        success: false,
        error: "Authentication token is required",
      };
    }

    if (!validateCreateBlogData(blogData)) {
      return {
        success: false,
        error:
          "Invalid blog data. Please ensure all required fields are properly formatted.",
      };
    }

    const response = await fetch(PIPA_BLOG_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(blogData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      return {
        success: false,
        error:
          errorData?.message ||
          `Error: ${response.status} ${response.statusText}`,
      };
    }

    const result = await response.json();
    return {
      success: true,
      data: result.data || result,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};

/**
 * Update an existing blog
 */
export const updateBlog = async (
  name: string,
  blogData: UpdateBlogData,
  token: string,
): Promise<{ success: boolean; data?: BlogData; error?: string }> => {
  try {
    if (!token || typeof token !== "string" || !token.trim()) {
      return {
        success: false,
        error: "Authentication token is required",
      };
    }

    if (!name || typeof name !== "string" || !name.trim()) {
      return {
        success: false,
        error: "Blog name is required and must be a non-empty string",
      };
    }

    if (!validateUpdateBlogData(blogData)) {
      return {
        success: false,
        error:
          "Invalid blog data. Please ensure all fields are properly formatted.",
      };
    }

    if (Object.keys(blogData).length === 0) {
      return {
        success: false,
        error: "At least one field must be provided for update",
      };
    }

    const response = await fetch(
      `${PIPA_BLOG_URL}/${encodeURIComponent(name)}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(blogData),
      },
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      return {
        success: false,
        error:
          errorData?.message ||
          `Error: ${response.status} ${response.statusText}`,
      };
    }

    const result = await response.json();
    return {
      success: true,
      data: result.data || result,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};

/**
 * Publish or unpublish a blog
 */
export const publishBlog = async (
  name: string,
  isPublished: boolean,
  token: string,
): Promise<{ success: boolean; data?: BlogData; error?: string }> => {
  try {
    if (!token || typeof token !== "string" || !token.trim()) {
      return {
        success: false,
        error: "Authentication token is required",
      };
    }

    if (!name || typeof name !== "string" || !name.trim()) {
      return {
        success: false,
        error: "Blog name is required and must be a non-empty string",
      };
    }

    if (typeof isPublished !== "boolean") {
      return {
        success: false,
        error: "isPublished must be a boolean value",
      };
    }

    const response = await fetch(
      `${PIPA_BLOG_URL}/${encodeURIComponent(name)}/publish`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isPublished }),
      },
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      return {
        success: false,
        error:
          errorData?.message ||
          `Error: ${response.status} ${response.statusText}`,
      };
    }

    const result = await response.json();
    return {
      success: true,
      data: result.data || result,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};

/**
 * Delete a blog
 */
export const deleteBlog = async (
  name: string,
  token: string,
): Promise<{ success: boolean; message?: string; error?: string }> => {
  try {
    if (!token || typeof token !== "string" || !token.trim()) {
      return {
        success: false,
        error: "Authentication token is required",
      };
    }

    if (!name || typeof name !== "string" || !name.trim()) {
      return {
        success: false,
        error: "Blog name is required and must be a non-empty string",
      };
    }

    const response = await fetch(
      `${PIPA_BLOG_URL}/${encodeURIComponent(name)}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      return {
        success: false,
        error:
          errorData?.message ||
          `Error: ${response.status} ${response.statusText}`,
      };
    }

    const result = await response.json();
    return {
      success: true,
      message: result.message || "Blog deleted successfully",
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};
