import { Alert, BodyShort, Box, HStack } from '@navikt/ds-react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Farskapserklaering } from 'types/farskapserklaering';
import { isBrukerFar } from 'utils/farskapserklaering';
import { formatDate } from 'utils/intl';

interface KvitteringIntroProps {
    erklaering: Farskapserklaering;
}

function KvitteringIntro({ erklaering }: KvitteringIntroProps) {
    return (
        <Alert variant="success">
            <HStack align="start" gap="space-16">
                {isBrukerFar(erklaering) ? (
                    <KvitteringIntroFar erklaering={erklaering} />
                ) : (
                    <KvitteringIntroMor erklaering={erklaering} />
                )}
            </HStack>
        </Alert>
    );
}

function KvitteringIntroMor({ erklaering }: { erklaering: Farskapserklaering }) {
    const intl = useIntl();

    const farSignert = (signertAvFar: string) => (
        <BodyShort>
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
        </BodyShort>
    );

    const farIkkeSignert = () => {
        return (
            <>
                <BodyShort>
                    <FormattedMessage
                        id="kvittering.intro.mor.1"
                        values={{ date: formatDate(intl, erklaering.dokument?.signertAvMor ?? '') }}
                    />
                </BodyShort>
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
            <BodyShort>
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
            </BodyShort>
            {/*<BodyShort>*/}
            {/*    <FormattedMessage id="kvittering.intro.far.2" />*/}
            {/*</BodyShort>*/}
        </>
    );
}

export default KvitteringIntro;
