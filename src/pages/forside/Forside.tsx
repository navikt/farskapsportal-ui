import Panel from 'nav-frontend-paneler';

import ContentContainer from 'components/content-container/ContentContainer';
import Page from 'components/page/Page';
import ForsideInfo from './ForsideInfo';
import LoginButton from './LoginButton';
import OppmoeteLink from './OppmoeteLink';

import './Forside.less';

function Forside() {
    return (
        <Page titleId="header.forside">
            <ContentContainer className="Forside">
                <Panel>
                    <ForsideInfo />
                    <LoginButton />
                    <OppmoeteLink />
                </Panel>
            </ContentContainer>
        </Page>
    );
}

export default Forside;
