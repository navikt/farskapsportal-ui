import { axe } from 'jest-axe';

import { Store } from 'store/store';
import { fireEvent, render, screen } from 'test-utils';
import texts from 'texts/nb';
import { Rolle } from 'types/farskapserklaering';
import { Foreldrerolle } from 'types/foreldrerolle';
import Kvittering from '../Kvittering';

const ERKLAERING_ID = 123;

jest.mock('utils/hooks/useQuery', () => ({
    useQuery: () => ({
        get: () => `${ERKLAERING_ID}`,
    }),
}));

const introMorText = texts['kvittering.intro.mor.4'].trim();
const introFarText = texts['kvittering.intro.far.2'];
const morAlertText = texts['kvittering.morAlert'];
const hvaSkjerVidereTitle = texts['kvittering.hvaSkjerVidere.title'];
const hvaSkjerHvisTitle = texts['kvittering.hvaSkjerHvis.title'];
const farSignererIkkeTermindatoText =
    texts['kvittering.hvaSkjerHvis.farSignererIkke.termindato.text'];
const farSignererIkkeFoedselsnummerText =
    texts['kvittering.hvaSkjerHvis.farSignererIkke.foedselsnummer.text'];
const foedtIUtlandetTitle = texts['kvittering.hvaSkjerHvis.foedtIUtlandet.title'];
const barnetDoerTitle = texts['kvittering.hvaSkjerHvis.barnetDoer.title'];
const ytelserOgTjenesterTitle = texts['kvittering.ytelserOgTjenester.title'];
const foreldrepengerSvangerskapspengerEngangsstoenadTitle =
    texts['kvittering.ytelserOgTjenester.foreldrepengerSvangerskapspengerEngangsstoenad.title'];
const barnetrygdTitle = texts['kvittering.ytelserOgTjenester.barnetrygd.title'];
const utvidetBarnetrygdTitle = texts['kvittering.ytelserOgTjenester.utvidetBarnetrygd.title'];
const barnebidragTitle = texts['kvittering.ytelserOgTjenester.barnebidrag.title'];
const stoenadTilEnsligMorEllerFarTitle =
    texts['kvittering.ytelserOgTjenester.stoenadTilEnsligMorEllerFar.title'];

const getStore = ({
    foreldrerolle,
    paaloggetBrukersRolle,
    signertAvMor = null,
    signertAvFar = null,
    termindato = null,
    foedselsnummer = null,
    farBorSammenMedMor = null,
    morBorSammenMedFar = null,
}: {
    foreldrerolle: Foreldrerolle;
    paaloggetBrukersRolle: Rolle;
    signertAvMor?: string | null;
    signertAvFar?: string | null;
    termindato?: string | null;
    foedselsnummer?: string | null;
    farBorSammenMedMor?: boolean | null;
    morBorSammenMedFar?: boolean | null;
}): Partial<Store> => ({
    userInfo: {
        status: 'SUCCESS',
        data: {
            kanOppretteFarskapserklaering: true,
            gyldigForelderrolle: true,
            forelderrolle: foreldrerolle,
            avventerSigneringBruker: null,
            avventerSigneringMotpart: [
                {
                    barn: {
                        termindato: termindato,
                        foedselsnummer: foedselsnummer,
                    },
                    dokument: {
                        dokumentStatusUrl: null,
                        dokumentnavn: null,
                        innhold: null,
                        padesUrl: null,
                        redirectUrlFar: null,
                        redirectUrlMor: null,
                        signertAvFar: signertAvFar,
                        signertAvMor: signertAvMor,
                    },
                    far: null,
                    farBorSammenMedMor: farBorSammenMedMor,
                    idFarskapserklaering: ERKLAERING_ID,
                    mor: null,
                    morBorSammenMedFar: morBorSammenMedFar,
                    paaloggetBrukersRolle: paaloggetBrukersRolle,
                },
            ],
            avventerRegistrering: null,
            fnrNyligFoedteBarnUtenRegistrertFar: null,
        },
    },
});

