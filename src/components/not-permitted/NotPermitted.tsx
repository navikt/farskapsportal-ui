import AlertStripe from 'nav-frontend-alertstriper';
import { Normaltekst } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';

import ContentContainer from 'components/content-container/ContentContainer';
import InfoPanel from 'components/info-panel/InfoPanel';
import { Feilkode } from 'types/feilkode';

import './NotPermitted.less';

interface NotPermittedProps {
    feilkode: Feilkode;
}

function NotPermitted({ feilkode }: NotPermittedProps) {
    const renderContent = () => {
        switch (feilkode) {
            case Feilkode.FeilRolle:
                return <FeilRolle />;
            case Feilkode.IkkeMyndig:
                return <IkkeMyndig />;
            case Feilkode.MedmorEllerUkjent:
                return <MedmorEllerUkjent />;
            case Feilkode.MorSivilstandGift:
            case Feilkode.MorSivilstandRegistrertPartner:
                return <MorSivilstandGiftPartner />;
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
                    <Normaltekst>{renderContent()}</Normaltekst>
                    <Normaltekst>
                        <FormattedMessage id="notPermitted.kontakt" />
                    </Normaltekst>
                </AlertStripe>
            </InfoPanel>
        </ContentContainer>
    );
}

function FeilRolle() {
    return <FormattedMessage id="notPermitted.feilRolle" />;
}

function IkkeMyndig() {
    return <FormattedMessage id="notPermitted.ikkeMyndig" />;
}

function MedmorEllerUkjent() {
    return <FormattedMessage id="notPermitted.medmorEllerUkjent" />;
}

function MorSivilstandGiftPartner() {
    return <FormattedMessage id="notPermitted.morSivilstandGiftPartner" />;
}

function MorSivilstandUoppgitt() {
    return <FormattedMessage id="notPermitted.morSivilstandUoppgitt" />;
}

export default NotPermitted;
