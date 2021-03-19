import AlertStripe from 'nav-frontend-alertstriper';
import { Normaltekst } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';

import ContentContainer from 'components/content-container/ContentContainer';
import InfoPanel from 'components/info-panel/InfoPanel';
import { Feilkode } from 'types/feilkode';

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
        <ContentContainer className="IkkeTilgang">
            <InfoPanel>
                <AlertStripe type="advarsel">
                    <Normaltekst>{renderContent()}</Normaltekst>
                    <Normaltekst>
                        <FormattedMessage id="ikkeTilgang.kontakt" />
                    </Normaltekst>
                </AlertStripe>
            </InfoPanel>
        </ContentContainer>
    );
}

function FeilRolle() {
    return <FormattedMessage id="ikkeTilgang.feilRolle" />;
}

function IkkeMyndig() {
    return <FormattedMessage id="ikkeTilgang.ikkeMyndig" />;
}

function MedmorEllerUkjent() {
    return <FormattedMessage id="ikkeTilgang.medmorEllerUkjent" />;
}

function MorSivilstandGiftPartner() {
    return <FormattedMessage id="ikkeTilgang.morSivilstandGiftPartner" />;
}

function MorSivilstandUoppgitt() {
    return <FormattedMessage id="ikkeTilgang.morSivilstandUoppgitt" />;
}

export default NotPermitted;
