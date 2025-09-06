'use client'
import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useIsMobile } from '../../../hooks/useWindowSize';
import { highlightHeading } from '@/app/lib/highlightedHeadings';

interface AboutProps {
  aboutData?: {
    headingSmall?: string;
    headingMain?: string;
    headingHighlight?: string;
    description?: string[];
  };
}

const About = ({ aboutData }: AboutProps) => {
    const isMobile = useIsMobile(900);
    const aboutRootRef = useRef<HTMLDivElement | null>(null);
    useGSAP(()=>{

    // gsap.to('.v-sub p, .v-main h2, .spiny svg path, .a-number p, .a-icon p, .year-tag p',{
    //     color:'#FFC600',
    //     fill:'#00000000',
    //     stroke:'#FFC600',
    //     scrollTrigger:{
    //         trigger:'.vision-wrapper',
    //         start:'top center',
    //         end:'+=400px',
    //         scrub:true,
            
    //         // markers:true
    //     }
    // })
    gsap.to('.spiny',{
        rotate:360,
        scrollTrigger:{
            trigger:'.spiny',
            start: isMobile ? 'top bottom' : 'top center',
            end:'100%',
            scrub:true,
            invalidateOnRefresh: true,
            // markers:true
            // onEnter: () => {
            //     requestAnimationFrame(() => {
            //         requestAnimationFrame(() => {
            //             gsap.delayedCall(0.1, () => {
            //                 ScrollTrigger.refresh();
            //               });
            //         });
            //       });
            // },
        }
    })
},[])

    return (
        <div className="about-root" ref={aboutRootRef} >
            <div id="about" className='a-main-wrapper' >
                <div className="spiny" >
                    <svg width="1147" height="1147" viewBox="0 0 1147 1147" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M882.338 600.937L583.831 578.751L582.767 578.673L583.387 579.541L757.386 823.103L733.475 1144.95L545.884 882.337L568.07 583.831L568.149 582.767L567.28 583.386L323.718 757.384L1.87635 733.475L264.485 545.883L562.991 568.07L564.055 568.149L563.435 567.28L389.437 323.716L413.347 1.87483L600.939 264.483L578.752 562.99L578.673 564.055L579.541 563.434L823.105 389.435L1144.95 413.346L882.338 600.937Z" fill="#5B5FE1" stroke="#FFC600" />
                    </svg>

                </div>
                <div className="about-wrapper">
                    <div className="a-content">
                        <div className="a-left">
                            <div className="a-heading" >
                                <div className="a-sub">
                                    {aboutData?.headingSmall || 'About Keys Live'}
                                </div>
                                <div className="a-main">
                                    <h2>
                                        {aboutData?.headingMain ? (
                                            highlightHeading(aboutData.headingMain, aboutData.headingHighlight, 'mute', 'color')
                                        ) : (
                                            <>
                                                <span className='mute'>{aboutData?.headingMain || 'OUR'}</span>
                                                <span></span>
                                                <span className='color'> {aboutData?.headingHighlight || 'STORY'}</span>
                                            </>
                                        )}
                                    </h2>
                                </div>
                            </div>
                        </div>
                        <div className="a-right">
                            <div className="a-description">
                                {aboutData?.description ? (
                                    aboutData.description.map((paragraph, index) => (
                                        <span key={index}>{paragraph}</span>
                                    ))
                                ) : (
                                    <>
                                        <span>
                                            Keys Live is a cultural heritage initiative by Keys Productions, one of Pakistan&apos;s leading event management and PR companies.
                                        </span>
                                        <span>
                                        We believe that cities carry memories, echoes of the past that still live in their streets, walls, and spaces. Through Keys Live, we give those echoes a voice by transforming heritage spaces into experiences where the past and present collide through live music, storytelling, and shared memory.
                                        </span>
                                        <span>
                                            From iconic rock to forgotten folk, sufi sounds to indie soul, we merge sound, space, and story to reconnect audiences with their cultural DNA.
                                        </span>
                                        <span>
                                            At its heart, Keys Live is about community, creating space for everyone to rediscover their roots.
                                        </span>
                                    </>
                                )}
                            </div>
                            {/* <div className="a-years" >
                                <div className="a-numbers">
                                    <div className="a-number">
                                        <p>7</p>
                                    </div>
                                    <div className="a-icon">
                                        <p>+</p>
                                    </div>
                                </div>
                                <div className="year-tag">
                                    <p>Years Of Seasoning!</p>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default About