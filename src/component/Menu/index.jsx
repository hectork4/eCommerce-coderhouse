import './styles.css'

export const Menu = ({children}) => {
  return (
    <div id="navbarNav" style={{flexGrow: 1, marginLeft: '30px'}}>
        <ul className="navbar-nav">
            {children}
        </ul>
    </div>
  )
}
