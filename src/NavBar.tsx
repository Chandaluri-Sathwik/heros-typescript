import { Link } from "react-router-dom";
const NavBar = () => {
    return ( 
        <nav className="navbar">
            <h1>Tour of Heroes</h1>
            <div className="links">
                <Link to="/">DashBoard</Link>
                <Link to="/heros">Heroes</Link>
            </div>
        </nav>
     );
}
 
export default NavBar;