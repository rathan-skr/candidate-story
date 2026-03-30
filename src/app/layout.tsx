import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "திரு. மு. கவியரசு | Candidate Story",
  description:
    "தமிழ் மக்கள் முன்னேற்ற கழகம் - திருவண்ணாமலை வார்டு 42 வேட்பாளர்",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ta" className="h-full antialiased">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Noto+Sans+Tamil:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
