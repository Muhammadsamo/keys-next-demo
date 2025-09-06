"use client";
import { useState, useRef } from "react";
import { useIsMobile } from "../../../hooks/useWindowSize";
import Image from "next/image";
import { highlightHeading } from "@/app/lib/highlightedHeadings";

interface EventsProps {
  eventsData?: {
    heading?: string;
    headingHighlight?: string;
    description?: string;
    socialLinks?: Array<{
      socialPlatform?: string;
      href?: string;
      icon?: { url?: string };
    }>;
  };
}

const Events = ({ eventsData }: EventsProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isScaling, setIsScaling] = useState(false);
  const timeoutRef = useRef<number | null>(null);
  const isMobile = useIsMobile(600);

  const handleMouseEnter = (idx: number) => {
    setActiveIndex(idx);
    setIsScaling(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      setIsScaling(false);
      setActiveIndex(null);
    }, 1000);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsScaling(false);
    setActiveIndex(null);
  };

  return (
    <div className="e-wrapper">
      <div className="e-header">
        <div className="e-heading">
          <h2>
            {eventsData?.heading ? (
              highlightHeading(
                eventsData.heading,
                eventsData.headingHighlight,
                "mute",
                "mute color",
                true
              )
            ) : (
              <>
                <span className="mute color">Follow Us</span>
                <span className="mute">&nbsp;on Instagram</span>
              </>
            )}
          </h2>
        </div>
        <div className="e-description">
          <p>
            {eventsData?.description ||
              "Catch the latest updates, event highlights, and more."}
          </p>
        </div>
      </div>
      <div
        className={`e-grid${isScaling ? " scaling" : ""}`}
        onMouseLeave={handleMouseLeave}
      >
        {(eventsData?.socialLinks || [
          { img: "/events/gi1.jpg" },
          { img: "/events/gi2.jpg" },
          { img: "/events/gi3.jpg" },
          { img: "/events/gi4.jpg" },
          { img: "/events/gi5.jpg" },
          { img: "/events/gi6.jpg" },
          { img: "/events/gi7.jpg" },
          { img: "/events/gi8.jpg" },
          { img: "/events/gi9.jpg" },
        ])
          .slice(0, isMobile ? 3 : undefined)
          .map((item, idx) => {
            const isSocialLink = 'href' in item;
            const href = isSocialLink ? item.href || "#" : "https://www.instagram.com/keyslive.fun/";
            const imageSrc = isSocialLink ? item.icon?.url || "/events/gi1.jpg" : (item as { img: string }).img;
            const altText = isSocialLink ? `${item.socialPlatform || 'social'} event image` : 'instagram event image';
            
            return (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`e-grid-item${
                  isScaling ? (activeIndex === idx ? " active" : " inactive") : ""
                }`}
                key={idx}
                onMouseEnter={() => handleMouseEnter(idx)}
              >
                <p>Click here</p>
                <Image
                  src={imageSrc}
                  alt={altText}
                  width={300}
                  height={300}
                  data-speed="0.8"
                />
              </a>
            );
          })}
      </div>
    </div>
  );
};

export default Events;
