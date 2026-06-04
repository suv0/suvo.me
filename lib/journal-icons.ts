/** Material Symbol name for an experience company row. */
export function getExperienceCompanyIcon(company: string): string {
  if (company.startsWith("Chaldal")) return "storefront";
  if (company === "Dwetech") return "hub";
  return "corporate_fare";
}

/** Material Symbol for outbound project / store links. */
export function getProjectLinkIcon(label: string, href: string): string {
  const text = `${label} ${href}`.toLowerCase();
  if (text.includes("github")) return "code";
  if (text.includes("app store") || text.includes("apps.apple")) return "phone_iphone";
  if (text.includes("play") || text.includes("android")) return "shop";
  if (text.includes("press") || text.includes("mention") || text.includes("article") || text.includes("read "))
    return "newspaper";
  return "arrow_outward";
}
