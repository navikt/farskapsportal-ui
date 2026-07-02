import ErrorPage from 'components/error-page/ErrorPage';
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
import ProsessIndikator from './ProsessIndikator';
import KvitteringLastNedErklaering from './KvitteringLastNedErklaering';
import FarskapserklaeringPresentation from '../../components/farskapserklaering-presentation/FarskapserklaeringPresentation';
import { Accordion, Box, HGrid, VStack } from '@navikt/ds-react';

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
                        <VStack gap="space-24">
                            <VStack gap="space-16">
                                <KvitteringIntro erklaering={erklaering} />
                                <MorAlert erklaering={erklaering} />
                            </VStack>
                            <VStack gap="space-12" align="center">
                                <ProsessIndikator erklaering={erklaering} />
                                <FarskapserklaeringPresentation
                                    farskapserklaering={erklaering}
                                    border={true}
                                />
                            </VStack>
                            <KvitteringLastNedErklaering erklaering={erklaering} />
                            <Accordion>
                                <HvaSkjerViderePanel />
                                <HvaSkjerHvisPanel erklaering={erklaering} />
                                <YtelserOgTjenesterPanel erklaering={erklaering} />
                            </Accordion>
                        </VStack>
                    );
                }}
            </WithUserInfo>
        </Page>
    );
}

export default Kvittering;
