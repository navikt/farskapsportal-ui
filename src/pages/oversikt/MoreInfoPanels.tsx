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
    const hasBarnUtenErklaering = getBarnUtenErklaering(userInfo).length;
    const avventerSigneringMotpart = userInfo.avventerSigneringMotpart?.length;
    const avventerSigneringBruker = userInfo.avventerSigneringBruker?.length;
    const avventerRegistrering = userInfo.avventerRegistrering?.length;

    if (userInfo.forelderrolle === Foreldrerolle.Mor) {
        if (avventerSigneringBruker) {
            return <HvemErFar />;
        }

        if (hasBarnUtenErklaering) {
            return (
                <>
                    <ErFarskapRegistrert />
                    <HvemErFar />
                    <Medmor />
                </>
            );
        }

        if (avventerSigneringMotpart) {
            return (
                <>
                    <HvaSkjerNaa />
                    <FarErklaererIkke />
                </>
            );
        }

        if (avventerRegistrering) {
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
        if (avventerSigneringBruker) {
            return (
                <>
                    <AlleredeErklaert />
                    <ErJegFar />
                </>
            );
        }

        if (avventerRegistrering) {
            return <HvaSkjerNaa />;
        }

        return <ErklaereUtenMor />;
    } else if (userInfo.forelderrolle === Foreldrerolle.MorEllerFar) {
        if (
            hasBarnUtenErklaering ||
            avventerSigneringMotpart ||
            avventerSigneringBruker ||
            avventerRegistrering
        ) {
            return (
                <>
                    {hasBarnUtenErklaering && <ErFarskapRegistrert />}
                    {hasBarnUtenErklaering && <HvemErFar />}
                    {hasBarnUtenErklaering && <Medmor />}
                    {avventerSigneringMotpart && <HvaSkjerNaa />}
                    {avventerSigneringMotpart && <FarErklaererIkke />}
                    {avventerSigneringBruker && <AlleredeErklaert />}
                    {avventerSigneringBruker && <ErJegFar />}
                    {avventerRegistrering && <HvaSkjerNaa />}
                </>
            );
        }

        return (
            <>
                <ErklaereUtenMor />
                <ErFarskapRegistrert />
                <HvemErFar />
                <Medmor />
            </>
        );
    }

    return null;
}

export default MoreInfoPanels;
