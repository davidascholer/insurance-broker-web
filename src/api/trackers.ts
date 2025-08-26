import { PIPA_ANALYTICS_URL } from "./constants";

export const hitsTracker = async (reqBody: {
  origin: string;
  referrer: string;
}) => {
  // Validate params
  const { origin, referrer } = reqBody;
  if (typeof origin !== "string" || typeof referrer !== "string") {
    return;
  }
  console.log("Calling hitsTracker with params:", origin, referrer);

  const hitResult = await fetch(PIPA_ANALYTICS_URL + "/hits", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // "Access-Control-Allow-Origin": "*", // Not needed for POST requests
    },
    body: JSON.stringify(reqBody),
  });
  console.log("Hit result:", hitResult);
};

export const providerClickedTracker = ({
  id,
  provider,
}: {
  id: string;
  provider: string;
}) => {
  // Validate params
  if (!id || !provider) {
    return;
  }
  // Here you would send the data to your analytics service
  console.log("Provider Clicked Tracker called with params:", id, provider);
};
