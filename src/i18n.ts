import { getRequestConfig } from "next-intl/server";
import { LOCALES_SET } from "./constants";
import { notFound } from "next/navigation";

export default getRequestConfig(async ({ locale }) => {
  if (!LOCALES_SET.has(locale)) {
    return notFound();
  }

  return {
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
