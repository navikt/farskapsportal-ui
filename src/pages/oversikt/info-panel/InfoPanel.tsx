import { Normaltekst } from 'nav-frontend-typografi';
import Veilederpanel from 'nav-frontend-veilederpanel';

import { ReactComponent as VeilederSvg } from 'assets/icons/veileder.svg';
import { Foreldrerolle } from 'types/foreldrerolle';
import { UserInfo } from 'types/user';

// import MorGiftPartner from './content/MorGiftPartner';

interface InfoPanelProps {
    userInfo: UserInfo;
}

function InfoPanel({ userInfo }: InfoPanelProps) {
    const renderContent = () => {
        if (userInfo.forelderrolle === Foreldrerolle.Mor) {
            // if gift/partner
            // return <MorGiftPartner />
            //
            // if ikke signert
            // if (!!userInfo.morsVentendeFarskapserklaeringer?.length)
            // return <MorNotSigned userInfo={userInfo} />
            //
            // if ingen barn
            // if (!userInfo.fnrNyligFoedteBarnUtenRegistrertFar?.length)
            // return <MorChildNotBorn />
            //
            // if barn er født
            // if (userInfo.fnrNyligFoedteBarnUtenRegistrertFar?.length)
            // return <MorChildBorn />
            //
            // if venter på far
            //
            // if far har signert
            //
            // TODO: flere barn
        } else if (userInfo.forelderrolle === Foreldrerolle.Far) {
            // TODO
        }

        return null;
    };

    return (
        <Veilederpanel type="plakat" svg={<VeilederSvg />} kompakt={true}>
            <Normaltekst>Her finner du informasjon om pågående farskapserklæringer.</Normaltekst>
            {renderContent()}
        </Veilederpanel>
    );
}

export default InfoPanel;
