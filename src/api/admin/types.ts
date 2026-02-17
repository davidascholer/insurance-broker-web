import type { ComponentItem } from "@/features/blog-creator/utils/export-types";

// Types
export interface BlogCard {
  title: string;
  description: string;
  date: string;
  imageURLs: string[];
  labels: string[];
}

export interface BlogData {
  pageName: string;
  card: BlogCard;
  component: ComponentItem;
  user: string;
  createdAt?: string;
  updatedAt?: string;
  isPublished: boolean;
}

export interface CreateBlogData {
  card: BlogCard;
  component: ComponentItem;
  pageName: string;
  user: string;
  isPublished: boolean;
}

export interface UpdateBlogData {
  card?: BlogCard;
  component?: ComponentItem;
  user?: string;
}
