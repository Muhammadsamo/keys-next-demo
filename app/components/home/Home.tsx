'use client'
import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Hero from './hero/Hero';
import About from './about/About';
import Service from './services/Service';
import Team from './team/Team';
import Events from './events/Events';
import Footer from '../footer/Footer';

import './Home.scss';
import Vision from './vision/Vision';
import { HomeData } from '@/app/page';
import Partner from './partners/Partner';

gsap.registerPlugin(ScrollTrigger);


export default function Home({ homeData }: HomeData) {
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // 1️⃣ Start About below the viewport
    gsap.set(aboutRef.current, { yPercent: 0, scale: 0.8});

    // 2️⃣ Slide it up while Hero is pinned
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,      // watch the hero
        start: 'bottom bottom',        // when hero bottom hits viewport bottom
        end: () => `+=${aboutRef.current!.offsetHeight}px`, // let it run for
        // the FULL About height
        scrub: true, // smooth scrubbing
        pin: heroRef.current,          // keep hero frozen
        anticipatePin: 1, // prevent jumping
        //  invalidateOnRefresh: true,
        // markers: true,
        // refreshPriority: 1, // ensure this runs before other triggers
        pinSpacing: false, // no extra space below hero
        onLeave: () => {
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                gsap.delayedCall(0.5, () => {
                    ScrollTrigger.refresh();
                  });
            });
          });
      },

      },
    });

    tl.to(aboutRef.current, { yPercent: 0, scale: 1, ease: 'none' });

  return () => {
    tl.scrollTrigger?.kill();
    
  };

  }, []);

  return (
    <div>
      {/* Hero */}
      <section ref={heroRef} className="hero-section">
        <Hero heroData={homeData?.heroSection} />
      </section>

      {/* About (will slide up) */}
      <section ref={aboutRef} className="about-section">
        <About aboutData={homeData?.aboutSection} />
      </section>

      {/* Rest of the page scrolls normally */}
      <Vision visionData={homeData?.ourVisionSection} />
      <Service serviceData={homeData?.services} />
      <Team teamData={homeData?.teamSection} />
      <Events eventsData={homeData?.followUs} />
      {/* if partnerSection.showPartnerSection is true render partner section*/}
      {homeData?.partnerSection?.showPartnerSection === true && <Partner partnerData={homeData?.partnerSection} />}

      <Footer footerData={homeData?.footerSection} />
    </div>
  );
}
