import Panel from 'nav-frontend-paneler';

import Page from 'components/page/Page';
import ForsideInfo from './ForsideInfo';
import LoginButton from './LoginButton';
import OppmoeteLink from './OppmoeteLink';

import './Forside.less';

function Forside() {
    return (
        <Page className="Forside" titleId="header.forside">
            <Panel>
                <ForsideInfo />
                <LoginButton />
                <OppmoeteLink />
            </Panel>
        </Page>
    );
}

export default Forside;
