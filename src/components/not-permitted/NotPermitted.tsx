import AlertStripe from 'nav-frontend-alertstriper';
import { Normaltekst } from 'nav-frontend-typografi';
import { FormattedMessage, useIntl } from 'react-intl';

import ContentContainer from 'components/content-container/ContentContainer';
import ExternalLink from 'components/external-link/ExternalLink';
import InfoPanel from 'components/info-panel/InfoPanel';
import { Feilkode } from 'types/feilkode';
import { getMessage } from 'utils/intl';

import './NotPermitted.less';

interface NotPermittedProps {
    feilkode: Feilkode;
}

function NotPermitted({ feilkode }: NotPermittedProps) {
    const renderContent = () => {
        switch (feilkode) {
            case Feilkode.IkkeMyndig:
                return <IkkeMyndig />;
            case Feilkode.MedmorEllerUkjent:
                return <MedmorEllerUkjent />;
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
        <ContentContainer className="NotPermitted">
            <InfoPanel>
                <AlertStripe type="advarsel">
                    {renderContent()}
                    <Normaltekst>
                        <FormattedMessage id="error.taKontakt" />
                    </Normaltekst>
                </AlertStripe>
            </InfoPanel>
        </ContentContainer>
    );
}

function IkkeMyndig() {
    return (
        <Normaltekst>
            <FormattedMessage id="notPermitted.ikkeMyndig" />
        </Normaltekst>
    );
}

function MedmorEllerUkjent() {
    return (
        <Normaltekst>
            <FormattedMessage id="notPermitted.medmorEllerUkjent" />
        </Normaltekst>
    );
}

// TODO: endre når api endres, skal være for kvinne gift med mann
function MorSivilstandGift() {
    const intl = useIntl();

    return (
        <>
            <Normaltekst>
                <FormattedMessage id="notPermitted.morSivilstandGift.1" />
            </Normaltekst>
            <Normaltekst>
                <FormattedMessage id="notPermitted.morSivilstandGift.2" />{' '}
                <ExternalLink href={getMessage(intl, 'notPermitted.morSivilstandGift.link')}>
                    <FormattedMessage id="notPermitted.morSivilstandGift.linkLabel" />
                </ExternalLink>{' '}
                <FormattedMessage id="notPermitted.morSivilstandGift.3" />
            </Normaltekst>
        </>
    );
}

// TODO: endre når api endres, skal være for kvinne gift med kvinne
function MorSivilstandPartner() {
    const intl = useIntl();

    return (
        <>
            <Normaltekst>
                <FormattedMessage id="notPermitted.morSivilstandPartner.1" />
            </Normaltekst>
            <Normaltekst>
                <FormattedMessage id="notPermitted.morSivilstandPartner.2" />{' '}
                <ExternalLink href={getMessage(intl, 'notPermitted.morSivilstandPartner.link')}>
                    <FormattedMessage id="notPermitted.morSivilstandPartner.linkLabel" />
                </ExternalLink>
            </Normaltekst>
        </>
    );
}

function MorSivilstandUoppgitt() {
    return (
        <Normaltekst>
            <FormattedMessage id="notPermitted.morSivilstandUoppgitt" />
        </Normaltekst>
    );
}

export default NotPermitted;
