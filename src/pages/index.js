import React from 'react'
import '../util/global.scss';
import '../util/index.scss';
import background from '../util/images/background.jpg';
import leon2 from '../util/images/leon2.png'

import Sidenav from '../components/sidenav';

export default function Index() {

    // const bgStyle = {
    //     width: "100%",
    //     margin: 0,
    //     padding: 0,
    //     height: "100%",
    //     backgroundImage: `url(${background})`,
    //     backgroundSize: "cover"
    // };
    // return(<div style={bgStyle}>
       return(<div>

        <div className="lines">
            
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
        </div>
        <Sidenav />
        <div className="indexMain">
            <div className="indexTitle">
            LEON LINDQVIST
            
            </div>
            <div className="indexSubtitle">
            FRONT END DEVELOPER IN THE MAKING
            </div>
            {/* <div className="indexSub"> */}
                <img className="indexImg" src={leon2} />
                <div className="indexText speech-bubble">
                    Welcome to my portfolio.
                    I am a web developer on his way up.
                    I slept through school and disliked coding, alot.
                    And yet here i am programming my way through life in the end anyway.

                    Hehe.
                </div>
            {/* </div> */}

        </div>
        <div className="ovals">
            <div className="oval">Developer</div>
            <div className="oval">Technician</div>
            <div className="oval">Nerd</div>
        </div>

        <div className="copyrightInfo">
            <div className="info">leon.lindqvist@gmail.com</div>
            <div className="info">© 2020 Leon Lindqvist</div>
        </div>
            

    </div>)
}

