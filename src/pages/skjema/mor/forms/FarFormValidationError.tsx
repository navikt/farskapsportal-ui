import AlertStripe from 'nav-frontend-alertstriper';
import { Normaltekst } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';

import FormattedMessageWithExternalLink from 'components/formatted-message-with-external-link/FormattedMessageWithExternalLink';
import { Feilkode } from 'types/feilkode';

interface FarFormValidationErrorProps {
    id: string;
    feilkode: Feilkode;
    antallResterendeForsoek?: number | null;
}

function FarFormValidationError({
    id,
    feilkode,
    antallResterendeForsoek,
}: FarFormValidationErrorProps) {
    const renderContent = () => {
        switch (feilkode) {
            case Feilkode.FeilRolleFar:
                return <FeilRolleFar />;
            case Feilkode.ForskjelligeFedre:
                return <ForskjelligeFedre />;
            case Feilkode.IkkeMyndig:
                return <IkkeMyndig />;
            case Feilkode.MaksAntallForsoek:
                return <MaksAntallForsoek />;
            case Feilkode.NavnStemmerIkkeMedRegister:
                if (antallResterendeForsoek === 0) {
                    return <MaksAntallForsoek />;
                } else {
                    return <NavnStemmerIkkeMedRegister />;
                }
            case Feilkode.PdlPersonIkkeFunnet:
                return <PdlPersonIkkeFunnet />;
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

function IkkeMyndig() {
    return (
        <>
            <Normaltekst>
                <FormattedMessage id="skjema.mor.far.validation.ikkeMyndig" />{' '}
            </Normaltekst>
            <Normaltekst>
                <FormattedMessage id="error.taKontakt" />
            </Normaltekst>
        </>
    );
}

function MaksAntallForsoek() {
    return (
        <>
            <Normaltekst>
                <FormattedMessage id="skjema.mor.far.validation.maksAntallForsoek.1" />
            </Normaltekst>
            <Normaltekst>
                <FormattedMessage id="skjema.mor.far.validation.maksAntallForsoek.2" />
            </Normaltekst>
        </>
    );
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

export default FarFormValidationError;
