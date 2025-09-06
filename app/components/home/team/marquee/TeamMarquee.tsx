'use client'
import './TeamMarquee.scss';
import { useRef, useState, useEffect, useLayoutEffect } from 'react';
import { FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';
import { createPortal } from 'react-dom';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { useIsMobile } from '../../../../hooks/useWindowSize';
import Image from 'next/image';

const ANIMATION_DURATION = 350;
const CLICK_DRAG_THRESHOLD = 8; // px

const defaultTeamMembers = [
  { name: 'Hasan Daudpota', role: 'Founder & CEO', image: '/team/hasan-daudpota.webp' },
  { name: 'Munisa Amin', role: 'COO', image: '/team/munisa-amin-coo.webp' },
  { name: 'Ahsan Bari', role: 'Partner', image: '/team/ahsan-bari.webp' },
  { name: 'Mehdi Maloof', role: 'Partner', image: '/team/mehdi-maloof.webp' },
  { name: 'Kainaat Zulfiqar', role: 'Creative Designer & Strategist', image: '/team/kainat-zulfiqar.webp' },
  { name: 'Raheela Parveen Joyo', role: 'Project Manager', image: '/team/raheela.webp' },
  { name: 'Ume Kulsoom Baloch', role: 'PR Manager', image: '/team/Ume-kulsoom.webp' },
  { name: 'Yumna Ibrahim', role: 'PR and Social Media Executive', image: '/team/yumna-ibrahim.webp' },
  { name: 'Muskaan Raza', role: 'Campaign Manager', image: '/team/muskaan-raza.webp' },
  { name: 'Rana Ahmed Javed', role: 'Head of Design Department', image: '/team/rana-ahmed-javed.webp' },
  { name: 'Syed Umair Hassan Tirmizi', role: 'Senior Creative Designer', image: '/team/syed-umair.webp' },
  { name: 'Ayesha Jamal', role: 'Freelance Illustrator', image: '/team/ayesha-jamal.webp' },
];

interface TeamMarqueeProps {
  teamData?: {
    teamMembers?: Array<{
      name?: string;
      slug?: string;
      image?: { url?: string };
      role?: string;
    }>;
  };
}

const TeamMarquee = ({ teamData }: TeamMarqueeProps) => {
  const teamMembers = teamData?.teamMembers?.map(member => ({
    name: member.name || '',
    role: member.role || '',
    image: member.image?.url || ''
  })) || defaultTeamMembers;
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [translateY, setTranslateY] = useState(0);
  const animationRef = useRef<number | undefined>(undefined);
  const speedRef = useRef(100);
  const touchStartYRef = useRef<number | null>(null);
  const [overlayIndex, setOverlayIndex] = useState<number | null>(null);
  const [pauseAnimation, setPauseAnimation] = useState(false);
  const [overlayState, setOverlayState] = useState<'entering' | 'entered' | 'exiting' | null>(null);
  const [slideState, setSlideState] = useState<'slide-active' | 'slide-next' | 'slide-prev'>('slide-active');
  // const [imgHoverIdx, setImgHoverIdx] = useState<number | null>(null);
  const isMobile = useIsMobile(1250);
  const [lastScrollY, setLastScrollY] = useState(0);
  const dragStartYRef = useRef<number | null>(null);
  const dragMovedRef = useRef<boolean>(false);


  const getClientY = (e: React.MouseEvent | React.TouchEvent) => {
    if ('touches' in e) return e.touches[0].clientY;
    return (e as React.MouseEvent).pageY;
  };

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (!marqueeRef.current) return;
    setIsDragging(true);
    setStartY(getClientY(e) - translateY);
    dragStartYRef.current = getClientY(e);
    dragMovedRef.current = false;
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    const wrapper = document.getElementById('smooth-wrapper');
    if (wrapper) wrapper.style.overflow = 'hidden';
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || !marqueeRef.current) return;
    e.preventDefault();
    const clientY = getClientY(e);
    if (dragStartYRef.current !== null && Math.abs(clientY - dragStartYRef.current) > CLICK_DRAG_THRESHOLD) {
      dragMovedRef.current = true;
    }
    const listHeight = marqueeRef.current.scrollHeight / 2;
    let newY = clientY - startY;

    if (newY > 0) {
      newY = -listHeight + (newY % listHeight);
      setStartY(clientY - newY);
    } else if (newY < -listHeight) {
      newY = -(newY % listHeight);
      setStartY(clientY - newY);
    }

    setTranslateY(newY);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    dragStartYRef.current = null;
    dragMovedRef.current = false;
  };

  // For click vs drag on card
  const handleCardMouseDown = (e: React.MouseEvent, _: number) => {
    handleDragStart(e);
    dragStartYRef.current = getClientY(e);
    dragMovedRef.current = false;
  };

  const handleCardMouseUp = (_: React.MouseEvent, idx: number) => {
    if (!dragMovedRef.current) {
      setOverlayIndex(idx % teamMembers.length);
    }
    handleDragEnd();
  };

  const handleCardTouchStart = (e: React.TouchEvent, _: number) => {
    handleTouchStart(e);
    dragStartYRef.current = getClientY(e);
    dragMovedRef.current = false;
  };

  const handleCardTouchEnd = (_: React.TouchEvent, idx: number) => {
    if (!dragMovedRef.current) {
      setOverlayIndex(idx % teamMembers.length);
    }
    handleTouchEnd();
  };

  useEffect(() => {
    let lastTime = performance.now();
    let translateYValue = translateY;

    const animate = () => {
      if (!isDragging && !pauseAnimation) {
        const currentTime = performance.now();
        const delta = currentTime - lastTime;

        if (marqueeRef.current) {
          const listHeight = marqueeRef.current.scrollHeight / 2;
          translateYValue -= (speedRef.current * delta) / 1000;

          if (Math.abs(translateYValue) >= listHeight) {
            translateYValue = 0;
          }

          marqueeRef.current.style.transform = `translateY(${translateYValue}px)`;

          if (Math.abs(translateYValue - translateY) > 1) {
            setTranslateY(translateYValue);
          }
        }
        lastTime = currentTime;
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isDragging, pauseAnimation]);

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartYRef.current = touch.clientY;
    setIsDragging(true);
    setStartY(touch.clientY - translateY);
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !marqueeRef.current) return;
    const touch = e.touches[0];
    if (dragStartYRef.current !== null && Math.abs(touch.clientY - dragStartYRef.current) > CLICK_DRAG_THRESHOLD) {
      dragMovedRef.current = true;
    }
    const listHeight = marqueeRef.current.scrollHeight / 2;
    let newY = touch.clientY - startY;

    if (newY > 0) {
      newY = -listHeight + (newY % listHeight);
      setStartY(touch.clientY - newY);
    } else if (newY < -listHeight) {
      newY = -(newY % listHeight);
      setStartY(touch.clientY - newY);
    }

    setTranslateY(newY);
  };

  const handleTouchEnd = () => {
    touchStartYRef.current = null;
    setIsDragging(false);
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
  };

  useEffect(() => {
    if (overlayIndex !== null) {
      const handleScroll = () => {
        const currentScrollY = window.scrollY;
        const isScrollingUp = currentScrollY > lastScrollY;
        if (isMobile && isScrollingUp) {
          setOverlayIndex(null);
        } else if (!isMobile) {
          setOverlayIndex(null);
        }
        setLastScrollY(currentScrollY);
      };
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [overlayIndex, isMobile, lastScrollY]);

  useEffect(() => {
    if (overlayIndex !== null && overlayState !== 'entered') {
      setOverlayState('entering');
      setTimeout(() => setOverlayState('entered'), 10);
    }
    if (overlayIndex === null && overlayState) {
      setOverlayState('exiting');
      setTimeout(() => setOverlayState(null), ANIMATION_DURATION);
    }
  }, [overlayIndex]);

  useLayoutEffect(() => {
    const smoother = ScrollSmoother.get();
    if (smoother) smoother.paused(overlayIndex !== null);
  }, [overlayIndex]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSlideState('slide-prev');
    setTimeout(() => {
      setOverlayIndex(prev => prev !== null ? (prev - 1 + teamMembers.length) % teamMembers.length : null);
      setSlideState('slide-active');
    }, ANIMATION_DURATION / 2);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSlideState('slide-next');
    setTimeout(() => {
      setOverlayIndex(prev => prev !== null ? (prev + 1) % teamMembers.length : null);
      setSlideState('slide-active');
    }, ANIMATION_DURATION / 2);
  };

  const handleClose = () => {
    setOverlayIndex(null)
    const smoother = ScrollSmoother.get();
    if (smoother) smoother.paused(false);
  };

  return (
    <div className="team-marquee-container">
      <div className="team-marquee-viewport">
        <div
          ref={marqueeRef}
          className="team-marquee-list"
          style={{
            transform: `translateY(${translateY}px)`,
            transition: isDragging ? 'none' : 'transform 0ms linear',
            touchAction: 'none'
          }}
        >
          {teamMembers.concat(teamMembers).map((member, idx) => (
            <div
              className="team-card"
              key={idx}
              style={{ userSelect: 'none' }}
              onMouseDown={e => handleCardMouseDown(e, idx)}
              onMouseMove={handleDragMove}
              onMouseUp={e => handleCardMouseUp(e, idx)}
              onTouchStart={e => handleCardTouchStart(e, idx)}
              onTouchMove={handleTouchMove}
              onTouchEnd={e => handleCardTouchEnd(e, idx)}
              onTouchCancel={handleTouchEnd}
              onMouseEnter={() => { setPauseAnimation(true); ; }}
              onMouseLeave={() => {
                handleDragEnd();
                setPauseAnimation(false);
                // setImgHoverIdx(null);
              }}
            >
              <div className="team-card-img">
                <div className="team-img-circle">
                  <Image
                    className="team-profile-img"
                    src={member.image}
                    alt={`Image of ${member.name}`}
                    width={400}
                    height={400}
                    style={{ cursor: 'pointer' }}
                  />
                  {/* {(isMobile || imgHoverIdx === idx) && (
                    <div className="team-card-img-arrow">
                      <FaChevronRight />
                    </div>
                  )} */}
                </div>
              </div>
              <div className="team-card-info">
                <div className="team-card-name">{member.name}</div>
                <div className="team-card-role">{member.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="team-marquee-overlay"></div>

      {((overlayIndex !== null && overlayState) || overlayState === 'exiting') &&
        createPortal(
          <div className={`team-member-overlay ${overlayState || ''}`.trim()} onClick={handleClose}>
            <div className={`team-member-overlay-content ${slideState}`.trim()} onClick={e => e.stopPropagation()}>
              <div className="team-member-overlay-left">
                <div className="t-header">
                  <div className="t-heading">
                    <span className='dot'></span>
                    <h4>Meet</h4>
                  </div>
                </div>
                <div className="team-member-overlay-name">{teamMembers[overlayIndex ?? 0].name}</div>
                <div className="team-member-overlay-role">{teamMembers[overlayIndex ?? 0].role}</div>
              </div>
              <div className="team-member-overlay-right">
                <div
                  className="team-member-overlay-backdrop"
                  style={{
                    backgroundImage: `url(${teamMembers[overlayIndex ?? 0].image})`,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 0,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
                <Image
                  src={teamMembers[overlayIndex ?? 0].image}
                  alt={teamMembers[overlayIndex ?? 0].name}
                  className="team-member-overlay-img"
                  width={400}
                  height={400}
                  priority
                  style={{ position: 'relative', zIndex: 1 }}
                />
                <div className="team-member-overlay-nav">
                  <button className="team-member-nav-btn" onClick={handlePrev} aria-label="Previous">
                    <FaChevronLeft />
                  </button>
                  <button className="team-member-nav-btn" onClick={handleNext} aria-label="Next">
                    <FaChevronRight />
                  </button>
                </div>
              </div>
              <button className="team-member-overlay-close" onClick={handleClose} aria-label="Close">
                <FaTimes />
              </button>
            </div>
          </div>,
          document.body
        )
      }
    </div>
  );
};

export default TeamMarquee;
