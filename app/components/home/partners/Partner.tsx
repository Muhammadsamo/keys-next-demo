'use client'
import React, { useRef, useEffect, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const Partner = () => {
  return (
    <div className="partner-section">
      <div className="partner-section__wrapper">
        <h2 className="partner-section__heading">
            <span className='dot'></span> 
            OUR PARTNERS</h2>
        <div className="partner-section__row">
          <Marquee speed={40}>
            <LogoRow count={6} />
          </Marquee>
        </div>
        <div className="partner-section__row">
          <Marquee speed={25}>
            <LogoRow count={6} />
          </Marquee>
        </div>
        <div>
          <Marquee speed={40}>
            <LogoRow count={6} />
          </Marquee>
        </div>
      </div>
    </div>
  )
}

const LogoRow = ({ count }: { count: number }) => (
  <div className="partner-section__logos">
    {Array.from({ length: count }).map((_, i) => (
      <div
        key={i}
        className="partner-section__logo"
        style={{ marginRight: i === count - 1 ? 0 : 80 }}
      />
    ))}
  </div>
)

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