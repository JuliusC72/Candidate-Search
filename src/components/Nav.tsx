import { Link, useLocation } from 'react-router-dom';

const Nav = () => {
  const location = useLocation();
  
  return (
    <nav className="nav">
      <ul className="nav">
        <li className="nav-item">
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Search
          </Link>
        </li>
        <li className="nav-item">
          <Link 
            to="/SavedCandidates" 
            className={`nav-link ${location.pathname === '/SavedCandidates' ? 'active' : ''}`}
          >
            Saved Candidates
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;