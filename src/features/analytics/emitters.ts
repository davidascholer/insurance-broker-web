/**
 * This file is a controller for analytics-related emitters.
 */

declare global {
  interface Window {
    dataLayer: unknown[];
  }
}

import type {
  InsurerLinkTrackingInfo,
  AnswersType as PetType,
} from "@/lib/types";

export const registerQuoteLinkClick = ({
  insurer,
  petObject,
}: {
  insurer: InsurerLinkTrackingInfo;
  petObject: PetType;
}) => {
  // Validate the params
  if (
    !petObject.age?.value ||
    !petObject.animal ||
    !petObject.breed ||
    !petObject.email ||
    !petObject.weight ||
    !petObject.zip ||
    !insurer.name ||
    !insurer.deductible ||
    !insurer.reimbursement ||
    !insurer.coverageLimit ||
    !insurer.monthlyPrice
  ) {
    console.error(
      "Insurer or pet objects are incomplete or invalid:",
      insurer,
      petObject
    );
    return;
  }

  // Push event to dataLayer for Google Tag Manager
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "fetch_quote_submit",
    userEmail: petObject.email,
    petAgeDays: petObject.age.value,
    petType: petObject.animal,
    petBreed: petObject.breed,
    petWeightLbs: petObject.weight,
    userZipCode: petObject.zip,
    insurerClicked: insurer,
  });

  console.log("Quote link clicked:", { insurer, petObject });
};
