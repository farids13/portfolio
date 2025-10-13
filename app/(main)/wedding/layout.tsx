import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Invitation Wedding | Farid Satria & Asri Dilla Wahyuni',
  description: 'Invitation Farid Satria & Asri Dilla Wahyuni Wedding',
};

export default function InvitationLayout({children}: {children: React.ReactNode;}) {
  return children;
}
