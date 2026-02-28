import type { ComponentItem } from "@/features/blog-creator/utils/export-types";
import type { BlogCard, CreateBlogData, UpdateBlogData } from "./types";

// Validation helpers
const validateBlogCard = (card: unknown): card is BlogCard => {
  if (!card || typeof card !== "object") return false;
  const cardObj = card as Record<string, unknown>;
  if (typeof cardObj.title !== "string" || !cardObj.title.trim()) return false;
  if (typeof cardObj.description !== "string" || !cardObj.description.trim())
    return false;
  if (typeof cardObj.date !== "string" || !cardObj.date.trim()) return false;
  if (!Array.isArray(cardObj.imageURLs)) return false;
  if (!cardObj.imageURLs.every((url: unknown) => typeof url === "string"))
    return false;
  if (!Array.isArray(cardObj.labels)) return false;
  if (!cardObj.labels.every((label: unknown) => typeof label === "string"))
    return false;
  return true;
};

const validateComponents = (
  components: unknown,
): components is ComponentItem[] => {
  if (!Array.isArray(components)) return false;
  return components.every((comp: unknown) => {
    return comp && typeof comp === "object" && "children" in comp;
  });
};

export const validateCreateBlogData = (
  data: unknown,
): data is CreateBlogData => {
  if (!data || typeof data !== "object") return false;
  const dataObj = data as Record<string, unknown>;
  if (typeof dataObj.name !== "string" || !dataObj.name.trim()) return false;
  if (typeof dataObj.user !== "string" || !dataObj.user.trim()) return false;
  if (!validateBlogCard(dataObj.card)) return false;
  if (!validateComponents(dataObj.components)) return false;
  return true;
};

export const validateUpdateBlogData = (
  data: unknown,
): data is UpdateBlogData => {
  if (!data || typeof data !== "object") return false;
  const dataObj = data as Record<string, unknown>;
  if (dataObj.card && !validateBlogCard(dataObj.card)) return false;
  if (dataObj.components && !validateComponents(dataObj.components))
    return false;
  if (
    dataObj.user &&
    (typeof dataObj.user !== "string" || !dataObj.user.trim())
  )
    return false;
  return true;
};

/**
 * Maps a US ZIP code to its state abbreviation using accurate USPS ranges.
 * @param zip - 5-digit ZIP code as a string
 * @returns Two-letter state abbreviation or "Unknown" if not found
 */
export const zipToState = (zip: string): string => {
  if (!zip || zip.length < 3) return "Unknown";

  const zipPrefix = parseInt(zip.substring(0, 3));

  // Comprehensive ZIP code prefix ranges by state (USPS official ranges)
  if (zipPrefix >= 350 && zipPrefix <= 369) return "AL";
  if (zipPrefix >= 995 && zipPrefix <= 999) return "AK";
  if (zipPrefix >= 850 && zipPrefix <= 865) return "AZ";
  if (zipPrefix >= 716 && zipPrefix <= 729) return "AR";
  if (zipPrefix >= 900 && zipPrefix <= 961) return "CA";
  if (zipPrefix >= 800 && zipPrefix <= 816) return "CO";
  if (zipPrefix >= 60 && zipPrefix <= 69) return "CT";
  if (zipPrefix >= 197 && zipPrefix <= 199) return "DE";
  if (zipPrefix >= 200 && zipPrefix <= 205) return "DC";
  if (zipPrefix >= 320 && zipPrefix <= 349) return "FL";
  if (zipPrefix >= 300 && zipPrefix <= 319) return "GA";
  if (zipPrefix >= 967 && zipPrefix <= 968) return "HI";
  if (zipPrefix >= 832 && zipPrefix <= 838) return "ID";
  if (zipPrefix >= 600 && zipPrefix <= 629) return "IL";
  if (zipPrefix >= 460 && zipPrefix <= 479) return "IN";
  if (zipPrefix >= 500 && zipPrefix <= 528) return "IA";
  if (zipPrefix >= 660 && zipPrefix <= 679) return "KS";
  if (zipPrefix >= 400 && zipPrefix <= 427) return "KY";
  if (zipPrefix >= 700 && zipPrefix <= 714) return "LA";
  if (zipPrefix >= 39 && zipPrefix <= 49) return "ME";
  if (zipPrefix >= 206 && zipPrefix <= 219) return "MD";
  if (zipPrefix >= 10 && zipPrefix <= 27) return "MA";
  if (zipPrefix >= 480 && zipPrefix <= 499) return "MI";
  if (zipPrefix >= 550 && zipPrefix <= 567) return "MN";
  if (zipPrefix >= 386 && zipPrefix <= 397) return "MS";
  if (zipPrefix >= 630 && zipPrefix <= 658) return "MO";
  if (zipPrefix >= 590 && zipPrefix <= 599) return "MT";
  if (zipPrefix >= 680 && zipPrefix <= 693) return "NE";
  if (zipPrefix >= 889 && zipPrefix <= 898) return "NV";
  if (zipPrefix >= 30 && zipPrefix <= 38) return "NH";
  if (zipPrefix >= 70 && zipPrefix <= 89) return "NJ";
  if (zipPrefix >= 870 && zipPrefix <= 884) return "NM";
  if (zipPrefix >= 100 && zipPrefix <= 149) return "NY";
  if (zipPrefix >= 270 && zipPrefix <= 289) return "NC";
  if (zipPrefix >= 580 && zipPrefix <= 588) return "ND";
  if (zipPrefix >= 430 && zipPrefix <= 459) return "OH";
  if (zipPrefix >= 730 && zipPrefix <= 749) return "OK";
  if (zipPrefix >= 970 && zipPrefix <= 979) return "OR";
  if (zipPrefix >= 150 && zipPrefix <= 196) return "PA";
  if (zipPrefix >= 28 && zipPrefix <= 29) return "RI";
  if (zipPrefix >= 290 && zipPrefix <= 299) return "SC";
  if (zipPrefix >= 570 && zipPrefix <= 577) return "SD";
  if (zipPrefix >= 370 && zipPrefix <= 385) return "TN";
  if (
    (zipPrefix >= 750 && zipPrefix <= 799) ||
    (zipPrefix >= 885 && zipPrefix <= 888)
  )
    return "TX";
  if (zipPrefix >= 840 && zipPrefix <= 847) return "UT";
  if (zipPrefix >= 50 && zipPrefix <= 59) return "VT";
  if (zipPrefix >= 220 && zipPrefix <= 246) return "VA";
  if (zipPrefix >= 980 && zipPrefix <= 994) return "WA";
  if (zipPrefix >= 247 && zipPrefix <= 268) return "WV";
  if (zipPrefix >= 530 && zipPrefix <= 549) return "WI";
  if (zipPrefix >= 820 && zipPrefix <= 831) return "WY";

  return "Unknown";
};
