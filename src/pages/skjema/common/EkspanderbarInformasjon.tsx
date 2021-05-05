import * as React from "react";
import {ReactNode, useState} from "react";
import {Collapse} from "react-collapse";
import NavFrontendChevron from "nav-frontend-chevron";
import {Normaltekst} from "nav-frontend-typografi";

import './EkspanderbarInformasjon.less'

interface EkspanderbarInformasjonProps {
    introText?: string;
    contentText?: string;
    lesMerLabel?: string;
}

function EkspanderbarInformasjon(props: EkspanderbarInformasjonProps) {
    const [isOpen, setIsOpen] = useState(false);

    const onOpenPanel = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div className="EkspanderbarInformasjon">
            <div className="EkspanderbarInformasjon__intro">
                <Normaltekst>
                    {props.introText}
                </Normaltekst>
                <button type="button" className="EkspanderbarInformasjon__intro__lesMerKnapp" onClick={onOpenPanel} aria-expanded={isOpen}>
                    <Normaltekst className="EkspanderbarInformasjon__intro__lesMerKnapp__content" >
                        {props.lesMerLabel ?? 'Les mer'}
                        <NavFrontendChevron type={isOpen ? 'opp' : 'ned'}/>
                    </Normaltekst>
                </button>
            </div>
            <Collapse isOpened={isOpen}>{props.contentText}</Collapse>
        </div>
    )
}

export default EkspanderbarInformasjon