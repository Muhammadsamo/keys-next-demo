
import './Sign.scss'

type SignCTAProps = {
  text: string;
  link?: string;
  disabled?: boolean;
  className?: string;
  target?: '_blank' | '_self';
  showIcon?: boolean;
}

const SignCTA = ({ text, link, disabled, className, target = '_blank', showIcon = true }: SignCTAProps) => {
  const handleRedirect = () => {
    if (disabled) return;
    if (link) window.open(link, target)
  }

  return (
    <div className={`sign-cta ${className ? ` ${className}` : ''}`}>
      <button 
        onClick={handleRedirect}
        className="cta-button"
        disabled={disabled}
      >
        <div className="l-cta-text">
          <p>{text}</p>
        </div>
        {showIcon && (
          <div className="l-cta-icon">
            <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.89062 9H14.3906" stroke="#1C1C1E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M9.14062 3.75L14.3906 9L9.14062 14.25" stroke="#1C1C1E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        )}
      </button>
    </div>
  )
}

export default SignCTA