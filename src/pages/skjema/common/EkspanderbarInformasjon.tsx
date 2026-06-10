import { ReactNode, useState } from 'react';
import { BodyShort, HStack } from '@navikt/ds-react';
import { ChevronDownIcon, ChevronUpIcon } from '@navikt/aksel-icons';

import { useIntl } from 'react-intl';
import { getMessage } from '../../../utils/intl';

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
        <div>
            <HStack gap="space-8" align="start" wrap={false}>
                {props.intro}
                <button type="button" onClick={onOpenPanel} aria-expanded={isOpen}>
                    <BodyShort>
                        {props.lesMerLabel ?? getMessage(intl, 'read.more')}
                        {isOpen ? <ChevronUpIcon aria-hidden /> : <ChevronDownIcon aria-hidden />}
                    </BodyShort>
                </button>
            </HStack>
            {isOpen && <div>{props.content}</div>}
        </div>
    );
}

export default EkspanderbarInformasjon;
