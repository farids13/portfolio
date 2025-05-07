import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portfolio Saya',
  description: 'Portfolio profesional Farid',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}