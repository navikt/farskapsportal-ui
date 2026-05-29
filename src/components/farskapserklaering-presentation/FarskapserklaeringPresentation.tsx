import { Box } from '@navikt/ds-react';
import { BodyShort, Heading, Label } from '@navikt/ds-react';
import { FormattedMessage } from 'react-intl';

import DatePresentation from 'components/date-presentation/DatePresentation';
import { Farskapserklaering } from 'types/farskapserklaering';
import { isBorSammen } from 'utils/farskapserklaering';
import { formatFoedselsnummer } from 'utils/foedselsnummer';
import { getNameFromForelder } from 'utils/name';

import './FarskapserklaeringPresentation.css';

interface FarskapserklaeringPresentationProps {
    farskapserklaering: Farskapserklaering;
    showTitle?: boolean;
    showBorSammen?: boolean;
    border?: boolean;
}

function FarskapserklaeringPresentation({
    farskapserklaering,
    showTitle = true,
    showBorSammen = true,
    border,
}: FarskapserklaeringPresentationProps) {
    return (
        <Box className="FarskapserklaeringPresentation" borderWidth={border ? '1' : '0'} padding="space-16" borderColor="neutral-subtle" borderRadius="4">
            {showTitle && (
                <Heading level="2" size="medium" as="p" className="FarskapserklaeringPresentation__title">
                    <FormattedMessage id="farskapserklaering" />
                </Heading>
            )}
            <Heading level="3" size="small" as="p">
                <FormattedMessage id="farskapserklaering.aboutChildren" />
            </Heading>
            <div className="FarskapserklaeringPresentation__barn">
                {farskapserklaering.barn?.termindato ? (
                    <>
                        <Label>
                            <FormattedMessage id="farskapserklaering.expectingChildren" />
                        </Label>
                        <BodyShort>
                            <FormattedMessage id="termindato" />{' '}
                            <DatePresentation date={farskapserklaering.barn.termindato} />
                        </BodyShort>
                    </>
                ) : (
                    <>
                        <Label>
                            <FormattedMessage id="farskapserklaering.bornChildren" />
                        </Label>
                        <BodyShort>
                            <FormattedMessage id="foedselsnummer" />{' '}
                            {formatFoedselsnummer(farskapserklaering.barn?.foedselsnummer ?? '')}
                        </BodyShort>
                    </>
                )}
            </div>
            <Heading level="3" size="small" as="p">
                <FormattedMessage id="farskapserklaering.parents" />
            </Heading>
            <div className="FarskapserklaeringPresentation__foreldre">
                <div className="FarskapserklaeringPresentation__foreldre__mor">
                    <Label>
                        <FormattedMessage id="mor" />
                    </Label>
                    <BodyShort>{getNameFromForelder(farskapserklaering.mor)}</BodyShort>
                    <BodyShort>
                        {formatFoedselsnummer(farskapserklaering.mor?.foedselsnummer ?? '')}
                    </BodyShort>
                </div>
                <div>
                    <Label>
                        <FormattedMessage id="far" />
                    </Label>
                    <BodyShort>{getNameFromForelder(farskapserklaering.far)}</BodyShort>
                    <BodyShort>
                        {formatFoedselsnummer(farskapserklaering.far?.foedselsnummer ?? '')}
                    </BodyShort>
                </div>
            </div>
            {showBorSammen && farskapserklaering.farBorSammenMedMor !== null && (
                <>
                    <Heading level="3" size="small" as="p" className="FarskapserklaeringPresentation__borSammen">
                        <FormattedMessage id="farskapserklaering.borSammen" />
                    </Heading>
                    <BodyShort>
                        <FormattedMessage
                            id={
                                isBorSammen(farskapserklaering)
                                    ? 'farskapserklaering.borSammen.yes'
                                    : 'farskapserklaering.borSammen.no'
                            }
                        />
                    </BodyShort>
                </>
            )}
        </Box>
    );
}

export default FarskapserklaeringPresentation;
