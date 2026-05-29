import { Alert } from '@navikt/ds-react';
import { BodyShort } from '@navikt/ds-react';
import { FormattedMessage } from 'react-intl';

import FormattedMessageWithExternalLink from 'components/formatted-message-with-external-link/FormattedMessageWithExternalLink';
import { Feilkode } from 'types/feilkode';
import FarFormValidationMaksAntallForsoek from './FarFormValidationMaksAntallForsoek';

interface FarFormValidationErrorProps {
    id: string;
    feilkode: Feilkode;
    antallResterendeForsoek?: number | null;
    tidspunktForNullstillingAvForsoek?: string | null;
}

function FarFormValidationError({
    id,
    feilkode,
    antallResterendeForsoek,
    tidspunktForNullstillingAvForsoek,
}: FarFormValidationErrorProps) {
    const renderContent = () => {
        switch (feilkode) {
            case Feilkode.FarHarIkkeFnummer:
                return <FarHarIkkeFnummer />;
            case Feilkode.FeilRolleFar:
                return <FeilRolleFar />;
            case Feilkode.ForskjelligeFedre:
                return <ForskjelligeFedre />;
            case Feilkode.MaksAntallForsoek:
                return (
                    <FarFormValidationMaksAntallForsoek
                        tidspunktForNullstillingAvForsoek={tidspunktForNullstillingAvForsoek}
                    />
                );
            case Feilkode.MorOgFarSammePerson:
                return <MorOgFarSammePerson />;
            case Feilkode.NavnStemmerIkkeMedRegister:
                if (antallResterendeForsoek === 0) {
                    return (
                        <FarFormValidationMaksAntallForsoek
                            tidspunktForNullstillingAvForsoek={tidspunktForNullstillingAvForsoek}
                        />
                    );
                } else {
                    return <NavnStemmerIkkeMedRegister />;
                }
            case Feilkode.PdlPersonIkkeFunnet:
                return <PdlPersonIkkeFunnet />;
            case Feilkode.UgyldigFar:
                return <DefaultUgyldigFarMessage />;
            default:
                return null;
        }
    };

    return (
        <Alert id={id} variant="error">
            {renderContent()}
        </Alert>
    );
}

function FarHarIkkeFnummer() {
    return (
        <>
            <BodyShort>
                <FormattedMessage id="skjema.mor.far.validation.farHarIkkeFnummer" />
            </BodyShort>
        </>
    );
}

function MorOgFarSammePerson() {
    return (
        <>
            <BodyShort>
                <FormattedMessage id="skjema.mor.far.validation.morOgFarSammePerson" />
            </BodyShort>
        </>
    );
}

function FeilRolleFar() {
    return (
        <>
            <BodyShort>
                <FormattedMessage id="skjema.mor.far.validation.feilRolleFar.1" />
            </BodyShort>
            <BodyShort>
                <FormattedMessageWithExternalLink
                    textId="skjema.mor.far.validation.feilRolleFar.2"
                    linkId="skjema.mor.far.validation.feilRolleFar.link"
                />
            </BodyShort>
        </>
    );
}

function ForskjelligeFedre() {
    return <FormattedMessage id="skjema.mor.far.validation.forskjelligeFedre" />;
}

function NavnStemmerIkkeMedRegister() {
    return (
        <>
            <BodyShort>
                <FormattedMessage id="skjema.mor.far.validation.navnStemmerIkkeMedRegister.1" />
            </BodyShort>
            <BodyShort>
                <FormattedMessage id="skjema.mor.far.validation.navnStemmerIkkeMedRegister.2" />
            </BodyShort>
        </>
    );
}

function PdlPersonIkkeFunnet() {
    return (
        <>
            <BodyShort>
                <FormattedMessage id="skjema.mor.far.validation.pdlPersonIkkeFunnet" />
            </BodyShort>
        </>
    );
}

function DefaultUgyldigFarMessage() {
    return (
        <>
            <BodyShort>
                <FormattedMessage id="skjema.mor.far.validation.defaultUgyldigFarMessage" />
            </BodyShort>
        </>
    );
}

export default FarFormValidationError;
