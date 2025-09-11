import ReactGA from "react-ga4";

/**
 * Send a pageview event to Google Analytics with UTM parameters
 */
export const sendPageview = (page: string, title: string, location?: Location) => {
  const searchParams = location ? new URLSearchParams(location.search) : new URLSearchParams(window.location.search);
  
  // Extract all UTM parameters
  const utmSource = searchParams.get("utm_source");
  const utmMedium = searchParams.get("utm_medium");
  const utmCampaign = searchParams.get("utm_campaign");
  const utmTerm = searchParams.get("utm_term");
  const utmContent = searchParams.get("utm_content");
  const gclid = searchParams.get("gclid"); // Google Ads click ID
  const fbclid = searchParams.get("fbclid"); // Facebook click ID

  // Build the parameters object
  const parameters: Record<string, string> = {
    page_title: title,
    page_location: window.location.href,
  };

  // Add UTM parameters if they exist
  if (utmSource) parameters.utm_source = utmSource;
  if (utmMedium) parameters.utm_medium = utmMedium;
  if (utmCampaign) parameters.utm_campaign = utmCampaign;
  if (utmTerm) parameters.utm_term = utmTerm;
  if (utmContent) parameters.utm_content = utmContent;
  if (gclid) parameters.gclid = gclid;
  if (fbclid) parameters.fbclid = fbclid;

  // Send the pageview event
  ReactGA.send({
    hitType: "pageview",
    page,
    title,
    ...parameters
  });

  // Also send as a custom event for better tracking
  if (utmSource || gclid || fbclid) {
    ReactGA.event({
      category: "traffic_source",
      action: "pageview_with_source",
      label: utmSource || (gclid ? "google_ads" : "facebook"),
      ...parameters
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
