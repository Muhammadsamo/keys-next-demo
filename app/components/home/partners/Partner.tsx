'use client'
import React, { useRef, useEffect, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Image from 'next/image'

interface PartnerProps {
  partnerData?: {
    heading?: string;
      partners?: Array<{
        partnerName?: string;
        logo?: { url?: string };
        altText?: string;
      }>;
  };
}

const Partner = ({ partnerData }: PartnerProps) => {
  if (!partnerData || !partnerData.partners || partnerData.partners.length === 0) return null
  return (
    <div className="partner-section">
      <div className="partner-section__wrapper">
        <h2 className="partner-section__heading">
            <span className='dot'></span> 
            {partnerData.heading || 'Our Partners'}</h2>
        <div className="partner-section__row">
          <Marquee speed={40}>
            <LogoRow logos={partnerData.partners} />
          </Marquee>
        </div>
        <div className="partner-section__row">
          <Marquee speed={25}>
            <LogoRow logos={partnerData.partners} />
          </Marquee>
        </div>
        <div>
          <Marquee speed={40}>
            <LogoRow logos={partnerData.partners} />
          </Marquee>
        </div>
      </div>
    </div>
  )
}

const LogoRow = ({ logos }: { logos: { logo?: { url?: string }; altText?: string }[] }) => {
  const logosWithUrl = logos.filter((p) => Boolean(p.logo?.url))
  return (
    <div className="partner-section__logos">
      {logosWithUrl.map((partner, index) => (
        <div
          key={index}
          className="partner-section__logo"
          style={{ marginRight: index === logosWithUrl.length - 1 ? 0 : 80 }}
        >
          <Image
            src={partner.logo!.url as string}
            alt={partner.altText || 'Partner logo'}
            width={120}
            height={60}
            style={{ width: 'auto', height: 'auto', maxHeight: 60, objectFit: 'contain' }}
          />
        </div>
      ))}
    </div>
  )
}

// Classic infinite GSAP marquee with modular wrapping and two copies
const Marquee = ({ children, speed }: { children: React.ReactNode; speed: number }) => {
  const innerRef = useRef<HTMLDivElement>(null)
  const outerRef = useRef<HTMLDivElement>(null)
  const directionRef = useRef(1)
  const lastScrollY = useRef(typeof window !== 'undefined' ? window.scrollY : 0)
  const xRef = useRef(0)
  const [rowWidth, setRowWidth] = useState(0)

  // Measure row width after mount and on resize
  useEffect(() => {
    const measure = () => {
      const inner = innerRef.current
      if (!inner) return
      const firstRow = inner.children[0] as HTMLElement
      if (firstRow) setRowWidth(firstRow.offsetWidth)
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [children])

  useGSAP(() => {
    if (!rowWidth) return
    const inner = innerRef.current
    if (!inner) return
    xRef.current = 0
    gsap.set(inner, { x: 0 })
    function ticker() {
      const pxPerFrame = (rowWidth / (speed * 60)) * directionRef.current
      xRef.current += pxPerFrame
      // Modular wrap: always between 0 and -rowWidth
      if (xRef.current <= -rowWidth) xRef.current += rowWidth
      if (xRef.current > 0) xRef.current -= rowWidth
      gsap.set(inner, { x: xRef.current })
    }
    gsap.ticker.add(ticker)
    return () => gsap.ticker.remove(ticker)
  }, [speed, children, rowWidth])

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      const delta = currentY - lastScrollY.current
      if (delta === 0) return
      directionRef.current = delta > 0 ? -1 : 1
      lastScrollY.current = currentY
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="partner-section__marquee-outer" ref={outerRef}>
      <div className="partner-section__marquee-inner" ref={innerRef} style={{ willChange: 'transform', display: 'flex' }}>
        <div style={{ display: 'inline-block' }}>{children}</div>
        <div style={{ display: 'inline-block' }}>{children}</div>
      </div>
    </div>
  )
}

export default Partner