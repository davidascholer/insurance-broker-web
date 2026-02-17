import type { ComponentItem } from "@/features/blog-creator/utils/export-types";
import type { BlogCard, CreateBlogData, UpdateBlogData } from "./types";

// Validation helpers
const validateBlogCard = (card: unknown): card is BlogCard => {
  if (!card || typeof card !== "object") return false;
  const cardObj = card as Record<string, unknown>;
  if (typeof cardObj.title !== "string" || !cardObj.title.trim()) return false;
  if (typeof cardObj.description !== "string" || !cardObj.description.trim())
    return false;
  if (typeof cardObj.date !== "string" || !cardObj.date.trim()) return false;
  if (!Array.isArray(cardObj.imageURLs)) return false;
  if (!cardObj.imageURLs.every((url: unknown) => typeof url === "string"))
    return false;
  if (!Array.isArray(cardObj.labels)) return false;
  if (!cardObj.labels.every((label: unknown) => typeof label === "string"))
    return false;
  return true;
};

const validateComponents = (
  components: unknown,
): components is ComponentItem[] => {
  if (!Array.isArray(components)) return false;
  return components.every((comp: unknown) => {
    return comp && typeof comp === "object" && "children" in comp;
  });
};

export const validateCreateBlogData = (
  data: unknown,
): data is CreateBlogData => {
  if (!data || typeof data !== "object") return false;
  const dataObj = data as Record<string, unknown>;
  if (typeof dataObj.name !== "string" || !dataObj.name.trim()) return false;
  if (typeof dataObj.user !== "string" || !dataObj.user.trim()) return false;
  if (!validateBlogCard(dataObj.card)) return false;
  if (!validateComponents(dataObj.components)) return false;
  return true;
};

export const validateUpdateBlogData = (
  data: unknown,
): data is UpdateBlogData => {
  if (!data || typeof data !== "object") return false;
  const dataObj = data as Record<string, unknown>;
  if (dataObj.card && !validateBlogCard(dataObj.card)) return false;
  if (dataObj.components && !validateComponents(dataObj.components))
    return false;
  if (
    dataObj.user &&
    (typeof dataObj.user !== "string" || !dataObj.user.trim())
  )
    return false;
  return true;
};
