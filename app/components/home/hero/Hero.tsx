'use client'
import HeroCta from './cta-section/HeroCta'
import { useRef } from 'react';
import { useGSAP } from '@gsap/react'; 
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIsMobile } from '../../../hooks/useWindowSize';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  heroData?: {
    heroHeadings?: string[];
    eventBannerPill?: string;
    eventBannerHeading?: string;
    eventBannerDescription?: string;
    eventBannerButtonText?: string;
    eventBannerImage?: {
      url?: string;
    };
  };
}

const Hero = ({ heroData }: HeroProps) => {
    const isMobile = useIsMobile(1250);
    const heroRef = useRef(null);
    useGSAP(()=>{
        gsap.to('.hero-img',{
            rotate:360,
            ease:"power4.out",
            duration:2,
            scrollTrigger:{
                trigger:heroRef.current,
                start:'top top',
                end:'+=800px',
                scrub:true,
                
                // markers:true
            }
        })
    },{scope:heroRef})
    return (
        <div className="hero-root" >
            <div id="home"className='hero-wrapper' ref={heroRef}>
                <div className="hero-container">
                    <div className="left"  {...(!isMobile ? { 'data-speed': '1.2' } : {})} >
                        <h1>
                            {heroData?.heroHeadings?.map((heading, index) => (
                                <span key={index} className={index % 2 === 1 ? 'dark' : ''}>
                                    {heading}
                                    {index === 0 && <div className="first-img"><Image src="/hero/Brutalist 59.svg" alt="purple graphic" width={100} height={100} /></div>}
                                </span>
                            )) || (
                                <>
                                    <span>Reviving Spaces. <div className="first-img"><Image src="/hero/Brutalist 59.svg" alt="purple graphic" width={100} height={100} /></div></span>
                                    <span className='dark'>Reclaiming Culture.</span>
                                    <span>Reimagining Pakistan.</span>
                                    <span className='dark'>Reconnecting People.</span>
                                </>
                            )}
                        </h1>
                    </div>
                    <div
                        className="right"
                        {...(!isMobile ? { 'data-speed': '1.5' } : {})}
                        data-lag="1"
                    >
                        <div className="hero-img">
                            <Image src="/hero/Brutalist 59.svg" alt="hero graphic" width={400} height={400} />
                        </div>
                    </div>
                    <div className="down" >
                        <p className="down-text">
                            Scroll Down
                        </p>
                    </div>
                </div>
                <HeroCta bannerData={heroData}/>
            </div>
        </div>
    )
}

export default Hero