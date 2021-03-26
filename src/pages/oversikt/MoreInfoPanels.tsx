import { Foreldrerolle } from 'types/foreldrerolle';
import { UserInfo } from 'types/user';
import { getBarnUtenErklaering } from 'utils/farskapserklaering';
import AlleredeErklaert from './more-info-panels-content/AlleredeErklaert';
import ErFarskapRegistrert from './more-info-panels-content/ErFarskapRegistrert';
import ErJegFar from './more-info-panels-content/ErJegFar';
import ErklaereUtenMor from './more-info-panels-content/ErklaereUtenMor';
import FarErklaererIkke from './more-info-panels-content/FarErklaererIkke';
import HvaSkjerNaa from './more-info-panels-content/HvaSkjerNaa';
import HvemErFar from './more-info-panels-content/HvemErFar';
import Medmor from './more-info-panels-content/Medmor';

interface MoreInfoPanelsProps {
    userInfo: UserInfo;
}

function MoreInfoPanels({ userInfo }: MoreInfoPanelsProps) {
    if (userInfo.forelderrolle === Foreldrerolle.Mor) {
        if (userInfo.avventerSigneringBruker?.length) {
            return <HvemErFar />;
        }

        if (getBarnUtenErklaering(userInfo).length) {
            return (
                <>
                    <ErFarskapRegistrert />
                    <HvemErFar />
                    <Medmor />
                </>
            );
        }

        if (userInfo.avventerSigneringMotpart?.length) {
            return (
                <>
                    <HvaSkjerNaa />
                    <FarErklaererIkke />
                </>
            );
        }

        if (userInfo.avventerRegistrering?.length) {
            return <HvaSkjerNaa />;
        }

        return (
            <>
                <ErFarskapRegistrert />
                <HvemErFar />
                <Medmor />
            </>
        );
    } else if (userInfo.forelderrolle === Foreldrerolle.Far) {
        if (userInfo.avventerSigneringBruker?.length) {
            return (
                <>
                    <AlleredeErklaert />
                    <ErJegFar />
                </>
            );
        }

        if (userInfo.avventerRegistrering?.length) {
            return <HvaSkjerNaa />;
        }

        return <ErklaereUtenMor />;
    }

    // TODO MOR_ELLER_FAR
    return null;
}

export default MoreInfoPanels;
