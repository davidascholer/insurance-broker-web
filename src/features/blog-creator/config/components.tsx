import type { AvailableComponent } from "../utils/types";

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
      children: [],
    },
  },
];

export const availableComponents: AvailableComponent[] = [
  {
    type: "InnerText",
    name: "Inner Text",
    icon: "✍️",
    description: "Rich text with formatting options",
    defaultProps: {
      content: "<span>Enter your text here</span>",
      fontFamily: "nunito-sans",
    },
  },
  {
    type: "PartnerHeader",
    name: "Partner Header",
    icon: "🏢",
    description: "Header with logo, title, and review stars",
    defaultProps: {
      title: "Partner Name",
      imgUrl: "/text_logos/prudent_logo_blue_horz.svg",
      reviewStars: 4.5,
      innerText: {
        content: "<p>Partner description goes here</p>",
        fontFamily: "nunito-sans",
      },
    },
  },
  {
    type: "PartnerFooter",
    name: "Partner Footer",
    icon: "👣",
    description: "Footer with review section and CTA",
    defaultProps: {
      innerText: {
        content: "<p>Review content goes here</p>",
        fontFamily: "nunito-sans",
      },
    },
  },
];
