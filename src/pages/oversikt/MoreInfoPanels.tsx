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
import HvaErFarskapserklaering from './more-info-panels-content/HvaErFarskapserklaering';
import { Accordion } from '@navikt/ds-react';

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
            return <Accordion><HvemErFar /></Accordion>;
        }

        if (hasBarnUtenErklaering) {
            return (
                <Accordion>
                    <ErFarskapRegistrert />
                    <HvemErFar />
                    <Medmor />
                </Accordion>
            );
        }

        if (avventerSigneringMotpart) {
            return (
                <Accordion>
                    <HvaSkjerNaa />
                    <FarErklaererIkke />
                </Accordion>
            );
        }

        if (avventerRegistrering) {
            return <Accordion><HvaSkjerNaa /></Accordion>;
        }

        return (
            <Accordion>
                <ErFarskapRegistrert />
                <HvemErFar />
                <Medmor />
            </Accordion>
        );
    } else if (userInfo.forelderrolle === Foreldrerolle.Far) {
        if (avventerSigneringBruker) {
            return (
                <Accordion>
                    <HvaErFarskapserklaering />
                    <AlleredeErklaert />
                    <ErJegFar />
                </Accordion>
            );
        }

        if (avventerRegistrering) {
            return <Accordion><HvaSkjerNaa /></Accordion>;
        }

        return <Accordion><ErklaereUtenMor /></Accordion>;
    } else if (userInfo.forelderrolle === Foreldrerolle.MorEllerFar) {
        if (
            hasBarnUtenErklaering ||
            avventerSigneringMotpart ||
            avventerSigneringBruker ||
            avventerRegistrering
        ) {
            return (
                <Accordion>
                    {!!hasBarnUtenErklaering && <ErFarskapRegistrert />}
                    {!!hasBarnUtenErklaering && <HvemErFar />}
                    {!!hasBarnUtenErklaering && <Medmor />}
                    {!!avventerSigneringMotpart && <HvaSkjerNaa />}
                    {!!avventerSigneringMotpart && <FarErklaererIkke />}
                    {!!avventerSigneringBruker && <HvaErFarskapserklaering />}
                    {!!avventerSigneringBruker && <AlleredeErklaert />}
                    {!!avventerSigneringBruker && <ErJegFar />}
                    {!!avventerRegistrering && <HvaSkjerNaa />}
                </Accordion>
            );
        }

        return (
            <Accordion>
                <ErklaereUtenMor />
                <ErFarskapRegistrert />
                <HvemErFar />
                <Medmor />
            </Accordion>
        );
    }

    return null;
}

export default MoreInfoPanels;
