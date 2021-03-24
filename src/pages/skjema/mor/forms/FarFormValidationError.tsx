import AlertStripe from 'nav-frontend-alertstriper';
import { Normaltekst } from 'nav-frontend-typografi';
import { FormattedMessage, useIntl } from 'react-intl';

import ExternalLink from 'components/external-link/ExternalLink';
import { Feilkode } from 'types/feilkode';
import { getMessage } from 'utils/intl';

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
                <FormattedMessage id="skjema.mor.far.validation.feilRolleFar.1" />
            </Normaltekst>
            <Normaltekst>
                <FormattedMessage id="skjema.mor.far.validation.feilRolleFar.2" />{' '}
                <ExternalLink
                    href={getMessage(intl, 'skjema.mor.far.validation.feilRolleFar.link')}
                >
                    <FormattedMessage id="skjema.mor.far.validation.feilRolleFar.linkLabel" />
                </ExternalLink>
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

export default FarFormValidationError;
