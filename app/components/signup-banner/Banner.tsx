import './Banner.scss'


// import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import React from 'react'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

interface BannerProps {
  bannerData?: {
    eventBannerPill?: string;
    eventBannerHeading?: string;
    eventBannerDescription?: string;
    eventBannerButtonText?: string;
    eventBannerImage?: {
      url?: string;
    };
  };
}

const Banner = ({ bannerData }: BannerProps) => {

    const bannerRef = React.useRef<HTMLDivElement>(null);
    // useGSAP(() => {
    //     gsap.fromTo(
    //         '.b-container',
    //         { opacity: 0 },
    //         {
    //             opacity: 1,
    //             duration: 1.2,
    //             ease: 'power2.out',
    //             scrollTrigger: {
    //                 trigger: '.b-container',
    //                 start: 'top 80%',
    //                 end: 'top 50%',
    //                 scrub: true,
    //                 invalidateOnRefresh: true,
    //                 // markers: true,
    //             },
    //         }
    //     );
    // }, { scope: bannerRef });
    return (
        <div className='b-container' data-speed="1.1" ref={bannerRef}>
            <div className="bc-wrapper">
                <div className="left">
                    <div className="l-top">
                        <div className='l-pill'>
                            <div className="l-icon">
                                <Image src="/banner/coming.svg" alt="megaphone icon" width={24} height={24} />
                            </div>
                            <p className='l-text'>
                                {bannerData?.eventBannerPill || 'Upcoming Events'}
                            </p>
                        </div>
                        <div className="l-main">
                            <div className="l-heading">
                                <h2>
                                    {bannerData?.eventBannerHeading || 'Something Big Is Coming'}
                                </h2>
                            </div>
                            <div className="l-desc">
                                <p>
                                    {bannerData?.eventBannerDescription || "We're getting ready to announce our first Keys Live experience."}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="l-cta">
                        <button onClick={() => window.open('https://forms.gle/example', '_blank')}>
                            <div className="l-cta-text">
                                <p>{bannerData?.eventBannerButtonText || 'Coming soon'}</p>
                            </div>
                            <div className="l-cta-icon">
                                <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3.89062 9H14.3906" stroke="#1C1C1E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M9.14062 3.75L14.3906 9L9.14062 14.25" stroke="#1C1C1E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>


                            </div>
                        </button>
                    </div>
                </div>
                <div className="right">
                    <div className="r-circle">
                        <Image 
                            src={bannerData?.eventBannerImage?.url || "/banner/dum.png"} 
                            alt="event thumbnail" 
                            width={300} 
                            height={300} 
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banner