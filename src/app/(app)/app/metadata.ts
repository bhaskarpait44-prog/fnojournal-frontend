import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
  robots: {
    index: false,
    follow: false,
  },
};

export default function Sitemap() {
  return null; // This file is just for metadata export in this route group
}
