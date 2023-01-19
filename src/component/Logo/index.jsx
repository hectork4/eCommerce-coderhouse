import './styles.css'

const Logo = (props) => {
  const {logo = null, text = null} = props;
  if(!logo && !text) return null

  return (
    <a href='#' className='logo-wrapper'>
        {logo && <img src={logo} alt='logo' />}
        {text && <h3>{text}</h3>}
    </a>
  )
}

export default Logo