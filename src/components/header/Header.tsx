import useWindowWidth from "@/hooks/useWindowWidth";
import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";

interface HeaderProps {
  showFetchButton?: boolean;
}

const Header = ({ showFetchButton = true }: HeaderProps) => {
  const width = useWindowWidth();

  if (width >= 768) {
    return <DesktopHeader showFetchButton={showFetchButton} />;
  }
  return <MobileHeader showFetchButton={showFetchButton} />;
};

export default Header;
