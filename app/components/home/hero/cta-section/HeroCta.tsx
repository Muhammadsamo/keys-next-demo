import './HeroCta.scss'
import Banner from '../../../signup-banner/Banner'
import Image from 'next/image'

interface HeroCtaProps {
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

const HeroCta = ({ bannerData }: HeroCtaProps) => {
    return (
        <div id="sign"className='hc-wrapper'>
            <Banner bannerData={bannerData}/>
            <div className="hc-bg">
                <Image src="/hero/purpliner.svg" alt="back-ground element" width={800} height={600} />
            </div>

        </div>
    )
}

export default HeroCta