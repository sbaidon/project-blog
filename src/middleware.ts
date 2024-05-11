import createMiddleware from "next-intl/middleware";
import { tracer, Spans } from "./helpers/trace-helpers";
import { NextRequest } from "next/server";

const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales: ["en", "es"],

  // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
  defaultLocale: "es",
});

export default function middleware(request: NextRequest) {
  const span = tracer.startSpan(Spans.IntlMiddleware);

  const response = intlMiddleware(request);
  span.end();
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/",
    "/(es|en)/:path*",
    "/((?!api|_next/static|_next/image|favicon.ico|rss.xml|site.webmanifest|apple-touch-icon.png).*)",
  ],
};
