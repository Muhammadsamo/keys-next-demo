'use client'
import { useRef, useEffect, useState, forwardRef } from 'react'
import SignCTA from '../Signup-CTA/SignCTA'
import MobileHeader from './MobileHeader'
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useHeaderData } from '../ClientWrapper';
import Image from 'next/image';


gsap.registerPlugin(ScrollTrigger);


const Header = forwardRef<HTMLDivElement, { visible?: boolean }>( (props, ref) => {
  const { visible } = props;
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollY = useRef(0);
  const headerData = useHeaderData();

  useEffect(() => {
    if (typeof visible === 'boolean') return; // Don't attach scroll if externally controlled
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY <= 0) {
        setShowHeader(true);
        lastScrollY.current = 0;
        return;
      }
      if (currentY < 0) return;
      if (currentY > lastScrollY.current) {
        setShowHeader(false);
      } else if (currentY < lastScrollY.current) {
        setShowHeader(true);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visible]);

  const isHeaderVisible = typeof visible === 'boolean' ? visible : showHeader;

  return (
    <>
      <div className="desktop-header">
        <div
          className={`header${isHeaderVisible ? '' : ' header--hidden'}`}
          ref={ref}
        >
          <div className="header-wrapper">
            <div className="header-logo">
              <a href="#" onClick={e => { e.preventDefault(); gsap.to(window, { duration: 1, scrollTo: { y: 0, autoKill: true } }); }}>
                { headerData?.headerLogo?.url ? (
                  <>
                    <Image src={headerData.headerLogo.url} width={200} height={100} priority alt='' />
                  </>
                ) : (
                  <svg id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 618.74 251.73">
                  <g id="Layer_1-2" data-name="Layer 1">
                    <g>
                      <polygon className="cls-1" points="521.95 161.59 521.95 251.72 352.68 251.72 373.91 167.38 416.74 167.02 416.74 211.82 477.68 211.82 477.68 178.33 384.94 123.62 412.58 13.58 521.96 13.58 521.96 85.41 480.59 85.41 480.59 53.77 451.75 53.77 442.48 102.3 521.95 161.59" fill="#fff" />
                      <polygon className="cls-1" points="168.14 96.76 125.3 251.72 78.42 251.72 106.01 133.68 44.12 133.68 44.12 183.37 0 183.37 0 0 44.12 0 44.12 93.93 47.03 93.93 88.4 0 132.37 0 92.04 93.93 168.14 96.76" fill="#fff" />
                      <rect className="cls-1" x="535.88" y="13.58" width="82.85" height="238.15" fill="#fff" />
                      <circle className="cls-2" cx="577.48" cy="211.42" r="20.08" fill="#ff172a" />
                      <g>
                        <path d="M603.79,174.07h-50.06v-10.49h40.57v-14.68h9.49v25.17Z" />
                        <path d="M594.3,119.9h9.49v17.41h-9.49v-3.46h-31.09v3.46h-9.49v-17.41h9.49v3.46h31.09v-3.46Z" />
                        <path d="M553.73,88.78v-10.77l50.06,6.65v16.62l-50.06,6.79v-10.94l38.46-4.15-38.46-4.19Z" />
                        <path d="M553.73,66.78v-24.3h9.52v13.92h9.66v-13.22h9.35v13.09h12.05v-14.12h9.49v24.65h-50.06Z" />
                      </g>
                      <polygon className="cls-1" points="286.38 0 265.64 0 265.64 0 150.45 0 150.83 84.45 182.72 85.63 158.19 183.36 277.77 183.36 267.6 145.44 207.56 145.44 219.42 98.16 254.86 98.16 244.28 58.84 194.78 58.84 195.51 40.05 252.25 40.05 295.83 40.05 286.38 0" fill="#fff" />
                      <polygon className="cls-1" points="386.03 68.7 339.95 251.72 261.27 251.72 295.38 193.56 257.69 53.62 301.27 53.62 317.02 120.4 340.15 68.7 386.03 68.7" fill="#fff" />
                    </g>
                  </g>
                </svg>
                )
                  
                }
              </a>
            </div>
            <div className="event-wrapper">
              <div className="event-title">
                <p>{headerData?.latestEvent || 'Latest Event'}</p>
              </div>
              <div className="h-cta">
                <SignCTA />
              </div>
            </div>
          </div>
        </div>
      </div>
      <MobileHeader />
    </>
  )
});

Header.displayName = 'Header';

export default Header