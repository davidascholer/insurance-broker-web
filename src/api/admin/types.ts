// Types
export interface BlogCard {
  title: string;
  description: string;
  date: string;
  imageURLs: string[];
  labels: string[];
}

export interface BlogComponent {
  children: unknown;
  [key: string]: unknown;
}

export interface BlogData {
  card: BlogCard;
  components: BlogComponent[];
  name: string;
  user: string;
  createdAt?: string;
  updatedAt?: string;
  isPublished: boolean;
}

export interface CreateBlogData {
  card: BlogCard;
  components: BlogComponent[];
  name: string;
  user: string;
  isPublished: boolean;
}

export interface UpdateBlogData {
  card?: BlogCard;
  components?: BlogComponent[];
  user?: string;
}
