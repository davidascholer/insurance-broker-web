import type { ComponentItem, SavedComponentType, SavedPage } from "../types";

export const validatePageName = (name: string): boolean => {
  // Must start with uppercase letter and contain only alphanumeric characters
  const regex = /^[A-Z][a-zA-Z0-9]*$/;
  return regex.test(name);
};

export const validateBlogMetadata = (
  blogTitle: string,
  blogDescription: string,
  blogDate: string,
  blogImageUrl: string,
  blogLabels: string[]
): boolean => {
  return !!(
    blogTitle.trim() &&
    blogDescription.trim() &&
    blogDate &&
    blogImageUrl.trim() &&
    blogLabels.length > 0
  );
};

export const convertToSaved = (items: ComponentItem[]): SavedComponentType[] => {
  return items.map((component) => ({
    name: component.name,
    props: component.props,
    ...(component.children && {
      children: convertToSaved(
        component.children
      ) as unknown as SavedComponentType,
    }),
  }));
};

export const convertFromSaved = (
  saved: SavedComponentType[]
): ComponentItem[] => {
  return saved.map((item, index) => ({
    id: `${item.name}-${Date.now()}-${index}`,
    type: item.name,
    name: item.name,
    props: item.props,
    ...(item.children &&
      typeof item.children === "object" &&
      !Array.isArray(item.children) && {
        children: convertFromSaved([item.children]),
      }),
    ...(Array.isArray(item.children) && {
      children: convertFromSaved(item.children),
    }),
  }));
};

export const savePage = (
  pageName: string,
  components: ComponentItem[],
  blogTitle: string,
  blogDescription: string,
  blogDate: string,
  blogImageUrl: string,
  blogLabels: string[]
): { success: boolean; message: string } => {
  if (!pageName) {
    return { success: false, message: "Please enter a page name" };
  }

  if (!validatePageName(pageName)) {
    return {
      success: false,
      message:
        "Page name must start with an uppercase letter and contain only alphanumeric characters (no spaces or special characters)",
    };
  }

  if (components.length === 0) {
    return { success: false, message: "Cannot save an empty page" };
  }

  const savedComponents: SavedComponentType[] = convertToSaved(components);

  const newPage: SavedPage = {
    name: pageName,
    components: savedComponents,
    timestamp: new Date(),
    card: {
      title: blogTitle,
      description: blogDescription,
      date: blogDate,
      imageUrl: blogImageUrl,
      labels: blogLabels,
    },
  };

  // Get existing pages from localStorage
  const existingPagesJson = localStorage.getItem("pages");
  const existingPages: SavedPage[] = existingPagesJson
    ? JSON.parse(existingPagesJson)
    : [];

  // Check if page name already exists
  const existingPageIndex = existingPages.findIndex(
    (p) => p.name === pageName
  );
  if (existingPageIndex >= 0) {
    existingPages[existingPageIndex] = newPage;
  } else {
    existingPages.push(newPage);
  }

  // Save to localStorage
  localStorage.setItem("pages", JSON.stringify(existingPages));

  return {
    success: true,
    message: `Page "${pageName}" saved successfully!`,
  };
};

export const generateHTML = (components: ComponentItem[]): string => {
  return components
    .map((comp) => {
      return `<!-- ${comp.name} -->
<div class="${comp.type}">
  ${JSON.stringify(comp.props, null, 2)}
</div>`;
    })
    .join("\n\n");
};
