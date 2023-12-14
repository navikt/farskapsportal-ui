import * as React from 'react';
import { ReactNode, useState } from 'react';
import { Collapse } from 'react-collapse';
import NavFrontendChevron from 'nav-frontend-chevron';
import { Normaltekst } from 'nav-frontend-typografi';

import { useIntl } from 'react-intl';
import { getMessage } from '../../../utils/intl';

import './EkspanderbarInformasjon.less';

interface EkspanderbarInformasjonProps {
    intro?: ReactNode;
    content?: ReactNode;
    lesMerLabel?: string;
}

function EkspanderbarInformasjon(props: EkspanderbarInformasjonProps) {
    const intl = useIntl();
    const [isOpen, setIsOpen] = useState(false);

    const onOpenPanel = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="EkspanderbarInformasjon">
            <div className="EkspanderbarInformasjon__intro">
                {props.intro}
                <button
                    type="button"
                    className="EkspanderbarInformasjon__intro__lesMerKnapp"
                    onClick={onOpenPanel}
                    aria-expanded={isOpen}
                >
                    <Normaltekst className="EkspanderbarInformasjon__intro__lesMerKnapp__content">
                        {props.lesMerLabel ?? getMessage(intl, 'read.more')}
                        <NavFrontendChevron type={isOpen ? 'opp' : 'ned'} />
                    </Normaltekst>
                </button>
            </div>
            {isOpen && <Collapse isOpened={isOpen}>{props.content}</Collapse>}
        </div>
    );
}

export default EkspanderbarInformasjon;
