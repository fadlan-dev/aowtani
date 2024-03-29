import RootStyleRegistry from "./emotion";
import "./globals.css";
import "./base.css";
import { Noto_Sans_Thai } from "next/font/google";
import Header from "./Header";
import Footer from "./Footer";
import Providers from "@/components/Providers";
import SideBar from "@/components/SideBar";

const noto_sans_thai = Noto_Sans_Thai({
  subsets: ["thai"],
  display: "swap",
  variable: "--noto_sans_thai",
});

export const metadata = {
  title: "Aow Tani",
  description: "Generated by create next app",
  openGraph: {
    title: "Aow Tani",
    description: "Generated by create next app",
    url: "https://triple-i.in",
    siteName: "Aow Tani",
    publishedTime: "2023-01-01T00:00:00.000Z",
    authors: ["triple-i"],
    images: [
      {
        url: "./logo.svg",
        width: 800,
        height: 600,
      },
      {
        url: "./logo.svg",
        width: 1800,
        height: 1600,
        alt: "My custom alt",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function RootLayout({
  children,
  authModal,
}: {
  children: React.ReactNode;
  authModal: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={noto_sans_thai.className}>
        <RootStyleRegistry>
          <Providers>
            <Header />
            {authModal}
            <main className="md:min-h-[calc(100vh-83px)] min-h-[calc(100vh-213px)] bg-[rgb(248, 249, 250)]">
              <div className="flex pt-[6.25rem]">
                <SideBar />
                <div className="flex-auto overflow-auto py-10">{children}</div>
              </div>
            </main>
            <Footer />
          </Providers>
        </RootStyleRegistry>
      </body>
    </html>
  );
}
