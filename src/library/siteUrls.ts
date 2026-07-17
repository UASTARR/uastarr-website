const trimTrailingSlash = (url: string) => url.replace(/\/$/, "");

/** Main site origin, e.g. http://localhost:3000 or https://uastarr.ca */
export const siteUrl = trimTrailingSlash(process.env.NEXT_PUBLIC_SITE_URL ?? "");

/** Wiki subdomain origin, e.g. http://wiki.localhost:3000 or https://wiki.uastarr.ca */
export const wikiUrl = trimTrailingSlash(process.env.NEXT_PUBLIC_WIKI_URL ?? "");

/** Absolute (or relative) href onto the main site — needed when the navbar is shown on wiki.* */
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
