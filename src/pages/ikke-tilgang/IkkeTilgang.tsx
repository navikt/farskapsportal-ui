import AlertStripe from 'nav-frontend-alertstriper';
import { Normaltekst } from 'nav-frontend-typografi';
import Veilederpanel from 'nav-frontend-veilederpanel';
import { FormattedMessage } from 'react-intl';

import { ReactComponent as FamilieSvg } from 'assets/icons/familie.svg';
import ContentContainer from 'components/content-container/ContentContainer';
import Page from 'components/page/Page';
import { Feilkode } from 'types/feilkode';

import './IkkeTilgang.less';

interface IkkeTilgangProps {
    feilkode: Feilkode;
}

function IkkeTilgang({ feilkode }: IkkeTilgangProps) {
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
        }
    };

    return (
        <Page titleId="header.oversikt" breadcrumbs={[{ titleId: 'breadcrumbs.oversikt' }]}>
            <ContentContainer className="IkkeTilgang">
                <Veilederpanel type="plakat" svg={<FamilieSvg />} kompakt={true}>
                    <AlertStripe type="advarsel">
                        <Normaltekst>{renderContent()}</Normaltekst>
                        <Normaltekst>
                            <FormattedMessage id="" />
                        </Normaltekst>
                    </AlertStripe>
                </Veilederpanel>
            </ContentContainer>
        </Page>
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

export default IkkeTilgang;
