import { useState, useEffect } from "react";

function useWindowSize() {
  // Initialize state with current window dimensions
  const [windowSize, setWindowSize] = useState<{
    width: number | undefined;
    height: number | undefined;
  }>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // Handler to update window size state
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler once to set initial size
    handleResize();

    // Clean up by removing event listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty dependency array ensures effect runs only once on mount

  return windowSize;
}

export default useWindowSize;
