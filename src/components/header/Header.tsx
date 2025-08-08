import useWindowWidth from "@/hooks/useWindowWidth";
import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";

interface HeaderProps {
  showFetchButton?: boolean;
  showChatBot?: boolean;
}

const Header = ({ showFetchButton = true, showChatBot = false }: HeaderProps) => {
  const width = useWindowWidth();

  if (width >= 768) {
    return <DesktopHeader showFetchButton={showFetchButton} showChatBot={showChatBot} />;
  }
  return <MobileHeader showFetchButton={showFetchButton} showChatBot={showChatBot} />;
};

export default Header;
