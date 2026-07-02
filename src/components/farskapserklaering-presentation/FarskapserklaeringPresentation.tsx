import { BodyShort, Box, Heading, HStack, InfoCard, Label, VStack } from '@navikt/ds-react';
import { FormattedMessage } from 'react-intl';

import DatePresentation from 'components/date-presentation/DatePresentation';
import { Farskapserklaering } from 'types/farskapserklaering';
import { isBorSammen } from 'utils/farskapserklaering';
import { formatFoedselsnummer } from 'utils/foedselsnummer';
import { getNameFromForelder } from 'utils/name';

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
        <Box maxWidth="36rem" style={{ width: '100%' }} asChild>
            <InfoCard data-color={border ? 'accent' : 'neutral'}>
                {showTitle && (
                    <InfoCard.Header>
                        <InfoCard.Title as="h2">
                            <FormattedMessage id="farskapserklaering" />
                        </InfoCard.Title>
                    </InfoCard.Header>
                )}

                <InfoCard.Content>
                    <VStack gap="space-24">
                        <VStack gap="space-12">
                            <Heading level="3" size="small" as="h3">
                                <FormattedMessage id="farskapserklaering.aboutChildren" />
                            </Heading>
                            {farskapserklaering.barn?.termindato ? (
                                <VStack gap="space-8">
                                    <Label>
                                        <FormattedMessage id="farskapserklaering.expectingChildren" />
                                    </Label>
                                    <BodyShort>
                                        <FormattedMessage id="termindato" />{' '}
                                        <DatePresentation
                                            date={farskapserklaering.barn.termindato}
                                        />
                                    </BodyShort>
                                </VStack>
                            ) : (
                                <VStack gap="space-8">
                                    <Label>
                                        <FormattedMessage id="farskapserklaering.bornChildren" />
                                    </Label>
                                    <BodyShort>
                                        <FormattedMessage id="foedselsnummer" />
                                        {': '}
                                        {formatFoedselsnummer(
                                            farskapserklaering.barn?.foedselsnummer ?? '',
                                        )}
                                    </BodyShort>
                                </VStack>
                            )}
                        </VStack>

                        <VStack gap="space-12">
                            <Heading level="3" size="small" as="h3">
                                <FormattedMessage id="farskapserklaering.parents" />
                            </Heading>
                            <HStack gap="space-16" wrap>
                                <VStack gap="space-8">
                                    <Label>
                                        <FormattedMessage id="mor" />
                                    </Label>
                                    <BodyShort>
                                        {getNameFromForelder(farskapserklaering.mor)}
                                    </BodyShort>
                                    <BodyShort>
                                        {formatFoedselsnummer(
                                            farskapserklaering.mor?.foedselsnummer ?? '',
                                        )}
                                    </BodyShort>
                                </VStack>
                                <VStack gap="space-8">
                                    <Label>
                                        <FormattedMessage id="far" />
                                    </Label>
                                    <BodyShort>
                                        {getNameFromForelder(farskapserklaering.far)}
                                    </BodyShort>
                                    <BodyShort>
                                        {formatFoedselsnummer(
                                            farskapserklaering.far?.foedselsnummer ?? '',
                                        )}
                                    </BodyShort>
                                </VStack>
                            </HStack>
                        </VStack>

                        {showBorSammen && farskapserklaering.farBorSammenMedMor !== null && (
                            <VStack gap="space-8">
                                <Heading level="3" size="small" as="h3">
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
                            </VStack>
                        )}
                    </VStack>
                </InfoCard.Content>
            </InfoCard>
        </Box>
    );
}

export default FarskapserklaeringPresentation;
