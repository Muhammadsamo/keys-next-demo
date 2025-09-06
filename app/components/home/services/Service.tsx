'use client'
import  { useState } from 'react';
import { useIsMobile } from '../../../hooks/useWindowSize';
import Image from 'next/image';

interface ServiceProps {
  serviceData?: {
    heading?: string;
    description?: string;
    yearsOfExperience?: { number?: number; text?: string };
    serviceItems?: Array<{ service?: string; description?: string }>;
  };
}

const Service = ({ serviceData }: ServiceProps) => {
  const [isServiceHovered, setIsServiceHovered] = useState(false);
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const isMobile = useIsMobile(1250);
  const services = serviceData?.serviceItems || [
    {
      service: 'PR & Social Media Management',
      description:
        "Running unique PR campaigns and building a strong digital presence. From media placements to influencer collaborations and content creation, we help brands stay active and engaging across platforms.",
    },
    {
      service: 'Digital Content & Strategy',
      description:
        "Creating powerful digital content that speaks the brand's language. From content production to full-fledged social media and PR strategies, every idea is shaped to strengthen digital identity and connect with the right audience.",
    },
    {
      service: 'Brand Activations',
      description:
        "Bringing brands to life. From product launches to fascinating pop-ups, Keys creates meaningful, on-ground interactions that connect brands directly with your audience.",
    },
    {
      service: 'Event Production',
      description:
        "Turning ideas into experiences. From high-energy concerts and glamorous award shows to corporate events, every detail is designed to make the event stand out.",
    },
    {
      service: 'And more.',
      description:
        "Whatever your vision, we make it happen.",
    },
  ];

  return (
    <div id="services" className='s-container'>
      <div className={`s-graphic${isServiceHovered ? ' graphic-faded' : ''}`} data-speed="0.5">
        <Image src="/services/work.svg" alt="graphic element" width={200} height={200} />
      </div>
      <div className="s-wrapper">
        <div className="s-header">
          <div className='s-left'>
            <div className="s-heading">
              <h2>
                <span className='dot'></span> {serviceData?.heading || 'what we do'}
              </h2>
            </div>
            <div className="s-description">
              <p>
                {serviceData?.description || "With over 2,500 successful projects, from corporate events and concerts to brand launches and award shows, we've done it all. Our Core Services"}
              </p>
            </div>
          </div>
          <div className="s-right">
            <div className="a-years" >
              <div className="a-numbers">
                <div className="a-number">
                  <p>{serviceData?.yearsOfExperience?.number || 15}</p>
                </div>
                <div className="a-icon">
                  <p>+</p>
                </div>
              </div>
              <div className="year-tag">
                <p>{serviceData?.yearsOfExperience?.text || 'Years of Experience'}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="s-list">
          <ul className='services'>
            {services.map((service, idx) => (
              <li
                className={`service${isMobile && openIdx === idx ? ' active' : ''}`}
                key={service.service || service.title}
                data-lag={(0.2 + idx * 0.1).toFixed(1)}
                onMouseEnter={!isMobile ? () => setIsServiceHovered(true) : undefined}
                onMouseLeave={!isMobile ? () => setIsServiceHovered(false) : undefined}
                onClick={isMobile ? () => setOpenIdx(openIdx === idx ? null : idx) : undefined}
                style={isMobile ? { cursor: 'pointer' } : {}}
              >
                <h3>{service.service || service.title}</h3>
                <span className={isMobile ? (openIdx === idx ? 'open' : 'closed') : ''}>
                  {service.description}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Service