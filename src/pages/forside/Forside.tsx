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
import DinePersonopplysningerModal from './DinePersonopplysningerModal';

function Forside() {
    return (
        <Page titleId="header.forside">
            <ContentContainer className="Forside">
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
                    <DinePersonopplysningerModal />
                </Panel>
            </ContentContainer>
        </Page>
    );
}

export default Forside;
