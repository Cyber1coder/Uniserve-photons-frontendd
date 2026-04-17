import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <h2>UniServe - Photons</h2>
      <div>
        <Link to="/">Home</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/history">History</Link>
      </div>
    </nav>
  );
}

export default Navbar;