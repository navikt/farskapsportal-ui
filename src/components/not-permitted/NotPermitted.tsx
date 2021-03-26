import AlertStripe from 'nav-frontend-alertstriper';
import { Normaltekst } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';

import ContentContainer from 'components/content-container/ContentContainer';
import FormattedMessageWithExternalLink from 'components/formatted-message-with-external-link/FormattedMessageWithExternalLink';
import InfoPanel from 'components/info-panel/InfoPanel';
import { Feilkode } from 'types/feilkode';

import './NotPermitted.less';

interface NotPermittedProps {
    feilkode: Feilkode;
}

const showAlertFor = [Feilkode.IkkeMyndig /* TODO: DNR, bor i utlandet */];

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
                {showAlertFor.includes(feilkode) ? (
                    <AlertStripe type="advarsel">{renderContent()}</AlertStripe>
                ) : (
                    renderContent()
                )}
            </InfoPanel>
        </ContentContainer>
    );
}

function IkkeMyndig() {
    return (
        <>
            <Normaltekst>
                <FormattedMessage id="notPermitted.ikkeMyndig" />
            </Normaltekst>
            <Normaltekst>
                <FormattedMessage id="error.taKontakt" />
            </Normaltekst>
        </>
    );
}

// TODO: skal endres, skille medmor fra ukjent og nye tekster
function MedmorEllerUkjent() {
    return (
        <Normaltekst>
            <FormattedMessage id="notPermitted.medmorEllerUkjent" />
        </Normaltekst>
    );
}

// TODO: endre når api endres, skal være for kvinne gift med mann
function MorSivilstandGift() {
    return (
        <>
            <Normaltekst>
                <FormattedMessage id="notPermitted.morSivilstandGift.1" />
            </Normaltekst>
            <Normaltekst>
                <FormattedMessageWithExternalLink
                    textId="notPermitted.morSivilstandGift.2"
                    linkId="notPermitted.morSivilstandGift.link"
                />
            </Normaltekst>
        </>
    );
}

// TODO: endre når api endres, skal være for kvinne gift med kvinne
function MorSivilstandPartner() {
    return (
        <>
            <Normaltekst>
                <FormattedMessage id="notPermitted.morSivilstandPartner.1" />
            </Normaltekst>
            <Normaltekst>
                <FormattedMessageWithExternalLink
                    textId="notPermitted.morSivilstandPartner.2"
                    linkId="notPermitted.morSivilstandPartner.link"
                />
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
