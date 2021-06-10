import ContentContainer from 'components/content-container/ContentContainer';
import ErrorPage from 'components/error-page/ErrorPage';
import FarskapserklaeringPresentation from 'components/farskapserklaering-presentation/FarskapserklaeringPresentation';
import Page from 'components/page/Page';
import WithUserInfo from 'store/providers/WithUserInfo';
import { Path } from 'types/path';
import { ERKLAERING_ID } from 'utils/constants';
import { getFarskapserklaeringForId } from 'utils/farskapserklaering';
import { useQuery } from 'utils/hooks/useQuery';
import HvaSkjerHvisPanel from './HvaSkjerHvisPanel';
import HvaSkjerViderePanel from './HvaSkjerViderePanel';
import KvitteringIntro from './KvitteringIntro';
import MorAlert from './MorAlert';
import YtelserOgTjenesterPanel from './YtelserOgTjenesterPanel';
import ProsessIndikator from "./ProsessIndikator";
import {SuccessFilled} from "@navikt/ds-icons";

import './Kvittering.less';

function Kvittering() {
    const erklaeringId = useQuery().get(ERKLAERING_ID);

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
                            <div className="Kvittering__sidebar">
                                <SuccessFilled aria-label="OK icon" role="img" focusable={false} />
                            </div>
                            <div className="Kvittering__content">
                                <KvitteringIntro erklaering={erklaering} />
                                <MorAlert erklaering={erklaering} />
                                <ProsessIndikator erklaering={erklaering}/>
                                {/*<FarskapserklaeringPresentation*/}
                                {/*    farskapserklaering={erklaering}*/}
                                {/*    border={true}*/}
                                {/*/>*/}
                                <HvaSkjerViderePanel />
                                <HvaSkjerHvisPanel erklaering={erklaering} />
                                <YtelserOgTjenesterPanel erklaering={erklaering} />
                            </div>
                        </ContentContainer>
                    );
                }}
            </WithUserInfo>
        </Page>
    );
}

export default Kvittering;
