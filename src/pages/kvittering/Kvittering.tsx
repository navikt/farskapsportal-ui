import ContentContainer from 'components/content-container/ContentContainer';
import ErrorPage from 'components/error-page/ErrorPage';
import FarskapserklaeringPresentation from 'components/farskapserklaering-presentation/FarskapserklaeringPresentation';
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
                            <KvitteringIntro erklaering={erklaering} />
                            <MorAlert erklaering={erklaering} />
                            <FarskapserklaeringPresentation
                                farskapserklaering={erklaering}
                                border={true}
                            />
                            <HvaSkjerViderePanel />
                            <HvaSkjerHvisPanel erklaering={erklaering} />
                            <YtelserOgTjenesterPanel erklaering={erklaering} />
                        </ContentContainer>
                    );
                }}
            </WithUserInfo>
        </Page>
    );
}

export default Kvittering;
