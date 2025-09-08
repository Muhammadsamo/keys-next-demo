"use client";

import { useState, useRef, useEffect, createContext, useContext } from "react";
import Header from "./header/Header";
import PreScreen from "./home/prescreen/PreScreen";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

// Create context for header data
const HeaderDataContext = createContext<{
  headerLogo?: { url?: string };
  latestEvent?: string;
  button?: {
    textDisabled?: string;
    textActive?: string;
    btnLink?: string;
  };
  // Mobile-specific schema (from CMS)
  mobileHeading?: string;
  mobileButton?: {
    textDisabled?: string;
    textActive?: string;
    btnLink?: string;
  };
  mobileLinks?: Array<{
    label?: string;
    link?: string; // can be hash (e.g. #about) or external URL
  }>;
} | null>(null);

// Create context for loading screen data
const LoadingScreenDataContext = createContext<{
  logo?: { url?: string };
  text?: string;
} | null>(null);

export const useHeaderData = () => useContext(HeaderDataContext);
export const useLoadingScreenData = () => useContext(LoadingScreenDataContext);

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

declare global {
  interface Window {
    _mobHeaderRef?: { current: HTMLDivElement | null };
  }
}

export default function ClientWrapper({ 
  children, 
  headerData,
  loadingScreenData
}: { 
  children: React.ReactNode;
  headerData?: {
    headerLogo?: { url?: string };
    latestEvent?: string;
    button?: {
      textDisabled?: string;
      textActive?: string;
      btnLink?: string;
    };
    mobileHeading?: string;
    mobileButton?: {
      textDisabled?: string;
      textActive?: string;
      btnLink?: string;
    };
    mobileLinks?: Array<{
      label?: string;
      link?: string;
    }>;
  };
  loadingScreenData?: {
    logo?: { url?: string };
    text?: string;
  };
}) {
  const headerRef = useRef<HTMLDivElement>(null);
  const mobileHeaderRef = useRef<HTMLDivElement>(null);

  const [paddingTop, setPaddingTop] = useState(0);
  const [showHeader, setShowHeader] = useState(true);
  const [showPreScreen, setShowPreScreen] = useState(true);

  useEffect(() => {
  if (sessionStorage.getItem("preScreenShown") === "true") {
    setShowPreScreen(false);
  }
}, []);

  // Helper to update padding from header height
  function updatePadding() {
    if (window.innerWidth < 1250) {
      if (window._mobHeaderRef?.current) {
        setPaddingTop(window._mobHeaderRef.current.getBoundingClientRect().height);
      }
    } else if (headerRef.current) {
      setPaddingTop(headerRef.current.getBoundingClientRect().height);
    }
  }

  useEffect(() => {
    if (showHeader && !showPreScreen) {
      updatePadding();
      window.addEventListener("resize", updatePadding);
      return () => window.removeEventListener("resize", updatePadding);
    } else {
      setPaddingTop(0);
      window.removeEventListener("resize", updatePadding);
    }
  }, [showHeader, showPreScreen]);

  useEffect(() => {
    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 2,
      effects: true,
      normalizeScroll: true,
      smoothTouch: 0.2,
    });

    return () => {
      smoother.kill();
    };
  }, []);

  // Handle PreScreen animation state
  const handlePreScreenState = (state: "start" | "end") => {
    if (state === "start") {
      setShowHeader(false);
      setPaddingTop(0);
    } else if (state === "end") {
      setShowPreScreen(false);
      setShowHeader(true);
      sessionStorage.setItem("preScreenShown", "true");
      setTimeout(updatePadding, 50);
    }
  };

  return (
    <HeaderDataContext.Provider value={headerData || null}>
      <LoadingScreenDataContext.Provider value={loadingScreenData || null}>
        <div id="smooth-wrapper" className="app-container">
          <Header ref={headerRef} visible={showPreScreen ? showHeader : undefined} />

          {/* keep the mobile header ref registered for other components */}
          <div ref={mobileHeaderRef} className="mobile-header-ref" />

          {showPreScreen && <PreScreen onPreScreenState={handlePreScreenState} />}

          <div id="smooth-content" className="smooth-content" style={{ paddingTop }}>
            {children}
          </div>
        </div>
      </LoadingScreenDataContext.Provider>
    </HeaderDataContext.Provider>
  );
}
