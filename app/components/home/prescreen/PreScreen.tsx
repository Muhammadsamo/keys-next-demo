'use client'
import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import Image from 'next/image';
import { useLoadingScreenData } from '../../ClientWrapper';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

interface PreScreenProps {
  onPreScreenState: (state: 'start' | 'end') => void;
}

const PreScreen: React.FC<PreScreenProps> = ({ onPreScreenState }) => {
    const vertRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [hidden, setHidden] = useState(false);
    const loadingScreenData = useLoadingScreenData();

    useEffect(() => {
        let triggeredStart = false;
        let triggeredEnd = false;
        const ctx = gsap.context(() => {
            const img = vertRef.current?.querySelector('img');
            if (img) {
                gsap.fromTo(
                    img,
                    { scale: 1 },
                    {
                        scale: 20,
                        ease: 'power2.inOut',
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: 'top top',
                            end: '+=300px',
                            scrub: true,
                            pin: '.h-container',
                            pinSpacing: false,
                            onUpdate: (self) => {
                                if (!triggeredStart && self.progress > 0) {
                                    onPreScreenState('start');
                                    triggeredStart = true;
                                }
                                if (!triggeredEnd && self.progress === 1) {
                                    if (gsap.to) {
                                        gsap.to(window, { scrollTo: 0, duration: 0.5, overwrite: 'auto' });
                                    } else {
                                        window.scrollTo(0, 0);
                                    }
                                    onPreScreenState('end');
                                    triggeredEnd = true;
                                    setTimeout(() => setHidden(true), 100); // hide after animation
                                }
                            },
                        },
                        // onComplete: () => {
                        //     ScrollTrigger.refresh(true);
                        // }
                    }
                );
            }
        }, containerRef);
        return () => ctx.revert();
    }, [onPreScreenState]);

    if (hidden) return null;
    return (
        <div className='p-container' ref={containerRef}>
            <div className='p-wrapper'>
                <div className="vert" ref={vertRef}>
                    {loadingScreenData?.logo?.url ? (
                        <Image 
                            src={loadingScreenData.logo.url} 
                            alt="loading screen logo" 
                            width={200} 
                            height={400} 
                            priority 
                        />
                    ) : (
                        <Image src="/hero/Keysvert.webp" alt="vertical logo" width={200} height={400} />
                    )}
                </div>
                <div className="down" >
                    <p className="down-text">
                        {loadingScreenData?.text || 'Scroll Down'}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default PreScreen