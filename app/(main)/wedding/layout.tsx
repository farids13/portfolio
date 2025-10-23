import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: 'Invitation Wedding | Farid Satria & Asri Dilla Wahyuni',
  description: 'Invitation Farid Satria & Asri Dilla Wahyuni Wedding',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#000000'
};

export default function InvitationLayout({children}: {children: React.ReactNode;}) {
  return (
    <main className="h-[100svh]">
      {children}
    </main>
  );
}
