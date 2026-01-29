// Internal types used within the BlogCreator for easier manipulation
// These will be converted to/from the export types when saving/loading

export interface InternalComponentItem {
  id: string;
  type: "SectionContainer" | "InnerText" | "PartnerHeader" | "PartnerFooter" | "HeaderWithText" | "ContentWithImage" | "ContentUnorderedList";
  name: string;
  props: Record<string, unknown>;
  children?: InternalComponentItem[];
}
