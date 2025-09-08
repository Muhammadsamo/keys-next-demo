import type { Metadata } from "next";
import { alexandria, alexandriaVariable, chivo, nunito } from "./lib/fonts";
import "./globals.css";
import ClientWrapper from "./components/ClientWrapper";
import { client } from "./sanity/client";

export const metadata: Metadata = {
  title: "Keys Live",
  description:
    "Keys Live is a cultural heritage initiative by Keys Productions, one of Pakistan’s leading event management and PR companies.",
  icons: {
    icon: "/favicon-08.png",
    shortcut: "/favicon-08.png",
    apple: "/favicon-08.png",
    other: {
      rel: "icon",
      url: "/favicon-08.png",
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch header and loading screen data
  const [pageData, loadingScreenData] = await Promise.all([
    client.fetch(`*[_type == "homepage"][0]{
      header{
        headerLogo{
          ...,
          "url": asset->url
        },
        latestEvent,
        button {
          textDisabled,
          textActive,
          btnLink
        },
        mobileHeading,
        mobileButton {
          textDisabled,
          textActive,
          btnLink
        },
        mobileLinks []{
          label,
          link,
        },
      },
    }`),
    client.fetch(`*[_type == "loadingScreen"][0]{
      logo{...,"url": asset->url},
      text
    }`),
  ]);

  console.log("Header Data: ", pageData)

  return (
    <html lang="en">
      <body
        className={`${alexandria.variable} ${alexandriaVariable.variable} ${chivo.variable} ${nunito.variable}`}
      >
        <ClientWrapper
          headerData={pageData?.header}
          loadingScreenData={loadingScreenData}
        >
          {children}
        </ClientWrapper>
      </body>
    </html>
  );
}
