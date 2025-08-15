import { useState, useEffect } from "react";

function useScrollYPos({ scrollContainerRef }: { scrollContainerRef: React.RefObject<HTMLElement> }) {
  // Initialize state with current window dimensions
  const [scrollYPosition, setScrollYPosition] = useState(0);

  const handleScroll = () => {
      setScrollYPosition(scrollContainerRef.current.scrollTop);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty dependency array means this effect runs once on mount and cleans up on unmount

  return scrollYPosition;
}

export default useScrollYPos;
