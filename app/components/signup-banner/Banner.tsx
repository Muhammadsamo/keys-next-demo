import './Banner.scss'


// import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import React from 'react'
import Image from 'next/image'
import SignCTA from '../Signup-CTA/SignCTA'

gsap.registerPlugin(ScrollTrigger)

interface BannerProps {
  bannerData?: {
    eventBannerPill?: string;
    eventBannerHeading?: string;
    eventBannerDescription?: string;
    eventBannerButton: {
        textDisabled?: string;
        textActive?: string;
        link?: string;
    };
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
                        <SignCTA
                            text={bannerData?.eventBannerButton.textActive || bannerData?.eventBannerButton.textDisabled || 'Coming soon'}
                            link={bannerData?.eventBannerButton.link}
                            disabled={!(bannerData?.eventBannerButton.link)}
                            target="_blank"
                            showIcon={true}
                        />
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