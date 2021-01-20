import React from 'react'
import '../util/global.scss';
import '../util/index.scss';
import leon2 from '../util/images/leon2.png';
import Sidenav from '../components/sidenav';

export default function Index() {
    return(
    <div className="containerHtml" >
        <Sidenav />
        <div className="indexMain">
            <div className="indexTitle">
                LEON LINDQVIST
            </div>
            <div className="indexSubtitle">
                FRONT END DEVELOPER IN THE MAKING
            </div>
                <img className="indexImg" src={leon2} />
                <div className="indexText speech-bubble">
                    <div>Hello! Welcome to my portfolio.</div><br />
                    <div>I am a web developer who went from disliking code to enjoying it tremendously. Early on i had little passion for coding, but eventually found the satisfaction in creating with my own hands.</div><br />
                    <div>I live and work in Stockholm and have spent quite a few years as various administrative and supportive roles within IT, but eventually came to a point where i wanted something more creative.</div><br />
                    <div>Problem solving has become the core of what i do professionally, i only recently shifted that focus from peoples technical issues, to understanding javascript instead!</div><br />
                    <div>I have always had a deep love for video games of every kind, along with working out in various ways. Its all about balance for the mind and body!</div>
                </div>
        </div>
        <div className="copyrightInfo">
            <div className="info">leon.lindqvist@gmail.com</div>
            <div className="info">© 2020 Leon Lindqvist</div>
        </div>
    </div>)
}

