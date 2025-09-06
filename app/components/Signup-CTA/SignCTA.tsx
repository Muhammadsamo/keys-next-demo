
import './Sign.scss'
const SignCTA = () => {
  const handleRedirect = () => {
    // You can change this URL to your desired destination
    window.open('https://example.com', '_blank')
  }

  return (
    <div className="sign-cta">
      <button 
        onClick={handleRedirect}
        className="cta-button"
      >
        Coming soon 
      </button>
    </div>
  )
}

export default SignCTA