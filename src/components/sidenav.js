import React from 'react'
import '../util/sidenav.scss';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
  } from "react-router-dom";

export default function Sidenav() {




    return(

    <header class="header" role="banner">
        <h1 class="logo">
            <a href="#">Leon <span>Lindqvist</span></a>
        </h1>
        <div class="nav-wrap">
            <nav class="main-nav" role="navigation">
            <ul class="unstyled list-hover-slide">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/resume">Resume</Link></li>
                <li><Link to="/publicblog">Blog</Link></li>
            </ul>
            </nav>
            {/* <ul class="social-links list-inline unstyled list-hover-slide">
            <li><a href="#">Twitter</a></li>
            <li><a href="#">Google+</a></li>
            <li><a href="#">GitHub</a></li>
            <li><a href="#">CodePen</a></li>
            </ul> */}
        </div>
    </header>
    // <div className="nav-wrap">
    //     <div className="main-nav">
    //         <div className="unstyled list-hover-slide">
    //             <ul>
    //             {/* className="active" */}
    //             <li >
    //                 <Link to="/">Home</Link>
    //             </li>
    //             <li>
    //                 <Link to="/about">About</Link>
    //             </li>
    //             <li>
    //                 <Link to="/resume">Resume</Link>
    //             </li>
    //             <li>
    //                 <Link to="/publicblog">Blog</Link>
    //             </li>
    //             </ul>
    //         </div>
    //     </div>
    // </div>
    )
}

