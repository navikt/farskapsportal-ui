import { Alert, BodyShort, GuidePanel, VStack } from '@navikt/ds-react';
import { FormattedMessage } from 'react-intl';

import ContentContainer from 'components/content-container/ContentContainer';
import FormattedMessageWithExternalLink from 'components/formatted-message-with-external-link/FormattedMessageWithExternalLink';
import { Feilkode } from 'types/feilkode';

interface NotPermittedProps {
    feilkode: Feilkode;
}

const showAlertFor = [Feilkode.IkkeMyndig /* TODO: DNR, bor i utlandet */];

function NotPermitted({ feilkode }: NotPermittedProps) {
    const renderContent = () => {
        switch (feilkode) {
            case Feilkode.FarHarIkkeFnummer:
                return <ForelderHarIkkeFnummer />;
            case Feilkode.ForelderHarVerge:
                return <ForelderHarVerge />;
            case Feilkode.IkkeMyndig:
                return <IkkeMyndig />;
            case Feilkode.MedmorEllerUkjent:
                return <MedmorEllerUkjent />;
            case Feilkode.MorHarIkkeFnummer:
                return <ForelderHarIkkeFnummer />;
            case Feilkode.MorIkkeNorskBostedsadresse:
                return <MorIkkeNorskBostedsadresse />;
            case Feilkode.MorSivilstandGift:
                return <MorSivilstandGift />;
            case Feilkode.MorSivilstandRegistrertPartner:
                return <MorSivilstandPartner />;
            case Feilkode.MorSivilstandUoppgitt:
                return <MorSivilstandUoppgitt />;
            default:
                return null;
        }
    };

    return (
        <ContentContainer>
            <GuidePanel poster>
                {showAlertFor.includes(feilkode) ? (
                    <Alert variant="warning">{renderContent()}</Alert>
                ) : (
                    renderContent()
                )}
            </GuidePanel>
        </ContentContainer>
    );
}

function MorIkkeNorskBostedsadresse() {
    return (
        <>
            <BodyShort>
                <FormattedMessage id="notPermitted.morIkkeNorskBostedsadresse" />
            </BodyShort>
        </>
    );
}

function ForelderHarIkkeFnummer() {
    return (
        <>
            <BodyShort>
                <FormattedMessage id="notPermitted.forelderHarIkkeFnummer" />
            </BodyShort>
        </>
    );
}

function ForelderHarVerge() {
    return (
        <VStack gap="space-16">
            <BodyShort>
                <FormattedMessage id="notPermitted.forelderHarVerge" />
            </BodyShort>
            <BodyShort>
                <FormattedMessage id="error.taKontakt" />
            </BodyShort>
        </VStack>
    );
}

function IkkeMyndig() {
    return (
        <VStack gap="space-16">
            <BodyShort>
                <FormattedMessage id="notPermitted.ikkeMyndig" />
            </BodyShort>
            <BodyShort>
                <FormattedMessage id="error.taKontakt" />
            </BodyShort>
        </VStack>
    );
}

// TODO: skal endres, skille medmor fra ukjent og nye tekster
function MedmorEllerUkjent() {
    return (
        <BodyShort>
            <FormattedMessage id="notPermitted.medmorEllerUkjent" />
        </BodyShort>
    );
}

// TODO: endre når api endres, skal være for kvinne gift med mann
function MorSivilstandGift() {
    return (
        <VStack gap="space-16">
            <BodyShort>
                <FormattedMessage id="notPermitted.morSivilstandGift.1" />
            </BodyShort>
            <BodyShort>
                <FormattedMessageWithExternalLink
                    textId="notPermitted.morSivilstandGift.2"
                    linkId="notPermitted.morSivilstandGift.link"
                />
            </BodyShort>
        </VStack>
    );
}

// TODO: endre når api endres, skal være for kvinne gift med kvinne
function MorSivilstandPartner() {
    return (
        <VStack gap="space-16">
            <BodyShort>
                <FormattedMessage id="notPermitted.morSivilstandPartner.1" />
            </BodyShort>
            <BodyShort>
                <FormattedMessageWithExternalLink
                    textId="notPermitted.morSivilstandPartner.2"
                    linkId="notPermitted.morSivilstandPartner.link"
                />
            </BodyShort>
        </VStack>
    );
}

function MorSivilstandUoppgitt() {
    return (
        <BodyShort>
            <FormattedMessage id="notPermitted.morSivilstandUoppgitt" />
        </BodyShort>
    );
}

export default NotPermitted;
