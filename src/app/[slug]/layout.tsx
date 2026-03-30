import type { Metadata } from "next";

import { getAllSlugs, getCandidateBySlug } from "@/data/candidates";

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const candidate = getCandidateBySlug(slug);
  if (!candidate) return {};

  return {
    title: `${candidate.name} | ${candidate.party} — ${candidate.constituency}`,
    description: candidate.tagline,
  };
}

export default function CandidateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
