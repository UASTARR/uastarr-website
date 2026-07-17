import { NextRequest, NextResponse } from "next/server";

function isWikiHost(host: string) {
  const hostname = host.split(":")[0].toLowerCase();
  return hostname === "wiki.localhost" || hostname.startsWith("wiki.");
}

export function proxy(request: NextRequest) {
  const host = request.headers.get("host") ?? "";

  if (!isWikiHost(host)) {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;

  // Already on the wiki route tree — avoid /wiki/wiki
  if (pathname === "/wiki" || pathname.startsWith("/wiki/")) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = pathname === "/" ? "/wiki" : `/wiki${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