test('should render info for mor with termindato erklaering and bor sammen true', async () => {
    const { container } = render(<Kvittering />, {
        store: getStore({
            foreldrerolle: Foreldrerolle.Mor,
            paaloggetBrukersRolle: Rolle.Mor,
            signertAvMor: '2021-03-17',
            termindato: '2021-03-17',
            morBorSammenMedFar: true,
        }),
    });

    const results = await axe(container);
    expect(results).toHaveNoViolations();

    expect(screen.getByText(introMorText)).toBeInTheDocument();
    expect(screen.queryByText(introFarText)).not.toBeInTheDocument();
    expect(screen.getByText(morAlertText)).toBeInTheDocument();
    expect(screen.getByText(hvaSkjerVidereTitle)).toBeInTheDocument();
    expect(screen.getByText(hvaSkjerHvisTitle)).toBeInTheDocument();
    expect(screen.getByText(ytelserOgTjenesterTitle)).toBeInTheDocument();

    fireEvent.click(screen.getByText(hvaSkjerHvisTitle));
    fireEvent.click(screen.getByText(ytelserOgTjenesterTitle));

    expect(screen.getByText(farSignererIkkeTermindatoText)).toBeInTheDocument();
    expect(screen.queryByText(farSignererIkkeFoedselsnummerText)).not.toBeInTheDocument();
    expect(screen.getByText(foedtIUtlandetTitle)).toBeInTheDocument();
    expect(screen.getByText(barnetDoerTitle)).toBeInTheDocument();

    expect(
        screen.getByText(foreldrepengerSvangerskapspengerEngangsstoenadTitle)
    ).toBeInTheDocument();
    expect(screen.getByText(barnetrygdTitle)).toBeInTheDocument();
    expect(screen.queryByText(utvidetBarnetrygdTitle)).not.toBeInTheDocument();
    expect(screen.queryByText(barnebidragTitle)).not.toBeInTheDocument();
    expect(screen.queryByText(stoenadTilEnsligMorEllerFarTitle)).not.toBeInTheDocument();
});

test('should render info for mor with foedselsnummer erklaering and bor sammen true', async () => {
    const { container } = render(<Kvittering />, {
        store: getStore({
            foreldrerolle: Foreldrerolle.Mor,
            paaloggetBrukersRolle: Rolle.Mor,
            signertAvMor: '2021-03-17',
            foedselsnummer: '12345678901',
            morBorSammenMedFar: true,
        }),
    });

    const results = await axe(container);
    expect(results).toHaveNoViolations();

    expect(screen.getByText(introMorText)).toBeInTheDocument();
    expect(screen.queryByText(introFarText)).not.toBeInTheDocument();
    expect(screen.getByText(morAlertText)).toBeInTheDocument();
    expect(screen.getByText(hvaSkjerVidereTitle)).toBeInTheDocument();
    expect(screen.getByText(hvaSkjerHvisTitle)).toBeInTheDocument();
    expect(screen.getByText(ytelserOgTjenesterTitle)).toBeInTheDocument();

    fireEvent.click(screen.getByText(hvaSkjerHvisTitle));
    fireEvent.click(screen.getByText(ytelserOgTjenesterTitle));

    expect(screen.queryByText(farSignererIkkeTermindatoText)).not.toBeInTheDocument();
    expect(screen.getByText(farSignererIkkeFoedselsnummerText)).toBeInTheDocument();
    expect(screen.queryByText(foedtIUtlandetTitle)).not.toBeInTheDocument();
    expect(screen.queryByText(barnetDoerTitle)).not.toBeInTheDocument();

    expect(
        screen.getByText(foreldrepengerSvangerskapspengerEngangsstoenadTitle)
    ).toBeInTheDocument();
    expect(screen.getByText(barnetrygdTitle)).toBeInTheDocument();
    expect(screen.queryByText(utvidetBarnetrygdTitle)).not.toBeInTheDocument();
    expect(screen.queryByText(barnebidragTitle)).not.toBeInTheDocument();
    expect(screen.queryByText(stoenadTilEnsligMorEllerFarTitle)).not.toBeInTheDocument();
});

