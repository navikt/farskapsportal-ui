import Panel from 'nav-frontend-paneler';

import ContentContainer from 'components/content-container/ContentContainer';
import ErrorPage from 'components/error-page/ErrorPage';
import Page from 'components/page/Page';
import WithUserInfo from 'store/providers/WithUserInfo';
import { Path } from 'types/path';
import { getFarskapserklaeringForId } from 'utils/farskapserklaering';
import { useQuery } from 'utils/hooks/useQuery';
import HvaSkjerHvisPanel from './HvaSkjerHvisPanel';
import HvaSkjerViderePanel from './HvaSkjerViderePanel';
import KvitteringIntro from './KvitteringIntro';
import MorAlert from './MorAlert';
import YtelserOgTjenesterPanel from './YtelserOgTjenesterPanel';

import './Kvittering.less';

function Kvittering() {
    const erklaeringId = useQuery().get('id');

    return (
        <Page
            titleId="header.kvittering"
            breadcrumbs={[
                { titleId: 'breadcrumbs.oversikt', path: Path.Oversikt },
                { titleId: 'breadcrumbs.kvittering' },
            ]}
        >
            <WithUserInfo>
                {(userInfo) => {
                    const erklaering = getFarskapserklaeringForId(userInfo, erklaeringId);

                    if (!erklaering) {
                        // TODO change text
                        // TODO: button to redirect?
                        return (
                            <ErrorPage
                                banner={{
                                    title: 'Oops,',
                                    text: 'noe gikk galt.',
                                }}
                                title="Finner ikke farskapserklæring"
                                text="Vennligst gå tilbake og prøv på nytt."
                            />
                        );
                    }

                    return (
                        <ContentContainer className="Kvittering">
                            <Panel>
                                <KvitteringIntro erklaering={erklaering} />
                                <MorAlert erklaering={erklaering} />
                                <HvaSkjerViderePanel />
                                <HvaSkjerHvisPanel erklaering={erklaering} />
                                <YtelserOgTjenesterPanel erklaering={erklaering} />
                            </Panel>
                        </ContentContainer>
                    );
                }}
            </WithUserInfo>
        </Page>
    );
}

export default Kvittering;
