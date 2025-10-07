import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Invitation Wedding Farid Satria & Asri Dilla Wahyuni",
    description:
      "Invitation Wedding Farid Satria & Asri Dilla Wahyuni, a beautiful couple who are going to start their new life together.",
  };

export default function WeddingLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <div>
        {children}
      </div>
    )
  }