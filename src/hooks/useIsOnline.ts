import { useState, useEffect } from "react";

// Assume that the client is online. If it returns that they are still not online after 5 seconds, return false;
const useIsOnline = (maxSeconds: number = 5) => {
  const [isOnline, setIsOnline] = useState<boolean>(true);

  useEffect(() => {
    if (navigator.onLine) return;

    let count = 0;
    const intervalId = setInterval(() => {
      // If the seconds limit is exceeded, return false;
      if (count === maxSeconds) {
        setIsOnline(false);
        clearInterval(intervalId);
      }

      // If the client is online, clear the interval and return;
      if (navigator.onLine) {
        clearInterval(intervalId);
      }

      // Otherwise, increase the count
      count++;
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return isOnline;
};

export default useIsOnline;
