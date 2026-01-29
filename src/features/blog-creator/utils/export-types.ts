export interface ComponentItem {
  name:
    | "PartnerHeader"
    | "PartnerFooter"
    | "SectionContainer"
    | "HorizontalAnchorList"
    | "HeaderWithText"
    | "ContentWithImage"
    | "ContentUnorderedList"
    | "ContentImageList"
    | "ContentText"
    | "InnerText";
  component:
    | SectionContainerType
    | InnerTextType
    | PartnerHeaderType
    | PartnerFooterType
    | HeaderWithTextType
    | ContentWithImageType
    | ContentUnorderedListType
    | Record<string, unknown>;
}

export type SectionContainerType = {
  color: string;
  children: ComponentItem[];
  className?: string;
  id?: string; // Optional id for anchor linking
};

export type InnerTextType = {
  content: string;
  fontFamily?: string;
  className?: string;
};

export interface PartnerHeaderType {
  title: string;
  imgUrl: string;
  reviewStars: number;
  reviewCount: number;
  description: InnerTextType;
  className?: string;
}

export interface PartnerFooterType {
  reviewContent: InnerTextType;
  className?: string;
}

export interface HeaderWithTextType {
  headerContent: string;
  description: InnerTextType;
  className?: string;
  headerClassName?: string;
}

export interface ContentWithImageType {
  heading: string;
  imageSrc: string;
  content: InnerTextType;
  className?: string;
  imageClassName?: string;
}

export interface ContentUnorderedListType {
  listItems: InnerTextType[];
  className?: string;
}

export type SavedPage = {
  name: string;
  components: SectionContainerType[];
  timestamp: Date;
  card: {
    title: string;
    description: string;
    date: string;
    imageUrl: string;
    labels: string[];
  };
};
