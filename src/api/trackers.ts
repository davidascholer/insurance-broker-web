/*
These are RPCs that do not require responses. Just fire and forget.
*/
import type { AnswersType } from "@/lib/types";
import { PIPA_ANALYTICS_URL } from "./constants";

export const hitsTracker = (reqBody: { origin: string; referrer: string }) => {
  // Validate params
  const { origin, referrer } = reqBody;
  if (typeof origin !== "string" || typeof referrer !== "string") {
    return;
  }
  fetch(PIPA_ANALYTICS_URL + "/hits", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // "Access-Control-Allow-Origin": "*", // Not needed for POST requests
    },
    body: JSON.stringify(reqBody),
  });
};

/**
 * Sends the pet object to the server with an id and the user's information
 * The id does not have to be unique, just a way to reference a current user session.
 * @param id
 * @param petObject
 * @returns
 */
export const userPetTracker = async (reqBody: {
  id: string;
  petObject: AnswersType;
}) => {
  // Validate params
  console.log("Calling userPetTracker with obj:", reqBody);

  const userPetTrackerResult = await fetch(
    PIPA_ANALYTICS_URL + "/form-submitted",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody),
    }
  );
  console.log("userPetTrackerResult result:", userPetTrackerResult);
};

export const providerClickedTracker = (reqBody: { insurer: string; petObject: AnswersType }) => {

  console.log("Calling providerClickedTracker with obj:", reqBody);
  fetch(PIPA_ANALYTICS_URL + "/link-clicked", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reqBody),
  });
};
