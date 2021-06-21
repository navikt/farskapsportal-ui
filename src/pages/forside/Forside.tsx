import Panel from 'nav-frontend-paneler';
import { Systemtittel } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';

import ContentContainer from 'components/content-container/ContentContainer';
import Page from 'components/page/Page';
import AlleredeRegistrert from './info-content/AlleredeRegistrert';
import Hvem from './info-content/Hvem';
import Hvordan from './info-content/Hvordan';
import Naar from './info-content/Naar';
import NaarErklaeres from './info-content/NaarErklaeres';
import Rettigheter from './info-content/Rettigheter';
import LoginButton from './LoginButton';

import './Forside.less';
import AlertStripe from 'nav-frontend-alertstriper';

function Forside() {
    return (
        <Page titleId="header.forside">
            <ContentContainer className="Forside">
                <AlertStripe type="advarsel">
                    Oops! Vi opplever for tiden tekniske problemer i forbindelse med signering hos
                    posten. Det jobbes med en fiks nå! Vennligst prøv igjen i morgen :)
                </AlertStripe>
                <br />
                <AlertStripe type="info">
                    Tusen takk for at du deltar i piloten. Vi håper du kan besvare noen spørsmål om
                    løsningen etter at du har fylt inn og signert farskapserklæringen.
                </AlertStripe>
                <br />
                <Panel border>
                    <Systemtittel>
                        <FormattedMessage id="forside.title" />
                    </Systemtittel>
                    <NaarErklaeres />
                    <Rettigheter />
                    <Hvem />
                    <Naar />
                    <Hvordan />
                    <LoginButton />
                    <AlleredeRegistrert />
                </Panel>
            </ContentContainer>
        </Page>
    );
}

export default Forside;
