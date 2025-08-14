import { cn } from "@/lib/utils";
import Loader from "./Loader";
import { Progress } from "./ui/progress";
import { useEffect, useState } from "react";

const LoadingQuotes = ({
  progressTimerSeconds,
}: {
  progressTimerSeconds: number;
}) => {
  const [counter, setCounter] = useState(0);
  const [msgVisible, setMsgVisible] = useState(false);
  const [message, setMessage] = useState(
    "Sifting through the litter to gather your custom pet insurance quotes now..."
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prev) => {
        const next = prev + (100 / (progressTimerSeconds * 2)) * 0.1; // Update every 0.5 seconds
        return next >= 100 ? 100 : next;
      });
    }, 50);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  useEffect(() => {
    if (counter > 5) {
      setMsgVisible(true);
    }
    if (counter >= 30) {
      setMsgVisible(false);
    }
    if (counter >= 35) {
      setMsgVisible(true);
      setMessage(
        "We are YOUR broker.  We don't charge you a single penny, doggone it.  All our services are fur-ree for you to use..."
      );
    }
    if (counter >= 60) {
      setMsgVisible(false);
    }
    if (counter >= 65) {
      setMsgVisible(true);
      setMessage(
        "You're barking up the right tree!  Make sure you ask our AI PIPA Broker anything related to pet insurance.  It's there to help you!"
      );
    }
    if (counter >= 95) {
      setMsgVisible(false);
    }
    if (counter >= 100) {
      setMsgVisible(true);
      setMessage("Almost done... finalizing your pet insurance quotes!");
    }
  }, [counter]);

  return (
    <div
      className={cn(
        "w-full max-w-4xl pb-4 mx-auto flex flex-col gap-20  items-center justify-center h-full"
      )}
    >
      <Progress
        className="w-full h-3"
        indicatorClassName="bg-gradient-to-r from-(--primary-teal-dark) to-(--primary-coral)"
        value={counter}
      />
      <div className="w-full min-h-72 flex items-center justify-center">
        <p
          className={
            "sansita-regular text-(--text-dark) text-4xl text-center px-4 transition-opacity duration-1000 " +
            (msgVisible ? "opacity-100" : "opacity-0")
          }
        >
          {message}
        </p>
      </div>
      <Loader className="size-8" />
    </div>
  );
};
export default LoadingQuotes;
