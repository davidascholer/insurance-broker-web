import type {
  ComponentItem,
  SavedPage,
  SectionContainerType,
  InnerTextType,
  PartnerHeaderType,
  HeaderWithTextType,
  PartnerFooterType,
} from "./export-types";
import type { InternalComponentItem } from "./internal-types";

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

// Convert internal representation to export type ComponentItem
export const internalToExport = (
  item: InternalComponentItem
): ComponentItem => {
  switch (item.type) {
    case "SectionContainer": {
      const component: SectionContainerType = {
        color: (item.props.color as string) || "bg-white",
        children: item.children ? item.children.map(internalToExport) : [],
        className: item.props.className as string | undefined,
        id: item.props.id as string | undefined,
      };
      return {
        name: "SectionContainer",
        component,
      };
    }
    case "InnerText": {
      const component: InnerTextType = {
        content: (item.props.content as string) || "<p>Enter text</p>",
        fontFamily: item.props.fontFamily as string | undefined,
        className: item.props.className as string | undefined,
      };
      return {
        name: "InnerText",
        component,
      };
    }
    case "PartnerHeader": {
      const component: PartnerHeaderType = {
        title: (item.props.title as string) || "Title",
        imgUrl: (item.props.imgUrl as string) || "",
        reviewStars: (item.props.reviewStars as number) || 0,
        reviewCount: (item.props.reviewCount as number) || 0,
        description: (item.props.description as InnerTextType) || {
          content: "<span>Description</span>",
          fontFamily: "nunito-sans",
        },
        className: item.props.className as string | undefined,
      };
      return {
        name: "PartnerHeader",
        component,
      };
    }
    case "HeaderWithText": {
      const component: HeaderWithTextType = {
        headerContent: (item.props.headerContent as string) || "Header",
        description: (item.props.description as InnerTextType) || {
          content: "<p>Description</p>",
          fontFamily: "nunito-sans",
        },
        className: item.props.className as string | undefined,
        headerClassName: item.props.headerClassName as string | undefined,
      };
      return {
        name: "HeaderWithText",
        component,
      };
    }
    case "PartnerFooter": {
      const component: PartnerFooterType = {
        reviewContent: (item.props.reviewContent as InnerTextType) || {
          content: "<span>Footer content</span>",
          fontFamily: "nunito-sans",
        },
        className: item.props.className as string | undefined,
      };
      return {
        name: "PartnerFooter",
        component,
      };
    }
  }
};

// Convert export type ComponentItem to internal representation
export const exportToInternal = (
  item: ComponentItem,
  index: number
): InternalComponentItem => {
  const id = `${item.name}-${Date.now()}-${index}`;

  switch (item.name) {
    case "SectionContainer": {
      const comp = item.component as SectionContainerType;
      return {
        id,
        type: "SectionContainer",
        name: "Section Container",
        props: {
          color: comp.color,
          className: comp.className,
          id: comp.id,
        },
        children: comp.children
          ? comp.children.map((child, idx) => exportToInternal(child, idx))
          : [],
      };
    }
    case "InnerText": {
      const comp = item.component as InnerTextType;
      return {
        id,
        type: "InnerText",
        name: "Inner Text",
        props: {
          content: comp.content,
          fontFamily: comp.fontFamily,
          className: comp.className,
        },
      };
    }
    case "PartnerHeader": {
      const comp = item.component as PartnerHeaderType;
      return {
        id,
        type: "PartnerHeader",
        name: "Partner Header",
        props: {
          title: comp.title,
          imgUrl: comp.imgUrl,
          reviewStars: comp.reviewStars,
          reviewCount: comp.reviewCount,
          description: comp.description,
          className: comp.className,
        },
      };
    }
    case "HeaderWithText": {
      const comp = item.component as HeaderWithTextType;
      return {
        id,
        type: "HeaderWithText",
        name: "Header With Text",
        props: {
          headerContent: comp.headerContent,
          description: comp.description,
          className: comp.className,
          headerClassName: comp.headerClassName,
        },
      };
    }
    case "PartnerFooter": {
      const comp = item.component as PartnerFooterType;
      return {
        id,
        type: "PartnerFooter",
        name: "Partner Footer",
        props: {
          reviewContent: comp.reviewContent,
          className: comp.className,
        },
      };
    }
    default: {
      // This should never happen if types are correct
      throw new Error(`Unknown component type: ${item.name}`);
    }
  }
};

export const convertToSaved = (
  items: InternalComponentItem[]
): SectionContainerType[] => {
  // Convert InternalComponentItem[] to ComponentItem[] then to Section ContainerType[]
  const exported = items.map(internalToExport);
  return exported
    .filter((item) => item.name === "SectionContainer")
    .map((item) => {
      return item.component as SectionContainerType;
    });
};

export const convertFromSaved = (
  saved: SectionContainerType[]
): InternalComponentItem[] => {
  // Convert saved SectionContainerType[] back to ComponentItem[] then to InternalComponentItem[]
  const componentItems: ComponentItem[] = saved.map((sectionContainer) => ({
    name: "SectionContainer" as const,
    component: sectionContainer,
  }));

  return componentItems.map((item, index) => exportToInternal(item, index));
};

export const savePage = (
  pageName: string,
  components: InternalComponentItem[],
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

  const savedComponents: SectionContainerType[] = convertToSaved(components);

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
  const existingPageIndex = existingPages.findIndex((p) => p.name === pageName);
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

export const generateHTML = (components: InternalComponentItem[]): string => {
  return components
    .map((comp) => {
      return `<!-- ${comp.name} -->
<div class="${comp.type}">
  ${JSON.stringify(comp.props, null, 2)}
</div>`;
    })
    .join("\n\n");
};
