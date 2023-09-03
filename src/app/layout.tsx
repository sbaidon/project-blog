import { Metadata } from "next";

export const metadata: Metadata = {
  icons: {
    icon: ["/favicon.ico?v=4"],
    apple: ["/apple-touch-icon.png?v=4"],
    shortcut: ["/apple-touch-icon.png"],
  },
  manifest: "/site.webmanifest",
};

function RootLayout({ children }) {
  return children;
}

export default RootLayout;
