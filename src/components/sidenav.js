import React, {useState} from 'react'
import '../util/sidenav.scss';
import logoW from '../util/images/logoW.png';
import logoB from '../util/images/logoB.png';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
  } from "react-router-dom";

export default function Sidenav() {

    const [logoImg, setLogoImg] = useState(logoW);
    const [toggle, setToggle] = useState(true);
    function changeLogo(){
        setToggle(!toggle);
    }
    


    return(

    <header className="header" role="banner">
        <h1 className="logo">
            <img src={toggle ? logoW : logoB} className="myLogo" onClick={changeLogo}/>
        </h1>
        <div className="nav-wrap">
            <nav className="main-nav" role="navigation">
            <ul className="unstyled list-hover-slide">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/resume">Resume</Link></li>
                <li><Link to="/publicblog">Blog</Link></li>
            </ul>
            </nav>
            </div>
    </header>
    )
}

