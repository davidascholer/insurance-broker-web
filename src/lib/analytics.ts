import ReactGA from "react-ga4";

/**
 * Send a pageview event to Google Analytics with UTM parameters
 */
export const sendPageview = (page: string, title: string) => {
  const searchParams = new URLSearchParams(window.location.search);
  
  // Extract all UTM parameters
  const utmSource = searchParams.get("utm_source");
  const utmMedium = searchParams.get("utm_medium");
  const utmCampaign = searchParams.get("utm_campaign");
  const utmTerm = searchParams.get("utm_term");
  const utmContent = searchParams.get("utm_content");
  const gclid = searchParams.get("gclid"); // Google Ads click ID
  const fbclid = searchParams.get("fbclid"); // Facebook click ID

  // Build the parameters object for Google Analytics
  const gaParameters: Record<string, string | number> = {
    page_title: title,
    page_location: window.location.href,
  };

  // Add UTM parameters if they exist
  if (utmSource) gaParameters.utm_source = utmSource;
  if (utmMedium) gaParameters.utm_medium = utmMedium;
  if (utmCampaign) gaParameters.utm_campaign = utmCampaign;
  if (utmTerm) gaParameters.utm_term = utmTerm;
  if (utmContent) gaParameters.utm_content = utmContent;
  if (gclid) gaParameters.gclid = gclid;
  if (fbclid) gaParameters.fbclid = fbclid;

  // Send the pageview event to Google Analytics
  ReactGA.send({
    hitType: "pageview",
    page,
    title,
    ...gaParameters
  });

  // Send a custom event for traffic source tracking
  if (utmSource || gclid || fbclid) {
    const source = utmSource || (gclid ? "google_ads" : "facebook");
    ReactGA.event({
      category: "traffic_source",
      action: "pageview_with_source", 
      label: source,
      value: 1,
    });
  }

  // Log for debugging (remove in production)
  if (utmSource || utmMedium || utmCampaign) {
    console.log("GA4 Pageview sent with UTM parameters:", {
      page,
      title,
      utm_source: utmSource,
      utm_medium: utmMedium, 
      utm_campaign: utmCampaign,
    });
  }
};

/**
 * Send a custom event to Google Analytics
 */
export const sendEvent = (category: string, action: string, label?: string, value?: number) => {
  ReactGA.event({
    category,
    action,
    label,
    value,
  });
};
