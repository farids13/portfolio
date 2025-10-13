import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '3D Demo | Wedding',
  description: '3D Demo for Wedding Page',
};

export default function ThreeDDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-full">
      {children}
    </div>
  );
}
