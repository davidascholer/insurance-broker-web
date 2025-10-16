/**
 * This file is a controller for analytics-related emitters.
 */

declare global {
  interface Window {
    dataLayer: unknown[];
  }
}

import { DEV } from "@/lib/constants";
import type {
  InsurerLinkTrackingInfo,
  AnswersType as PetInfoType,
} from "@/lib/types";

export const registerQuoteLinkClick = ({
  insurer,
  petObject,
}: {
  insurer: InsurerLinkTrackingInfo;
  petObject: PetInfoType;
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
    !insurer.deductibleOption ||
    !insurer.reimbursementPercentageOption ||
    !insurer.reimbursementLimitOption ||
    !insurer.monthlyPrice
  ) {
    console.error(
      "Insurer or pet objects are incomplete or invalid in registerPetFormCompleted:",
      insurer,
      petObject
    );
    return;
  }

  // Push event to dataLayer for Google Tag Manager
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "insurer_quote_click",
    userEmail: petObject.email,
    petAgeDays: petObject.age.value,
    petType: petObject.animal,
    petBreed: petObject.breed,
    petWeightLbs: petObject.weight,
    userZipCode: petObject.zip,
    insurerClicked: insurer,
  });

  if (DEV) console.log("Quote link clicked:", { insurer, petObject });
};

export const registerPetFormCompleted = ({
  petObject,
}: {
  petObject: PetInfoType;
}) => {
  // Validate the params
  if (
    !petObject.name ||
    !petObject.email ||
    !petObject.zip ||
    !petObject.petName ||
    !petObject.animal ||
    !petObject.gender ||
    !petObject.age?.value ||
    !petObject.breed ||
    !petObject.weight ||
    !petObject.reference
  ) {
    console.error(
      "Pet objects incomplete or invalid in registerPetFormCompleted:",
      petObject
    );
    return;
  }

  // Push event to dataLayer for Google Tag Manager
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "pet_form_submit",
    userName: petObject.name,
    userEmail: petObject.email,
    userZipCode: petObject.zip,
    petName: petObject.petName,
    petType: petObject.animal,
    petGender: petObject.gender,
    petAgeDays: petObject.age.value,
    petBreed: petObject.breed,
    petWeightLbs: petObject.weight,
    referralSource: petObject.reference,
  });

  if (DEV) console.log("Pet form submitted:", { petObject });
};

export const registerBotMessage = ({
  email,
  message,
  botResponseSuccess,
}: {
  email: string;
  message: string;
  botResponseSuccess: boolean;
}) => {
  // Validate the params
  if (!email || !message || typeof botResponseSuccess !== "boolean") {
    console.error("Incomplete or invalid parameters in registerBotMessage:", {
      email,
      message,
      botResponseSuccess,
    });
    return;
  }

  // Push event to dataLayer for Google Tag Manager
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "bot_message_submit",
    userEmail: email,
    botMessage: message,
    botResponseSuccess,
  });

  if (DEV)
    console.log("Bot message submitted:", {
      email,
      message,
      botResponseSuccess,
    });
};
