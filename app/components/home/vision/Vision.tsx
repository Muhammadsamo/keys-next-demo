'use client'
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIsMobile } from '../../../hooks/useWindowSize';
gsap.registerPlugin(ScrollTrigger);

interface VisionProps {
  visionData?: {
    headingSmall?: string;
    headingMain?: string;
    description?: string[];
  };
}

const Vision = ({ visionData }: VisionProps) => {
    const isMobile = useIsMobile(900);
    const aboutRef = useRef(null);
    useGSAP(() => {

        gsap.fromTo([aboutRef.current, '.a-main-wrapper'], {
            backgroundColor: '#E2E2DD',
        }, {
            backgroundColor: '#0E0E0E',
            scrollTrigger: {
                trigger: aboutRef.current,
                start: 'center bottom',
                end: isMobile ? '+=200px' : '+=200px',
                scrub: true,
                toggleActions: 'play reverse play reverse',
                // markers: true,
            }
        });
        gsap.fromTo('.v-sub p, .v-main h2, .spiny svg path', {
            color: '#5800FF',
            fill: '#5800FF',
            stroke: '#00000000',
        }, {
            color: '#FFC600',
            fill: '#00000000',
            stroke: '#FFC600',
            scrollTrigger: {
                trigger: '.vision-wrapper',
                start: 'top center',
                end: isMobile ? '+=200px' : '+=400px',
                scrub: true,
                toggleActions: 'play reverse play reverse',
                // markers:true
                // onLeave: () => {
                //     requestAnimationFrame(() => {
                //         requestAnimationFrame(() => {
                //           ScrollTrigger.refresh();
                //           const smoother = ScrollSmoother.get();
                //           if (smoother) {
                //             smoother.scrollTop(smoother.scrollTop()); // realigns without jumping
                //           }
                //         });
                //       });
                // },

            }
        })
    }, [])
    return (
        <div className="vision-wrapper" ref={aboutRef}>
            <div className="v-left"></div>
            <div className="v-right" >
                <div className="v-heading" >
                    <div className="v-sub" >
                        <p>{visionData?.headingSmall || 'Our Vision'}</p>
                    </div>
                    <div className="v-main" >
                        <h2>
                            {visionData?.headingMain || 'Why It Matters'}
                        </h2>
                    </div>
                </div>
                <div className="v-description" >
                    {visionData?.description ? (
                                    visionData.description.map((paragraph, index) => (  
                                        <span key={index}>{paragraph}</span>
                                    ))
                                ) : (
                        <>
                            <span>
                                From Rome to Jaipur, Barcelona to Bangkok, music has reignited old cities. So why not Karachi?
                            </span>
                            <span>
                                We&apos;re starting with sites like Frere Hall, Denso Hall, Khaliq Dina Hall, and Baradari, then expanding to Lahore, Makli, and eventually, to global cultural landmarks.
                            </span>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Vision