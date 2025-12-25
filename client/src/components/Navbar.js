import { Link } from "react-router-dom";
import 'bootstrap/dist/js/bootstrap.bundle.min'; // Ensure bootstrap JS is imported for toggle

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg fixed-top" style={{
      background: 'rgba(15, 23, 42, 0.8)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(255,255,255,0.05)'
    }}>
      <div className="container">
        <Link className="navbar-brand fw-bold fs-4" to="/">
          <span className="text-gradient">Portfolio</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{ borderColor: 'rgba(255,255,255,0.1)' }}
        >
          <span className="navbar-toggler-icon" style={{ filter: 'invert(1)' }}></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto gap-3">
            {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
              <li className="nav-item" key={item}>
                <Link
                  className="nav-link text-light opacity-75 hover-opacity-100"
                  to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                  style={{ transition: 'opacity 0.3s' }}
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
