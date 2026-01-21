import PartnerFooter from "../templates/PartnerFooter";
import PartnerHeader from "../templates/PartnerHeader";
import SectionContainer from "../templates/SectionContainer";
import InnerText from "../components/InnerText";
import type {
  ComponentItem,
  PartnerFooterType,
  PartnerHeaderType,
  SectionContainerType,
  InnerTextType,
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
    case "PartnerFooter": {
      const footerProps = item.component as PartnerFooterType;
      return (
        <PartnerFooter
          className={footerProps.className}
          reviewContent={footerProps.reviewContent}
        />
      );
    }
    default:
      return <div>Component not found: {item.name}</div>;
  }
};
export default RenderedComponent;
