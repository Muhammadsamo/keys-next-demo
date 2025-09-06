"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import React from "react";
import { useIsMobile } from "../../hooks/useWindowSize";
import Image from 'next/image';

export interface FooterProps {
  footerData?: {
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
    }> | string[];
  };
}

const Footer = ({ footerData }: FooterProps) => {
  const isMobile = useIsMobile(1250);

  // Helper function to highlight specific words in text
  const highlightText = (text: string, highlightedWord?: string) => {
    if (!highlightedWord || !text) return text;
    
    const parts = text.split(highlightedWord);
    if (parts.length === 1) return text; // No match found
    
    return parts.map((part, index) => (
      <React.Fragment key={index}>
        {part}
        {index < parts.length - 1 && <span className="high">{highlightedWord}</span>}
      </React.Fragment>
    ));
  };

  // Helper function to check if text contains a phone number and clean it
  const isPhoneNumber = (text: string): boolean => {
    const phoneRegex = /[\+]?[0-9\s\-\(\)]{7,}/;
    return phoneRegex.test(text);
  };

  const cleanPhoneNumber = (text: string): string => {
    return text.replace(/[\+\s\-\(\)]/g, '');
  };

  // Handler for navigation clicks
  const handleNavClick = (target: string) => {
    if (target === "home") {
      gsap.to(window, { duration: 1, scrollTo: { y: 0, autoKill: true } });
    } else {
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: `#${target}`, offsetY: 0, autoKill: true },
      });
    }
  };
  const footerRef = React.useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (!footerRef.current) return;

      gsap.to(footerRef.current, {
        backgroundColor: "#E2E2DD",
        scrollTrigger: {
          trigger: footerRef.current,
          start: isMobile ? "60% bottom" : "70% bottom",
          end: isMobile ? "+=100px" : "+=200px",
          scrub: true,
        },
      });

      const topEl = footerRef.current.querySelector(".top");
      if (topEl) {
        gsap.to(topEl, {
          borderBottomColor: "#1C1C1E",
          scrollTrigger: {
            trigger: footerRef.current,
            start: isMobile ? "60% bottom" : "70% bottom",
            end: isMobile ? "+=100px" : "+=200px",
            scrub: true,
          },
        });
      }

      const darkEls = footerRef.current.querySelectorAll(".dark");
      if (darkEls.length) {
        gsap.to(darkEls, {
          color: "#1C1C1E",
          scrollTrigger: {
            trigger: footerRef.current,
            start: isMobile ? "60% bottom" : "70% bottom",
            end: isMobile ? "+=100px" : "+=200px",
            scrub: true,
          },
        });
      }

      // select all .social a
      const socialEls = footerRef.current.querySelectorAll(".social a");
      if (socialEls.length) {
        gsap.to(socialEls, {
          backgroundColor: "#1C1C1E",
          scrollTrigger: {
            trigger: footerRef.current,
            start: isMobile ? "60% bottom" : "70% bottom",
            end: isMobile ? "+=100px" : "+=200px",
            scrub: true,
          },
        });
      }

      // select all .social a img
      const socialImgEls = footerRef.current.querySelectorAll(".social a img");
      if (socialImgEls.length) {
        gsap.to(socialImgEls, {
          filter: "invert(100%) brightness(200%)",
          scrollTrigger: {
            trigger: ".f-container",
            start: window.innerWidth < 1250 ? "60% bottom" : "70% bottom",
            end: window.innerWidth < 1250 ? "+=100px" : "+=200px",
            scrub: true,
          },
        });
      }
    },
    { scope: footerRef }
  );

  return (
    <div className="f-container" ref={footerRef}>
      <div className="f-wrapper">
        <div className="top">
          <div className="left">
            {footerData?.taglines?.map((tagline, index) => (
              <p key={index}>
                <span className="dark">
                  {highlightText(tagline.text || '', tagline.highlightedWord)}
                </span>
              </p>
            )) || (
              <>
                <p>
                  <span className="dark">Got a question?</span>
                </p>
                <p>
                  <span className="dark">Want to get involved?</span>
                </p>
                <p>
                  <span className="dark">Just want to say hi?</span>
                </p>
                <p>
                  <span className="dark">We&apos;d love to hear</span>&nbsp;
                  <span className="high">from you.</span>
                </p>
              </>
            )}
          </div>
          <div className="right">
            <div className="social">
              <ul>
                {footerData?.socialIcons?.map((socialIcon, index) => (
                  <li key={index}>
                    <a href={socialIcon.href || "#"} target="_blank" rel="noopener noreferrer">
                      <Image 
                        src={socialIcon.icon?.url || "/footer/darkinsta.svg"} 
                        alt={`${socialIcon.socialPlatform || 'social'} logo`} 
                        width={24} 
                        height={24} 
                      />
                    </a>
                  </li>
                )) || (
                  <>
                    <li>
                      <a href="https://www.instagram.com/keyslive.fun/profilecard/?igsh=MTdsM2E1ZDhxcDY0MQ==">
                        <Image 
                          src="/footer/darkinsta.svg" 
                          alt="instagram logo" 
                          width={24} 
                          height={24} 
                        />
                      </a>
                    </li>
                    <li>
                      <a href="https://www.youtube.com/@keysproductions5484/videos">
                        <Image 
                          src="/footer/darkyu.svg" 
                          alt="youtube logo" 
                          width={24} 
                          height={24} 
                        />
                      </a>
                    </li>
                    <li>
                      <a href="https://www.facebook.com/share/15AuypBqER/?mibextid=wwXIfr">
                        <Image 
                          src="/footer/darkfb.svg" 
                          alt="facebook logo" 
                          width={24} 
                          height={24} 
                        />
                      </a>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
        <div className="bottom">
          <div className="f-contact">
            {footerData?.contactDetails?.map((contact, index) => {
              const isPhone = isPhoneNumber(contact.heading || '') || isPhoneNumber(contact.contactInfo || '');
              const phoneNumber = isPhone ? cleanPhoneNumber(contact.contactInfo || contact.heading || '') : '';
              const whatsappUrl = isPhone ? `https://wa.me/${phoneNumber}` : '#';
              
              const contactCard = (
                <div key={index} className="f-card">
                  <div className="icon">
                    <Image 
                      src={contact.icon?.url || "/footer/mailp.svg"} 
                      alt={`${contact.heading} icon`} 
                      width={20} 
                      height={20} 
                    />
                  </div>
                  <div className="text">
                    <p className="mute up">{contact.heading}</p>
                    <p className="dark up">{contact.contactInfo}</p>
                  </div>
                </div>
              );

              return isPhone ? (
                <a 
                  key={index}
                  href={whatsappUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none', color: 'inherit' }}
                  className="f-card"
                >
                  {contactCard}
                </a>
              ) : contactCard;
            }) || (
              <>
                <div className="f-card">
                  <div className="icon">
                    <Image src="/footer/mailp.svg" alt="mail icon" width={20} height={20} />
                  </div>
                  <div className="text">
                    <p className="mute up">Email Address</p>
                    <p className="dark">Info@keysproductions.com.pk</p>
                  </div>
                </div>
                <div className="f-card">
                  <div className="icon">
                    <Image src="/footer/locop.svg" alt="address icon" width={20} height={20} />
                  </div>
                  <div className="text">
                    <p className="mute up">Location</p>
                    <p className="dark up">
                      3rd floor، 39-C Khayaban-e-Seher, D.H.A Phase 6 Shahbaz
                      Commercial Area, Karachi
                    </p>
                  </div>
                </div>
                <div className="f-card">
                  <div className="icon">
                    <Image src="/footer/phonep.svg" alt="phone icon" width={20} height={20} />
                  </div>
                  <div className="text">
                    <p className="mute up">Phone number</p>
                    <p className="dark up">+92-311-1444091</p>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="f-bottom">
            <div className="f-icon">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("home");
                }}
              >
                <Image 
                  src={footerData?.footerLogo?.url || "/header/logo.png"} 
                  alt="Keys Productions logo" 
                  width={100} 
                  height={40} 
                />
              </a>
            </div>
            <nav>
              <ul className="navbar">
                {footerData?.footerLinks?.map((link, index) => {
                  // Handle both string[] and structured object formats
                  const isString = typeof link === 'string';
                  const label = isString ? link : link.label;
                  const target = isString ? link.toLowerCase() : link.target;
                  
                  return (
                    <li key={index}>
                      <button
                        className="f-link"
                        type="button"
                        onClick={() => handleNavClick(target || 'home')}
                      >
                        {label}
                      </button>
                    </li>
                  );
                }) || (
                  <>
                    <li>
                      <button
                        className="f-link"
                        type="button"
                        onClick={() => handleNavClick("home")}
                      >
                        Home
                      </button>
                    </li>
                    <li>
                      <button
                        className="f-link"
                        type="button"
                        onClick={() =>
                          gsap.to(window, {
                            duration: 1,
                            scrollTo: { y: `#home`, offsetY: 0, autoKill: true },
                          })
                        }
                      >
                        Register
                      </button>
                    </li>
                    <li>
                      <button
                        className="f-link"
                        type="button"
                        onClick={() => handleNavClick("about")}
                      >
                        About
                      </button>
                    </li>
                    <li>
                      <button
                        className="f-link"
                        type="button"
                        onClick={() => handleNavClick("services")}
                      >
                        Services
                      </button>
                    </li>
                  </>
                )}
              </ul>
            </nav>
            <div className="copy">
              <p>{footerData?.copyright || "@2025 Keys Live"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
