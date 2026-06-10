import { Box } from '@navikt/ds-react';
import { BodyShort, Heading, HStack, Label, VStack } from '@navikt/ds-react';
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
        <Box
            borderWidth={border ? '1' : '0'}
            padding="space-32"
            borderColor="neutral-subtle"
            borderRadius="4"
        >
            <VStack gap="space-24">
                {showTitle && (
                    <HStack justify="center">
                        <Heading level="2" size="medium" as="p">
                            <FormattedMessage id="farskapserklaering" />
                        </Heading>
                    </HStack>
                )}

                <VStack gap="space-16">
                    <Heading level="3" size="small" as="p">
                        <FormattedMessage id="farskapserklaering.aboutChildren" />
                    </Heading>
                    {farskapserklaering.barn?.termindato ? (
                        <VStack gap="space-8">
                            <Label>
                                <FormattedMessage id="farskapserklaering.expectingChildren" />
                            </Label>
                            <BodyShort>
                                <FormattedMessage id="termindato" />{' '}
                                <DatePresentation date={farskapserklaering.barn.termindato} />
                            </BodyShort>
                        </VStack>
                    ) : (
                        <VStack gap="space-8">
                            <Label>
                                <FormattedMessage id="farskapserklaering.bornChildren" />
                            </Label>
                            <BodyShort>
                                <FormattedMessage id="foedselsnummer" />{' '}
                                {formatFoedselsnummer(
                                    farskapserklaering.barn?.foedselsnummer ?? '',
                                )}
                            </BodyShort>
                        </VStack>
                    )}
                </VStack>

                <VStack gap="space-16">
                    <Heading level="3" size="small" as="p">
                        <FormattedMessage id="farskapserklaering.parents" />
                    </Heading>
                    <HStack gap="space-16" wrap>
                        <VStack gap="space-8">
                            <Label>
                                <FormattedMessage id="mor" />
                            </Label>
                            <BodyShort>{getNameFromForelder(farskapserklaering.mor)}</BodyShort>
                            <BodyShort>
                                {formatFoedselsnummer(farskapserklaering.mor?.foedselsnummer ?? '')}
                            </BodyShort>
                        </VStack>
                        <VStack gap="space-8">
                            <Label>
                                <FormattedMessage id="far" />
                            </Label>
                            <BodyShort>{getNameFromForelder(farskapserklaering.far)}</BodyShort>
                            <BodyShort>
                                {formatFoedselsnummer(farskapserklaering.far?.foedselsnummer ?? '')}
                            </BodyShort>
                        </VStack>
                    </HStack>
                </VStack>

                {showBorSammen && farskapserklaering.farBorSammenMedMor !== null && (
                    <VStack gap="space-8">
                        <Heading level="3" size="small" as="p">
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
        </Box>
    );
}

export default FarskapserklaeringPresentation;
