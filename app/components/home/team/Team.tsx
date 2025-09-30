import TeamMarquee from './marquee/TeamMarquee';
import Image from 'next/image';

interface TeamProps {
  teamData?: {
    heading?: string;
    description?: string;
    founderProfile?: {
      name?: string;
      slug?: string;
      imgage?: { url?: string };
      role?: string;
    };
    teamMembers?: Array<{
      name?: string;
      slug?: string;
      imgage?: { url?: string };
      role?: string;
    }>;
  };
}

const Team = ({ teamData }: TeamProps) => {
    return (
        <div className="t-container">
            <div className="t-wrapper">
                <div className="t-header">
                    <div className="t-heading">
                        <span className='dot'></span>
                        <h4>
                            {teamData?.heading || 'Meet the team'}
                        </h4>
                    </div>
                    <div className="t-desc">
                        <p>
                            {teamData?.description || 'Led by Hasan Daudpota, Founder & CEO, with 15+ years of global experience, Keys Productions brings world-class event execution to Pakistan.'}
                        </p>
                    </div>
                </div>
                <div className="bot-content">
                    <div className="left">
                        <div className="t-profile">
                            <div className="t-img">
                                <Image 
                                    src={teamData?.founderProfile?.imgage?.url || "/team/hasan-daudpota.webp"} 
                                    alt="ceo image" 
                                    width={500} 
                                    height={500} 
                                />
                            </div>
                            <div className="profile-text">
                                <div className="name">
                                    <h5>
                                        {teamData?.founderProfile?.name || 'Hasan Daudpota'}
                                    </h5>
                                </div>
                                <div className="role">
                                    <p>
                                        {teamData?.founderProfile?.role || 'Founder & CEO'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="right">
                        <TeamMarquee teamData={teamData} />
                        <div className="t-indicator">
                            <div className="drag-img">
                                <Image src="/team/indicator.svg" alt="double arrow for scrolling on phone" width={50} height={50} />
                            </div>
                            <p>Drag with two fingers to scroll</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Team