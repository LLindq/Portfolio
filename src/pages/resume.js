import React from 'react'
import '../util/global.scss';
import '../util/resume.scss';
import background from '../util/images/background.jpg';
import leon1 from '../util/images/leon1.png'

import Sidenav from '../components/sidenav';

export default function Resume() {
    return(<div className="containerHtml">

        <div className="lines">
            
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
        </div>
        <Sidenav />
        <div className="resumeMain">
            <div className="resumeTitle">
                LEON LINDQVIST
            </div>
            <div className="resumeSubtitle">
                FRONT END DEVELOPER IN THE MAKING
            </div>
            <div className="resumeContainer">
            <img className="resumeImg" src={leon1} />
            <div className="resumeText speech-bubble-resume">
            <div className="resumeSummary">
                <div className="studies"><b>2019-2021 - Front End Developer at Medieinstitutet</b></div>
                <div><b>2020-2021 - Support Technician at Tieto</b><div>First line support towards big healthcare organisations</div></div>
                <div><b>2018-2019 - IT Admin/Technician at Berättarministeriet</b><div>Full IT Responsibility in a Mac-oriented company </div></div>
                <div><b>2018-2018 - Technician/Assembler at Paam Systems AB</b><div>Installing and servicing high security safes</div></div>
                <div><b>2017-2018 - Support Technician at Nobina</b><div>First-Second-Thirdline Support for the nordic branches</div></div>
                <div><b>2009-2016 - IT Administrator at Birka Cruises</b><div>Full spectrum of IT administration, from purchase and installation to maintenance.</div></div>
                <div><b>2008-2009 - Hardware Technician at Telia</b><div>Hardware installation / purchase</div></div>
            </div>

            </div>
            </div>
        </div>
    
        <div className="copyrightInfo">
            <div className="info">leon.lindqvist@gmail.com</div>
            <div className="info">© 2020 Leon Lindqvist</div>
        </div>
            

    </div>)
}

