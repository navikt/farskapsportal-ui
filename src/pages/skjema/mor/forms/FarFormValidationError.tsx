import AlertStripe from 'nav-frontend-alertstriper';
import { Normaltekst } from 'nav-frontend-typografi';
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
            case Feilkode.IkkeMyndig:
            case Feilkode.ForelderHarVerge:
            case Feilkode.PersonErDoed:
                return <DefaultUgyldigFarMessage />;
            default:
                return null;
        }
    };

    return (
        <AlertStripe id={id} type="feil">
            {renderContent()}
        </AlertStripe>
    );
}

function FarHarIkkeFnummer() {
    return (
        <>
            <Normaltekst>
                <FormattedMessage id="skjema.mor.far.validation.farHarIkkeFnummer" />
            </Normaltekst>
        </>
    );
}

function MorOgFarSammePerson() {
    return (
        <>
            <Normaltekst>
                <FormattedMessage id="skjema.mor.far.validation.morOgFarSammePerson" />
            </Normaltekst>
        </>
    );
}

function FeilRolleFar() {
    return (
        <>
            <Normaltekst>
                <FormattedMessage id="skjema.mor.far.validation.feilRolleFar.1" />
            </Normaltekst>
            <Normaltekst>
                <FormattedMessageWithExternalLink
                    textId="skjema.mor.far.validation.feilRolleFar.2"
                    linkId="skjema.mor.far.validation.feilRolleFar.link"
                />
            </Normaltekst>
        </>
    );
}

function ForskjelligeFedre() {
    return <FormattedMessage id="skjema.mor.far.validation.forskjelligeFedre" />;
}

function NavnStemmerIkkeMedRegister() {
    return (
        <>
            <Normaltekst>
                <FormattedMessage id="skjema.mor.far.validation.navnStemmerIkkeMedRegister.1" />
            </Normaltekst>
            <Normaltekst>
                <FormattedMessage id="skjema.mor.far.validation.navnStemmerIkkeMedRegister.2" />
            </Normaltekst>
        </>
    );
}

function PdlPersonIkkeFunnet() {
    return (
        <>
            <Normaltekst>
                <FormattedMessage id="skjema.mor.far.validation.pdlPersonIkkeFunnet" />
            </Normaltekst>
        </>
    );
}

function DefaultUgyldigFarMessage() {
    return (
        <>
            <Normaltekst>
                <FormattedMessage id="skjema.mor.far.validation.defaultUgyldigFarMessage" />
            </Normaltekst>
        </>
    );
}

export default FarFormValidationError;
