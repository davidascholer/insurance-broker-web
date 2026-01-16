import PartnerFooter from "../templates/PartnerFooter";
import PartnerHeader from "../templates/PartnerHeader";
import type { PartnerFooterProps, PartnerHeaderProps } from "../utils/types";
import ContentText from "./ContentText";

const RenderedComponent = ({ item }: { item: { type: string; props: PartnerHeaderProps | PartnerFooterProps } }) => {
  switch (item.type) {
    case "PartnerHeader": {
      const headerProps = item.props as PartnerHeaderProps;
      return (
        <PartnerHeader
          title={headerProps.title}
          imgUrl={headerProps.imgUrl}
          reviewStars={headerProps.reviewStars}
        >
          {headerProps.children &&
            <ContentText
              content={headerProps.children.content}
              fontFamily={headerProps.children.fontFamily}
              className={headerProps.children.className}
            />
          }
        </PartnerHeader>
      );
    }
    case "PartnerFooter": {
      const footerProps = item.props as PartnerFooterProps;
      return (
        <PartnerFooter className={footerProps.className}>
          {/* <ContentText content={footerProps.children.content} fontFamily={footerProps.children.fontFamily} className={footerProps.children.className} /> */}
          {footerProps.children}
        </PartnerFooter>
      );
    }
    // Add more cases as needed for other component types
    default:
      return item.type;
  }
};
export default RenderedComponent;
