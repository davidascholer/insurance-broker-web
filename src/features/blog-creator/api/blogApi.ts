import type { InternalComponentItem } from "../utils/internal-types";

interface SavePageData {
  pageName: string;
  components: InternalComponentItem[];
  blogTitle: string;
  blogDescription: string;
  blogDate: string;
  blogImageUrl: string;
  blogLabels: string[];
}

export const savePage = async (data: SavePageData): Promise<{ success: boolean; message: string }> => {
  try {
    console.log("Saving page to server:", data);

    const response = await fetch("http://localhost:3000/api/save-page", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log("Server response:", result);

    return {
      success: true,
      message: "Page saved successfully",
    };
  } catch (error) {
    console.error("Error saving page:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to save page",
    };
  }
};
