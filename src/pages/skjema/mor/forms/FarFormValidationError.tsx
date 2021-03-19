import AlertStripe from 'nav-frontend-alertstriper';
import { Normaltekst } from 'nav-frontend-typografi';
import { FormattedMessage, useIntl } from 'react-intl';

import ExternalLink from 'components/external-link/ExternalLink';
import { Feilkode } from 'types/feilkode';
import { getMessage } from 'utils/intl';

interface FarFormValidationErrorProps {
    id: string;
    feilkode: Feilkode;
}

function FarFormValidationError({ id, feilkode }: FarFormValidationErrorProps) {
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
                return <NavnStemmerIkkeMedRegister />;
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
    const intl = useIntl();

    return (
        <>
            <Normaltekst>
                <FormattedMessage id="mor.skjema.far.form.validation.feilRolleFar.1" />
            </Normaltekst>
            <Normaltekst>
                <FormattedMessage id="mor.skjema.far.form.validation.feilRolleFar.2" />{' '}
                <ExternalLink
                    href={getMessage(intl, 'mor.skjema.far.form.validation.feilRolleFar.link')}
                >
                    <FormattedMessage id="mor.skjema.far.form.validation.feilRolleFar.linkLabel" />
                </ExternalLink>
            </Normaltekst>
        </>
    );
}

function ForskjelligeFedre() {
    return <FormattedMessage id="mor.skjema.far.form.validation.forskjelligeFedre" />;
}

function IkkeMyndig() {
    return (
        <>
            <FormattedMessage id="mor.skjema.far.form.validation.ikkeMyndig" />{' '}
            <FormattedMessage id="error.taKontakt" />
        </>
    );
}

function MaksAntallForsoek() {
    return (
        <>
            <FormattedMessage id="mor.skjema.far.form.validation.maksAntallForsoek.1" />
            <FormattedMessage id="mor.skjema.far.form.validation.maksAntallForsoek.2" />
            <FormattedMessage id="mor.skjema.far.form.validation.maksAntallForsoek.3" />
            <FormattedMessage id="mor.skjema.far.form.validation.maksAntallForsoek.4" />
        </>
    );
}

function NavnStemmerIkkeMedRegister() {
    return (
        <>
            <FormattedMessage id="mor.skjema.far.form.validation.navnStemmerIkkeMedRegister.1" />
            <FormattedMessage id="mor.skjema.far.form.validation.navnStemmerIkkeMedRegister.2" />
        </>
    );
}

export default FarFormValidationError;
