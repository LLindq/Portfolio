import React from 'react'
import '../util/global.scss';
import '../util/about.scss';
import leon1 from '../util/images/leon1.png'
import Sidenav from '../components/sidenav';

export default function About() {

       return(
       <div>
        <Sidenav />
        <div className="aboutMain">
            <div className="aboutTitle">
                LEON LINDQVIST
            </div>
            <div className="aboutSubtitle">
                FRONT END DEVELOPER IN THE MAKING
            </div>
            <div className="aboutContainer">
            <img className="aboutImg" src={leon1} />
            <div className="aboutText speech-bubble-about">
                <div>I live and work in Stockholm.</div>
                <div>I have spent quite a few years working as as various administrative and supportive roles within IT, but eventually came to a point where i wanted something more creative.</div>
                <div>Problem solving has become the core of what i do professionally, i only recently shiftedthat focus from peoples technical issues, to understanding javascript instead!</div>
                <div>I have always had a deep love for video games of every kind, along with working outin various ways. Its all about balance for the mind and body!</div>
            </div>
            </div>
        </div>
        <div className="copyrightInfo">
            <div className="info">leon.lindqvist@gmail.com</div>
            <div className="info">© 2020 Leon Lindqvist</div>
        </div>
    </div>)
}

