import { Link } from "react-router-dom"

import '../index.css'; // Import your global styles here
import '../styles/bootstrap.min.css'; // Import the local Bootstrap CSS
//import '../styles/fonts/bootstrap-icons.min.css'; 

export function Navbar (){
    return(
        <nav className="navbar navbar-expand-lg bg-white border-bottom box-shadow">
            <div className="container">
                <Link className="navbar-brand" to="/"><img src="icon.png" alt="..." width="30" className="me-2"/>Visitors Records</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarScroll">
                <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" styles="--bs-scroll-height: 100px;">
                    <li className="nav-item">
                    {/* <Link className="nav-link text-dark" aria-current="page" to="/">Home</Link> */}
                    </li>
                    <li className="nav-item">
                    {/* <Link className="nav-link text-dark" to="/add">Add Record</Link> */}
                    </li>                                      
                </ul>
                {/* <ul className="navbar-nav">
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle text-dark" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Admin
                    </a>
                    <ul className="dropdown-menu">
                        <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                        <li><a className="dropdown-item" href="#">Settings</a></li>
                        <li><hr className="dropdown-divider"/></li>
                        <li><a className="dropdown-item" href="#">Logout</a></li>
                    </ul>
                    </li> 
                </ul> */}
                </div>
            </div>
        </nav>
    )
}

export function Footer() {
    return (
        <div className="text-center p-4 border-top">
            <img src="icon.png" alt="..." width="30" className="me-2"/>
            Visitors Records
        </div>
    )

}