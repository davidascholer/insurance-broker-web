/*
These are RPCs that do not require responses. Just fire and forget.
*/
import type { AnswersType } from "@/lib/types";
import { PIPA_ANALYTICS_URL } from "./constants";

export const providerClickedTracker = (reqBody: {
  insurer: string;
  petObject: AnswersType;
}) => {
  console.log("Calling providerClickedTracker with obj:", reqBody);
  fetch(PIPA_ANALYTICS_URL + "/link-clicked", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reqBody),
  });
};
