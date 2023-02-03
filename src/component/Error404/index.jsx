import { NavLink } from 'react-router-dom';
import './styles.css';

const Error404 = () => {
  return (
    <div className='errorPage'>
        <NavLink className="dropdown-item" to={`/`}>
            <span id="logo">Return to Home</span>
        </NavLink>
        <p>
            <b>404.</b> <ins>That’s an error.</ins>
        </p>
        <p>
            The requested URL <code>/error</code> was not found on this server.  <ins>That’s all we know.</ins>
        </p>
    </div>
  )
}

export default Error404