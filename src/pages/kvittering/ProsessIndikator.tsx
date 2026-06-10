import { Farskapserklaering } from '../../types/farskapserklaering';
import { isSignedByFar } from '../../utils/farskapserklaering';
import { FormattedMessage } from 'react-intl';
import { BodyShort, Box, HStack, VStack } from '@navikt/ds-react';
import { CheckmarkCircleFillIcon } from '@navikt/aksel-icons';

// TODO: Bytt ut med relevant komponent naar den er publisert

interface ProsessIndikatorProps {
    erklaering: Farskapserklaering;
}

// TODO: Check if erklaering has been archived and change icon?
function ProsessIndikator({ erklaering }: ProsessIndikatorProps) {
    const signedByFar = isSignedByFar(erklaering);

    return (
        <VStack style={{ margin: '1.5rem 0.5rem 2.5rem 0.5rem' }}>
            <ProsessSteg textId="kvittering.prosessIndikator.step.1" iconType="checked" />
            <ProsessStegLine />
            <ProsessSteg
                textId="kvittering.prosessIndikator.step.2"
                iconType={signedByFar ? 'checked' : 'circle'}
            />
            <ProsessStegLine />
            <ProsessSteg
                textId="kvittering.prosessIndikator.step.3"
                iconType={signedByFar ? 'circle' : 'dot'}
            />
        </VStack>
    );
}

function ProsessStegLine() {
    return (
        <Box
            style={{
                height: '50px',
                width: '2px',
                backgroundColor: '#c6c2bf',
                marginLeft: '6.5px',
            }}
        />
    );
}

type IconType = 'checked' | 'circle' | 'dot';

function ProsessSteg({ textId, iconType }: { textId: string; iconType: IconType }) {
    return (
        <HStack as="span" align="center" gap="space-16">
            <ProsessStegIcon iconType={iconType} />
            <BodyShort weight={iconType === 'circle' ? 'semibold' : 'regular'}>
                <FormattedMessage id={textId} />
            </BodyShort>
        </HStack>
    );
}

function ProsessStegIcon({ iconType }: { iconType: IconType }) {
    switch (iconType) {
        case 'checked':
            return (
                <CheckmarkCircleFillIcon
                    aria-hidden
                    style={{ color: '#59514b', width: '1rem', minWidth: '1rem' }}
                />
            );
        case 'circle':
            return (
                <Box
                    as="span"
                    style={{
                        height: '1rem',
                        minWidth: '1rem',
                        backgroundColor: '#59514b',
                        borderRadius: '50%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Box
                        as="span"
                        style={{
                            height: '0.5rem',
                            minWidth: '0.5rem',
                            backgroundColor: '#f1f1f1',
                            borderRadius: '50%',
                        }}
                    />
                </Box>
            );
        case 'dot':
            return (
                <Box
                    as="span"
                    style={{
                        height: '1rem',
                        minWidth: '1rem',
                        backgroundColor: '#f1f1f1',
                        borderRadius: '50%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'flex-start',
                        marginTop: '0.25rem',
                    }}
                >
                    <Box
                        as="span"
                        style={{
                            height: '0.5rem',
                            minWidth: '0.5rem',
                            backgroundColor: '#59514b',
                            borderRadius: '50%',
                        }}
                    />
                </Box>
            );
    }
}

export default ProsessIndikator;
