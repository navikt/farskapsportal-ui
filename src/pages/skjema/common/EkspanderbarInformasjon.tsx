import { ReactNode, useState } from 'react';
import { BodyShort } from '@navikt/ds-react';
import { ChevronDownIcon, ChevronUpIcon } from '@navikt/aksel-icons';

import { useIntl } from 'react-intl';
import { getMessage } from '../../../utils/intl';

import './EkspanderbarInformasjon.css';

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
                    <BodyShort className="EkspanderbarInformasjon__intro__lesMerKnapp__content">
                        {props.lesMerLabel ?? getMessage(intl, 'read.more')}
                        {isOpen ? <ChevronUpIcon aria-hidden /> : <ChevronDownIcon aria-hidden />}
                    </BodyShort>
                </button>
            </div>
            {isOpen && <div>{props.content}</div>}
        </div>
    );
}

export default EkspanderbarInformasjon;
