import { createSharedPathnamesNavigation } from "next-intl/navigation";

export const locales = ["en", "es"] as const;
export const localePrefix = "always"; // Default

export type Locales = typeof locales;

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales, localePrefix });
