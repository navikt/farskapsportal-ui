import AlertStripe from 'nav-frontend-alertstriper';
import { Normaltekst } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import { Redirect } from 'react-router-dom';

import ContentContainer from 'components/content-container/ContentContainer';
import FarskapserklaeringPresentation from 'components/farskapserklaering-presentation/FarskapserklaeringPresentation';
import Page from 'components/page/Page';
import { useStore } from 'store/Context';
import WithUserInfo from 'store/providers/WithUserInfo';
import { Foreldrerolle } from 'types/foreldrerolle';
import { Path } from 'types/path';
import { UserInfo } from 'types/user';
import { ERKLAERING_ID } from 'utils/constants';
import { getFarskapserklaeringForId } from 'utils/farskapserklaering';
import { useQuery } from 'utils/hooks/useQuery';
import SignerButtons from './SignerButtons';

import './Signer.less';

function Signer() {
    const [{ language }] = useStore();
    const erklaeringId = useQuery().get(ERKLAERING_ID);

    const renderContent = (userInfo: UserInfo) => {
        if (userInfo.forelderrolle === Foreldrerolle.Far) {
            return <Redirect to={`/${language}${Path.Oversikt}`} />;
        }

        const erklaering = getFarskapserklaeringForId(userInfo, erklaeringId);

        if (erklaering && erklaeringId) {
            return (
                <>
                    <IkkeSignertAlert />
                    <FarskapserklaeringPresentation border farskapserklaering={erklaering} />
                    <SignerButtons erklaeringId={erklaeringId} />
                </>
            );
        } else {
            // TODO: handle missing erklaering && erklaeringId
            return null;
        }
    };

    return (
        <Page
            titleId="header.signer"
            breadcrumbs={[
                { titleId: 'breadcrumbs.oversikt', path: Path.Oversikt },
                { titleId: 'breadcrumbs.signer' },
            ]}
        >
            <WithUserInfo>
                {(userInfo) => <ContentContainer>{renderContent(userInfo)}</ContentContainer>}
            </WithUserInfo>
        </Page>
    );
}

function IkkeSignertAlert() {
    return (
        <AlertStripe type="advarsel" className="IkkeSignertAlert">
            <Normaltekst>
                <FormattedMessage id="signer.alert.1" />
            </Normaltekst>
            <Normaltekst>
                <FormattedMessage id="signer.alert.2" />
            </Normaltekst>
        </AlertStripe>
    );
}

export default Signer;