test('should render info for mor with termindato erklaering and bor sammen false', async () => {
    const { container } = render(<Kvittering />, {
        store: getStore({
            foreldrerolle: Foreldrerolle.Mor,
            paaloggetBrukersRolle: Rolle.Mor,
            signertAvMor: '2021-03-17',
            termindato: '2021-03-17',
            morBorSammenMedFar: false,
        }),
    });

    const results = await axe(container);
    expect(results).toHaveNoViolations();

    expect(screen.getByText(introMorText)).toBeInTheDocument();
    expect(screen.queryByText(introFarText)).not.toBeInTheDocument();
    expect(screen.getByText(morAlertText)).toBeInTheDocument();
    expect(screen.getByText(hvaSkjerVidereTitle)).toBeInTheDocument();
    expect(screen.getByText(hvaSkjerHvisTitle)).toBeInTheDocument();
    expect(screen.getByText(ytelserOgTjenesterTitle)).toBeInTheDocument();

    fireEvent.click(screen.getByText(hvaSkjerHvisTitle));
    fireEvent.click(screen.getByText(ytelserOgTjenesterTitle));

    expect(screen.getByText(farSignererIkkeTermindatoText)).toBeInTheDocument();
    expect(screen.queryByText(farSignererIkkeFoedselsnummerText)).not.toBeInTheDocument();
    expect(screen.getByText(foedtIUtlandetTitle)).toBeInTheDocument();
    expect(screen.getByText(barnetDoerTitle)).toBeInTheDocument();

    expect(
        screen.getByText(foreldrepengerSvangerskapspengerEngangsstoenadTitle)
    ).toBeInTheDocument();
    expect(screen.getByText(barnetrygdTitle)).toBeInTheDocument();
    expect(screen.getByText(utvidetBarnetrygdTitle)).toBeInTheDocument();
    expect(screen.getByText(barnebidragTitle)).toBeInTheDocument();
    expect(screen.getByText(stoenadTilEnsligMorEllerFarTitle)).toBeInTheDocument();
});

test('should render info for mor with termindato erklaering and bor sammen true and far signed', async () => {
    const { container } = render(<Kvittering />, {
        store: getStore({
            foreldrerolle: Foreldrerolle.Mor,
            paaloggetBrukersRolle: Rolle.Mor,
            signertAvMor: '2021-03-17',
            signertAvFar: '2021-03-17',
            termindato: '2021-03-17',
            morBorSammenMedFar: true,
        }),
    });

    const results = await axe(container);
    expect(results).toHaveNoViolations();

    expect(screen.getByText(introMorText)).toBeInTheDocument();
    expect(screen.queryByText(introFarText)).not.toBeInTheDocument();
    expect(screen.queryByText(morAlertText)).not.toBeInTheDocument();
    expect(screen.getByText(hvaSkjerVidereTitle)).toBeInTheDocument();
    expect(screen.getByText(hvaSkjerHvisTitle)).toBeInTheDocument();
    expect(screen.getByText(ytelserOgTjenesterTitle)).toBeInTheDocument();

    fireEvent.click(screen.getByText(hvaSkjerHvisTitle));
    fireEvent.click(screen.getByText(ytelserOgTjenesterTitle));

    expect(screen.queryByText(farSignererIkkeTermindatoText)).not.toBeInTheDocument();
    expect(screen.queryByText(farSignererIkkeFoedselsnummerText)).not.toBeInTheDocument();
    expect(screen.getByText(foedtIUtlandetTitle)).toBeInTheDocument();
    expect(screen.getByText(barnetDoerTitle)).toBeInTheDocument();

    expect(
        screen.getByText(foreldrepengerSvangerskapspengerEngangsstoenadTitle)
    ).toBeInTheDocument();
    expect(screen.getByText(barnetrygdTitle)).toBeInTheDocument();
    expect(screen.queryByText(utvidetBarnetrygdTitle)).not.toBeInTheDocument();
    expect(screen.queryByText(barnebidragTitle)).not.toBeInTheDocument();
    expect(screen.queryByText(stoenadTilEnsligMorEllerFarTitle)).not.toBeInTheDocument();
});

