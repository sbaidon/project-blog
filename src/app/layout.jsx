import {
  BLOG_TITLE,
  BLOG_DESCRIPTION,
} from "@/constants";


export const metadata = {
  title: BLOG_TITLE,
  description: BLOG_DESCRIPTION,
};

function RootLayout({ children }) {
  return children
}

export default RootLayout;
