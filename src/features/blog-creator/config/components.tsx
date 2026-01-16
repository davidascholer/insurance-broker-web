import SectionContainer from "../templates/SectionContainer";
import PartnerHeader from "../templates/PartnerHeader";
import HorizontalAnchorList from "../components/HorizontalAnchorList";
import ContentWithHeading from "../templates/ContentWithHeading";
import ContentWithImage from "../templates/ContentWithImage";
import ContentUnorderedList from "../templates/ContentUnorderedList";
import ContentImageList from "../templates/ContentImageList";
import ContentText from "../components/ContentText";
import PartnerFooter from "../templates/PartnerFooter";
import type { AvailableComponent } from "../types";

export const ALL_LABELS = [
  "Basics",
  "Coverage",
  "Costs",
  "Comparison",
  "Exclusions",
  "Claims",
  "Benefits",
  "Pet Health",
  "Types",
  "Terminology",
];

export const sectionContainerComponents: AvailableComponent[] = [
  {
    type: "SectionContainer",
    name: "Section Container",
    icon: "📦",
    description: "A container for grouping content with scroll behavior",
    defaultProps: {
      color: "bg-white",
      id: "section-1",
      children: "Section content goes here",
    },
  },
];

export const availableComponents: AvailableComponent[] = [
  {
    type: "PartnerHeader",
    name: "Partner Header",
    icon: "🏢",
    description: "Header with logo, title, and review stars",
    defaultProps: {
      title: "Partner Name",
      imgUrl: "/backgrounds/cats_dogs_photo_3x2.webp",
      reviewStars: 4.5,
      children: "Partner description goes here",
    },
  },
  {
    type: "HorizontalAnchorList",
    name: "Anchor Navigation",
    icon: "🔗",
    description: "Horizontal scrolling navigation with anchors",
    defaultProps: {
      anchors: [
        { id: "section-1", label: "SECTION 1" },
        { id: "section-2", label: "SECTION 2" },
      ],
    },
  },
  {
    type: "ContentWithHeading",
    name: "Content with Heading",
    icon: "📝",
    description: "Text content with a heading",
    defaultProps: {
      heading: "Heading Text",
      children: "Content goes here",
    },
  },
  {
    type: "ContentWithImage",
    name: "Content with Image",
    icon: "🖼️",
    description: "Content with an icon/image beside it",
    defaultProps: {
      heading: "Image Content",
      imageSrc: "/pages/partner/prudentpet/coverage.svg",
      children: "Description text",
    },
  },
  {
    type: "ContentUnorderedList",
    name: "Unordered List",
    icon: "📋",
    description: "Bulleted list of items",
    defaultProps: {
      children: (
        <>
          <li>List item 1</li>
          <li>List item 2</li>
          <li>List item 3</li>
        </>
      ),
    },
  },
  {
    type: "ContentImageList",
    name: "Image List",
    icon: "🎨",
    description: "Horizontal list with images",
    defaultProps: {
      imageListItems: [
        {
          imageUrl: "/pages/partner/prudentpet/pet_insurance.svg",
          imageAlt: "Image 1",
          children: {
            type: "ContentText",
            props: {
              content: "Item description 1",
              fontFamily: "nunito-sans",
            },
          },
        },
        {
          imageUrl: "/pages/partner/prudentpet/pet_insurance.svg",
          imageAlt: "Image 2",
          children: {
            type: "ContentText",
            props: {
              content: "Item description 2",
              fontFamily: "nunito-sans",
            },
          },
        },
      ],
    },
  },
  {
    type: "ContentText",
    name: "Content Text",
    icon: "✍️",
    description: "Rich text with formatting options",
    defaultProps: {
      content: "Enter your text here",
      fontFamily: "nunito-sans",
    },
  },
  {
    type: "PartnerFooter",
    name: "Partner Footer",
    icon: "👣",
    description: "Footer with review section and CTA",
    defaultProps: {
      children: "Review content goes here",
    },
  },
];

export const componentMap: Record<
  string,
  React.ComponentType<{
    [key: string]: unknown;
    children?: React.ReactNode;
  }>
> = {
  SectionContainer: SectionContainer as unknown as React.ComponentType<{
    [key: string]: unknown;
    children?: React.ReactNode;
  }>,
  PartnerHeader: PartnerHeader as unknown as React.ComponentType<{
    [key: string]: unknown;
    children?: React.ReactNode;
  }>,
  HorizontalAnchorList: HorizontalAnchorList as unknown as React.ComponentType<{
    [key: string]: unknown;
    children?: React.ReactNode;
  }>,
  ContentWithHeading: ContentWithHeading as unknown as React.ComponentType<{
    [key: string]: unknown;
    children?: React.ReactNode;
  }>,
  ContentWithImage: ContentWithImage as unknown as React.ComponentType<{
    [key: string]: unknown;
    children?: React.ReactNode;
  }>,
  ContentUnorderedList: ContentUnorderedList as unknown as React.ComponentType<{
    [key: string]: unknown;
    children?: React.ReactNode;
  }>,
  ContentImageList: ContentImageList as unknown as React.ComponentType<{
    [key: string]: unknown;
    children?: React.ReactNode;
  }>,
  ContentText: ContentText as unknown as React.ComponentType<{
    [key: string]: unknown;
    children?: React.ReactNode;
  }>,
  PartnerFooter: PartnerFooter as unknown as React.ComponentType<{
    [key: string]: unknown;
    children?: React.ReactNode;
  }>,
};