test('should render info for far with termindato erklaering and bor sammen true', async () => {
    const { container } = render(<Kvittering />, {
        store: getStore({
            foreldrerolle: Foreldrerolle.Far,
            paaloggetBrukersRolle: Rolle.Far,
            signertAvMor: '2021-03-17',
            signertAvFar: '2021-03-17',
            termindato: '2021-03-17',
            farBorSammenMedMor: true,
        }),
    });

    const results = await axe(container);
    expect(results).toHaveNoViolations();

    expect(screen.queryByText(introMorText)).not.toBeInTheDocument();
    expect(screen.getByText(new RegExp(introFarText))).toBeInTheDocument(); // Date is added to string in document
    expect(screen.queryByText(morAlertText)).not.toBeInTheDocument();
    expect(screen.getByText(hvaSkjerVidereTitle)).toBeInTheDocument();
    expect(screen.getByText(hvaSkjerHvisTitle)).toBeInTheDocument();
    expect(screen.getByText(ytelserOgTjenesterTitle)).toBeInTheDocument();

    fireEvent.click(screen.getByText(hvaSkjerHvisTitle));
    fireEvent.click(screen.getByText(ytelserOgTjenesterTitle));

    expect(screen.getByText(foedtIUtlandetTitle)).toBeInTheDocument();
    expect(screen.getByText(barnetDoerTitle)).toBeInTheDocument();

    expect(
        screen.getByText(foreldrepengerSvangerskapspengerEngangsstoenadTitle)
    ).toBeInTheDocument();
    expect(screen.getByText(barnetrygdTitle)).toBeInTheDocument();
    expect(screen.queryByText(barnebidragTitle)).not.toBeInTheDocument();
});

test('should render info for far with foedselsnummer erklaering and bor sammen true', async () => {
    const { container } = render(<Kvittering />, {
        store: getStore({
            foreldrerolle: Foreldrerolle.Far,
            paaloggetBrukersRolle: Rolle.Far,
            signertAvMor: '2021-03-17',
            signertAvFar: '2021-03-17',
            foedselsnummer: '12345678901',
            farBorSammenMedMor: true,
        }),
    });

    const results = await axe(container);
    expect(results).toHaveNoViolations();

    expect(screen.queryByText(introMorText)).not.toBeInTheDocument();
    expect(screen.getByText(new RegExp(introFarText))).toBeInTheDocument(); // Date is added to string in document
    expect(screen.queryByText(morAlertText)).not.toBeInTheDocument();
    expect(screen.getByText(hvaSkjerVidereTitle)).toBeInTheDocument();
    expect(screen.queryByText(hvaSkjerHvisTitle)).not.toBeInTheDocument();
    expect(screen.getByText(ytelserOgTjenesterTitle)).toBeInTheDocument();

    fireEvent.click(screen.getByText(ytelserOgTjenesterTitle));

    expect(
        screen.getByText(foreldrepengerSvangerskapspengerEngangsstoenadTitle)
    ).toBeInTheDocument();
    expect(screen.getByText(barnetrygdTitle)).toBeInTheDocument();
    expect(screen.queryByText(barnebidragTitle)).not.toBeInTheDocument();
});

test('should render info for far with termindato erklaering and bor sammen false', async () => {
    const { container } = render(<Kvittering />, {
        store: getStore({
            foreldrerolle: Foreldrerolle.Far,
            paaloggetBrukersRolle: Rolle.Far,
            signertAvMor: '2021-03-17',
            signertAvFar: '2021-03-17',
            termindato: '2021-03-17',
            farBorSammenMedMor: false,
        }),
    });

    const results = await axe(container);
    expect(results).toHaveNoViolations();

    expect(screen.queryByText(introMorText)).not.toBeInTheDocument();
    expect(screen.getByText(new RegExp(introFarText))).toBeInTheDocument(); // Date is added to string in document
    expect(screen.queryByText(morAlertText)).not.toBeInTheDocument();
    expect(screen.getByText(hvaSkjerVidereTitle)).toBeInTheDocument();
    expect(screen.getByText(hvaSkjerHvisTitle)).toBeInTheDocument();
    expect(screen.getByText(ytelserOgTjenesterTitle)).toBeInTheDocument();

    fireEvent.click(screen.getByText(hvaSkjerHvisTitle));
    fireEvent.click(screen.getByText(ytelserOgTjenesterTitle));

    expect(screen.getByText(foedtIUtlandetTitle)).toBeInTheDocument();
    expect(screen.getByText(barnetDoerTitle)).toBeInTheDocument();

    expect(
        screen.getByText(foreldrepengerSvangerskapspengerEngangsstoenadTitle)
    ).toBeInTheDocument();
    expect(screen.getByText(barnetrygdTitle)).toBeInTheDocument();
    expect(screen.getByText(barnebidragTitle)).toBeInTheDocument();
});
