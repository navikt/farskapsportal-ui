import { Farskapserklaering } from 'types/farskapserklaering';
import { UserInfo } from 'types/user';

const getEveryFarskapserklaering = (userInfo: UserInfo): Farskapserklaering[] =>
    (userInfo.avventerSigneringBruker ?? [])
        .concat(userInfo.avventerSigneringMotpart ?? [])
        .concat(userInfo.avventerRegistrering ?? []);

export const getFarskapserklaeringForId = (
    userInfo: UserInfo,
    id: string | null
): Farskapserklaering | undefined =>
    getEveryFarskapserklaering(userInfo).find((e) => e.idFarskapserklaering.toString() === id);

export const getBarnUtenErklaering = (userInfo: UserInfo): string[] => {
    const barnMedErklaering = getEveryFarskapserklaering(userInfo).map(
        (erklaering) => erklaering.barn?.foedselsnummer ?? ''
    );

    return (
        userInfo.fnrNyligFoedteBarnUtenRegistrertFar?.filter(
            (fnr) => !barnMedErklaering.includes(fnr)
        ) ?? []
    );
};

export const isSignedByMor = (erklaering: Farskapserklaering): boolean =>
    !!erklaering.dokument?.signertAvMor;

export const isSignedByFar = (erklaering: Farskapserklaering): boolean =>
    !!erklaering.dokument?.signertAvFar;

export const isTermindatoErklaering = (erklaering: Farskapserklaering): boolean =>
    !!erklaering.barn?.termindato;

export const isBorSammen = (erklaering: Farskapserklaering, isFar: boolean): boolean =>
    isFar ? !!erklaering.farBorSammenMedMor : !!erklaering.morBorSammenMedFar;
