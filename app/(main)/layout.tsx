import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Farid Satria',
  description: 'Full Stack Developer',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}