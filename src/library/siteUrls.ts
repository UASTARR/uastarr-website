const trimTrailingSlash = (url: string) => url.replace(/\/$/, "");

let siteUrl: string;
let wikiUrl: string;

switch (process.env.NEXT_PUBLIC_VERCEL_ENV) {
  case "production":
    // Production site URL is set in the Vercel environment variables
    // The variable shouldn't contain the protocol
    siteUrl = `https://${process.env.NEXT_PUBLIC_SITE_URL ?? ""}`;
    wikiUrl = `https://wiki.${process.env.NEXT_PUBLIC_SITE_URL ?? ""}`;
    break;
  case "preview":
    siteUrl = `https://${process.env.NEXT_PUBLIC_VERCEL_URL ?? ""}`;
    wikiUrl = `https://wiki.${process.env.NEXT_PUBLIC_VERCEL_URL ?? ""}`;
    break;
  default:
    siteUrl = "http://localhost:3000";
    wikiUrl = "http://wiki.localhost:3000";
    break;
}

export function mainHref(path: string) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return siteUrl ? `${siteUrl}${normalized}` : normalized;
}

/** Absolute href to the wiki subdomain */
export function wikiHref(path = "/") {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (wikiUrl) {
    return normalized === "/" ? wikiUrl : `${wikiUrl}${normalized}`;
  }
  return normalized === "/" ? "/wiki" : `/wiki${normalized}`;
}
