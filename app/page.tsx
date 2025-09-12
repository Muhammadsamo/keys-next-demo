// import { SanityDocument } from "next-sanity";
import Home from "./components/home/Home";
import type { Metadata } from "next";
import { client } from "./sanity/client";

const HOMEPAGE_QUERY = `*[_type == "homepage"][0]{
  heroSection{
    heroHeadings,
    eventBannerPill,
    eventBannerHeading,
    eventBannerDescription,
    eventBannerButton {
      textDisabled,
      textActive,
      link,
    },
    eventBannerImage{
      ...,
      "url": asset->url
    }
  },
  aboutSection{
    headingSmall,
    headingMain,
    headingHighlight,
    description[],
  },
  ourVisionSection{
    headingSmall,
    headingMain,
    description[],
  },
  services{
    heading,
    description,
    yearsOfExperience{
      number,
      text
    },
    serviceItems[]{
      service,
      description
    }
  },
  teamSection{
    heading,
    description,
    founderProfile{
      name,
      "slug": slug.current,
      imgage{
        ...,
        "url": asset->url
      },
      role
    },
    teamMembers[]->{
      name,
      "slug": slug.current,
      image{
        ...,
        "url": asset->url
      },
      role
    }
  },
  followUs{
    heading,
    headingHighlight,
    description,
    socialLinks[]{
      socialPlatform,
      href,
      icon{
        ...,
        "url": asset->url
      }
    }
  },
  partnerSection{
    showPartnerSection,
    heading,
    partners[] {
      partnerName,
      logo{
        ...,
        "url": asset->url
      },
      altText,
    },
  },
  footerSection{
    taglines[]{
      text,
      highlightedWord
    },
    socialIcons[]{
      socialPlatform,
      href,
      icon{
        ...,
        "url": asset->url
      }
    },
    contactDetails[]{
      heading,
      contactInfo,
      icon{
        ...,
        "url": asset->url
      }
    },
    footerLogo{
      ...,
      "url": asset->url
    },
    copyright,
    footerLinks[] {
      label,
      target
    }
  }
}`;

export interface HomeData {
  homeData?: {
    heroSection?: {
      heroHeadings?: string[];
      eventBannerPill?: string;
      eventBannerHeading?: string;
      eventBannerDescription?: string;
      eventBannerButton?: {
        textDisabled?: string;
        textActive?: string;
        link?: string;
      };
      eventBannerImage?: { url?: string };
    };
    aboutSection?: {
      headingSmall?: string;
      headingMain?: string;
      headingHighlight?: string;
      description?: string[];
    };
    ourVisionSection?: {
      headingSmall?: string;
      headingMain?: string;
      description?: string[];
    };
    services?: {
      heading?: string;
      description?: string;
      yearsOfExperience?: { number?: number; text?: string };
      serviceItems?: Array<{ service?: string; description?: string }>;
    };
    teamSection?: {
      heading?: string;
      description?: string;
      founderProfile?: {
        name?: string;
        slug?: string;
        imgage?: { url?: string };
        role?: string;
      };
      teamMembers?: Array<{
        name?: string;
        slug?: string;
        imgage?: { url?: string };
        role?: string;
      }>;
    };
    followUs?: {
      heading?: string;
      headingHighlight?: string;
      description?: string;
      socialLinks?: Array<{
        socialPlatform?: string;
        href?: string;
        icon?: { url?: string };
      }>;
    };
    partnerSection?: {
      showPartnerSection?: boolean;
      heading?: string;
      partners?: Array<{
        partnerName?: string;
        logo?: { url?: string };
        altText?: string;
      }>;
    };
    footerSection?: {
      taglines?: Array<{ text?: string; highlightedWord?: string }>;
      socialIcons?: Array<{
        socialPlatform?: string;
        href?: string;
        icon?: { url?: string };
      }>;
      contactDetails?: Array<{
        heading?: string;
        contactInfo?: string;
        icon?: { url?: string };
      }>;
      footerLogo?: { url?: string };
      copyright?: string;
      footerLinks?: Array<{
        label?: string;
        target?: string;
      }>;
    };
  };
}


const options = { next: { revalidate: 120 } };

export default async function HomeRoute() {
   const homeData = await client.fetch<HomeData['homeData']>(HOMEPAGE_QUERY, {}, options);

   console.log("homeData: ", homeData)

  return <Home homeData={homeData} />;
}

export async function generateMetadata(): Promise<Metadata> {
  const homeData = await client.fetch<HomeData['homeData']>(HOMEPAGE_QUERY, {}, { next: { revalidate: 300 } });

  const title = "Keys Live";
  const description = Array.isArray(homeData?.aboutSection?.description)
    ? homeData!.aboutSection!.description!.join(' ')
    : (homeData?.aboutSection?.description as unknown as string) || "";
  const ogImageUrl = '../public/Favicon-08.png';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      images: ogImageUrl ? [ogImageUrl] : undefined,
    },
    twitter: {
      card: ogImageUrl ? "summary_large_image" : "summary",
      title,
      description,
      images: ogImageUrl ? [ogImageUrl] : undefined,
    },
  };
}
