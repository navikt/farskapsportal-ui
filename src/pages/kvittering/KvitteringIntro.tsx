import { CheckmarkCircleFillIcon } from '@navikt/aksel-icons';
import { Box } from '@navikt/ds-react';
import { Heading } from '@navikt/ds-react';
import { FormattedMessage, useIntl } from 'react-intl';

import { Farskapserklaering } from 'types/farskapserklaering';
import { isBrukerFar } from 'utils/farskapserklaering';
import { formatDate } from 'utils/intl';

import './KvitteringIntro.css';

interface KvitteringIntroProps {
    erklaering: Farskapserklaering;
}

function KvitteringIntro({ erklaering }: KvitteringIntroProps) {
    return (
        <Box className="KvitteringIntro" borderWidth="1" borderColor="neutral-subtle" borderRadius="4" padding="space-16">
            <CheckmarkCircleFillIcon
                id="success-icon"
                aria-label="Success icon"
                role="img"
            />
            <div>
                {isBrukerFar(erklaering) ? (
                    <KvitteringIntroFar erklaering={erklaering} />
                ) : (
                    <KvitteringIntroMor erklaering={erklaering} />
                )}
            </div>
        </Box>
    );
}

function KvitteringIntroMor({ erklaering }: { erklaering: Farskapserklaering }) {
    const intl = useIntl();

    const farSignert = (signertAvFar: string) => (
        <>
            <Heading level="2" size="small">
                <FormattedMessage
                    id="kvittering.intro.mor.farSignert"
                    values={{ date: formatDate(intl, signertAvFar) }}
                />{' '}
                {erklaering.barn?.termindato ? (
                    <>
                        <FormattedMessage
                            id="kvittering.intro.termindato"
                            values={{ termindato: formatDate(intl, erklaering.barn?.termindato) }}
                        />
                    </>
                ) : (
                    <>
                        <FormattedMessage
                            id="kvittering.intro.foedselsnummer"
                            values={{ fnr: erklaering.barn?.foedselsnummer ?? '' }}
                        />
                    </>
                )}
            </Heading>
        </>
    );

    const farIkkeSignert = () => {
        return (
            <>
                <Heading level="2" size="small">
                    <FormattedMessage
                        id="kvittering.intro.mor.1"
                        values={{ date: formatDate(intl, erklaering.dokument?.signertAvMor ?? '') }}
                    />
                </Heading>
                {/*<BodyShort>*/}
                {/*    <FormattedMessage id="kvittering.intro.mor.2" />*/}
                {/*</BodyShort>*/}
                {/*<BodyShort>*/}
                {/*    <FormattedMessage id="kvittering.intro.mor.3" />*/}
                {/*</BodyShort>*/}
            </>
        );
    };

    return erklaering.dokument?.signertAvFar
        ? farSignert(erklaering.dokument.signertAvFar)
        : farIkkeSignert();
}

function KvitteringIntroFar({ erklaering }: { erklaering: Farskapserklaering }) {
    const intl = useIntl();

    return (
        <>
            <Heading level="2" size="small">
                <FormattedMessage
                    id="kvittering.intro.far.1"
                    values={{ date: formatDate(intl, erklaering.dokument?.signertAvFar ?? '') }}
                />{' '}
                {erklaering.barn?.termindato ? (
                    <>
                        <FormattedMessage
                            id="kvittering.intro.termindato"
                            values={{ termindato: formatDate(intl, erklaering.barn?.termindato) }}
                        />
                    </>
                ) : (
                    <>
                        <FormattedMessage
                            id="kvittering.intro.foedselsnummer"
                            values={{ fnr: erklaering.barn?.foedselsnummer ?? '' }}
                        />
                    </>
                )}
            </Heading>
            {/*<BodyShort>*/}
            {/*    <FormattedMessage id="kvittering.intro.far.2" />*/}
            {/*</BodyShort>*/}
        </>
    );
}

export default KvitteringIntro;
