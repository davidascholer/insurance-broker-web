import PartnerFooter from "../templates/PartnerFooter";
import PartnerHeader from "../templates/PartnerHeader";
import HeaderWithText from "../templates/HeaderWithText";
import SectionContainer from "../templates/SectionContainer";
import InnerText from "../components/InnerText";
import ContentWithImage from "../templates/ContentWithImage";
import ContentUnorderedList from "../templates/ContentUnorderedList";
import type {
  ComponentItem,
  PartnerFooterType,
  PartnerHeaderType,
  HeaderWithTextType,
  SectionContainerType,
  InnerTextType,
  ContentWithImageType,
  ContentUnorderedListType,
} from "../utils/export-types";

const RenderedComponent = ({ item }: { item: ComponentItem }) => {
  switch (item.name) {
    case "SectionContainer": {
      const containerProps = item.component as SectionContainerType;
      return (
        <SectionContainer
          color={containerProps.color}
          children={containerProps.children}
          className={containerProps.className}
          id={containerProps.id}
        />
      );
    }
    case "InnerText": {
      const textProps = item.component as InnerTextType;
      return (
        <InnerText
          content={textProps.content}
          fontFamily={textProps.fontFamily}
          className={textProps.className}
        />
      );
    }
    case "PartnerHeader": {
      const headerProps = item.component as PartnerHeaderType;
      return (
        <PartnerHeader
          title={headerProps.title}
          imgUrl={headerProps.imgUrl}
          reviewStars={headerProps.reviewStars}
          reviewCount={headerProps.reviewCount}
          description={headerProps.description}
          className={headerProps.className}
        />
      );
    }
    case "HeaderWithText": {
      const headerWithTextProps = item.component as HeaderWithTextType;
      return (
        <HeaderWithText
          headerContent={headerWithTextProps.headerContent}
          description={headerWithTextProps.description}
          className={headerWithTextProps.className}
          headerClassName={headerWithTextProps.headerClassName}
        />
      );
    }
    case "PartnerFooter": {
      const footerProps = item.component as PartnerFooterType;
      return (
        <PartnerFooter
          className={footerProps.className}
          reviewContent={footerProps.reviewContent}
        />
      );
    }
    case "ContentWithImage": {
      const contentWithImageProps = item.component as ContentWithImageType;
      return (
        <ContentWithImage
          heading={contentWithImageProps.heading}
          imageSrc={contentWithImageProps.imageSrc}
          content={contentWithImageProps.content}
          className={contentWithImageProps.className}
          imageClassName={contentWithImageProps.imageClassName}
        />
      );
    }
    case "ContentUnorderedList": {
      const contentUnorderedListProps = item.component as ContentUnorderedListType;
      return (
        <ContentUnorderedList
          listItems={contentUnorderedListProps.listItems}
          className={contentUnorderedListProps.className}
        />
      );
    }
    default:
      return <div>Component not found: {item.name}</div>;
  }
};
export default RenderedComponent;
