import { NextRequest, NextResponse } from "next/server";

const SUBDOMAINS = ["wiki", "blogs"] as const;

function subdomainFromHost(host: string): (typeof SUBDOMAINS)[number] | null {
  const hostname = host.split(":")[0].toLowerCase();
  for (const sub of SUBDOMAINS) {
    if (hostname === `${sub}.localhost` || hostname.startsWith(`${sub}.`)) {
      return sub;
    }
  }
  return null;
}

export function proxy(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  const subdomain = subdomainFromHost(host);

  if (!subdomain) {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;

  // Already on the subdomain route tree — avoid /wiki/wiki, /blogs/blogs, etc.
  if (pathname === `/${subdomain}` || pathname.startsWith(`/${subdomain}/`)) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = pathname === "/" ? `/${subdomain}` : `/${subdomain}${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
