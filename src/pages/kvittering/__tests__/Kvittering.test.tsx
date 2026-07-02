import { vi, test, expect } from 'vitest';
import { Store } from 'store/store';
import { fireEvent, render, runAxe, screen } from 'test-utils';
import texts from 'texts/nb';
import { Rolle } from 'types/farskapserklaering';
import { Foreldrerolle } from 'types/foreldrerolle';
import Kvittering from '../Kvittering';

const ERKLAERING_ID = 123;

vi.mock('utils/hooks/useQuery', () => ({
    useQuery: () => ({
        get: () => `${ERKLAERING_ID}`,
    }),
}));

const introMorText = new RegExp(texts['kvittering.intro.mor.1'].substring(0, 30));
const introMorFarSignertText = new RegExp(texts['kvittering.intro.mor.farSignert'].substring(0, 7));
const introFarText = new RegExp(texts['kvittering.intro.far.1'].substring(0, 30));
const morAlertText = texts['kvittering.morAlert.1'];
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
}: {
    foreldrerolle: Foreldrerolle;
    paaloggetBrukersRolle: Rolle;
    signertAvMor?: string | null;
    signertAvFar?: string | null;
    termindato?: string | null;
    foedselsnummer?: string | null;
    farBorSammenMedMor?: boolean | null;
}): Partial<Store> => ({
    userInfo: {
        status: 'SUCCESS',
        data: {
            brukersFornavn: null,
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
            farBorSammenMedMor: true,
        }),
    });

    const results = await runAxe(container);
    expect(results.violations).toHaveLength(0);

    expect(screen.getByText(introMorText)).not.toBeNull();
    expect(screen.queryByText(introFarText)).toBeNull();
    expect(screen.getByText(morAlertText)).not.toBeNull();
    expect(screen.getByText(hvaSkjerVidereTitle)).not.toBeNull();
    expect(screen.getByText(hvaSkjerHvisTitle)).not.toBeNull();
    expect(screen.getByText(ytelserOgTjenesterTitle)).not.toBeNull();

    fireEvent.click(screen.getByText(hvaSkjerHvisTitle));
    fireEvent.click(screen.getByText(ytelserOgTjenesterTitle));

    expect(screen.getByText(farSignererIkkeTermindatoText)).not.toBeNull();
    expect(screen.queryByText(farSignererIkkeFoedselsnummerText)).toBeNull();
    expect(screen.getByText(foedtIUtlandetTitle)).not.toBeNull();
    expect(screen.getByText(barnetDoerTitle)).not.toBeNull();

    expect(
        screen.getByText(foreldrepengerSvangerskapspengerEngangsstoenadTitle),
    ).not.toBeNull();
    expect(screen.getByText(barnetrygdTitle)).not.toBeNull();
    expect(screen.queryByText(utvidetBarnetrygdTitle)).toBeNull();
    expect(screen.queryByText(barnebidragTitle)).toBeNull();
    expect(screen.queryByText(stoenadTilEnsligMorEllerFarTitle)).toBeNull();
});

test('should render info for mor with foedselsnummer erklaering and bor sammen true', async () => {
    const { container } = render(<Kvittering />, {
        store: getStore({
            foreldrerolle: Foreldrerolle.Mor,
            paaloggetBrukersRolle: Rolle.Mor,
            signertAvMor: '2021-03-17',
            foedselsnummer: '12345678901',
            farBorSammenMedMor: true,
        }),
    });

    const results = await runAxe(container);
    expect(results.violations).toHaveLength(0);

    expect(screen.getByText(introMorText)).not.toBeNull();
    expect(screen.queryByText(introFarText)).toBeNull();
    expect(screen.getByText(morAlertText)).not.toBeNull();
    expect(screen.getByText(hvaSkjerVidereTitle)).not.toBeNull();
    expect(screen.getByText(hvaSkjerHvisTitle)).not.toBeNull();
    expect(screen.getByText(ytelserOgTjenesterTitle)).not.toBeNull();

    fireEvent.click(screen.getByText(hvaSkjerHvisTitle));
    fireEvent.click(screen.getByText(ytelserOgTjenesterTitle));

    expect(screen.queryByText(farSignererIkkeTermindatoText)).toBeNull();
    expect(screen.getByText(farSignererIkkeFoedselsnummerText)).not.toBeNull();
    expect(screen.queryByText(foedtIUtlandetTitle)).toBeNull();
    expect(screen.queryByText(barnetDoerTitle)).toBeNull();

    expect(
        screen.getByText(foreldrepengerSvangerskapspengerEngangsstoenadTitle),
    ).not.toBeNull();
    expect(screen.getByText(barnetrygdTitle)).not.toBeNull();
    expect(screen.queryByText(utvidetBarnetrygdTitle)).toBeNull();
    expect(screen.queryByText(barnebidragTitle)).toBeNull();
    expect(screen.queryByText(stoenadTilEnsligMorEllerFarTitle)).toBeNull();
});

test('should render info for mor with termindato erklaering and bor sammen false', async () => {
    const { container } = render(<Kvittering />, {
        store: getStore({
            foreldrerolle: Foreldrerolle.Mor,
            paaloggetBrukersRolle: Rolle.Mor,
            signertAvMor: '2021-03-17',
            termindato: '2021-03-17',
            farBorSammenMedMor: false,
        }),
    });

    const results = await runAxe(container);
    expect(results.violations).toHaveLength(0);

    expect(screen.getByText(introMorText)).not.toBeNull();
    expect(screen.queryByText(introFarText)).toBeNull();
    expect(screen.getByText(morAlertText)).not.toBeNull();
    expect(screen.getByText(hvaSkjerVidereTitle)).not.toBeNull();
    expect(screen.getByText(hvaSkjerHvisTitle)).not.toBeNull();
    expect(screen.getByText(ytelserOgTjenesterTitle)).not.toBeNull();

    fireEvent.click(screen.getByText(hvaSkjerHvisTitle));
    fireEvent.click(screen.getByText(ytelserOgTjenesterTitle));

    expect(screen.getByText(farSignererIkkeTermindatoText)).not.toBeNull();
    expect(screen.queryByText(farSignererIkkeFoedselsnummerText)).toBeNull();
    expect(screen.getByText(foedtIUtlandetTitle)).not.toBeNull();
    expect(screen.getByText(barnetDoerTitle)).not.toBeNull();

    expect(
        screen.getByText(foreldrepengerSvangerskapspengerEngangsstoenadTitle),
    ).not.toBeNull();
    expect(screen.getByText(barnetrygdTitle)).not.toBeNull();
    expect(screen.getByText(utvidetBarnetrygdTitle)).not.toBeNull();
    expect(screen.getByText(barnebidragTitle)).not.toBeNull();
    expect(screen.getByText(stoenadTilEnsligMorEllerFarTitle)).not.toBeNull();
});

test('should render info for mor with termindato erklaering and bor sammen true and far signed', async () => {
    const { container } = render(<Kvittering />, {
        store: getStore({
            foreldrerolle: Foreldrerolle.Mor,
            paaloggetBrukersRolle: Rolle.Mor,
            signertAvMor: '2021-03-17',
            signertAvFar: '2021-03-17',
            termindato: '2021-03-17',
            farBorSammenMedMor: true,
        }),
    });

    const results = await runAxe(container);
    expect(results.violations).toHaveLength(0);

    expect(screen.getByText(introMorFarSignertText)).not.toBeNull();
    expect(screen.queryByText(introFarText)).toBeNull();
    expect(screen.queryByText(morAlertText)).toBeNull();
    expect(screen.getByText(hvaSkjerVidereTitle)).not.toBeNull();
    expect(screen.getByText(hvaSkjerHvisTitle)).not.toBeNull();
    expect(screen.getByText(ytelserOgTjenesterTitle)).not.toBeNull();

    fireEvent.click(screen.getByText(hvaSkjerHvisTitle));
    fireEvent.click(screen.getByText(ytelserOgTjenesterTitle));

    expect(screen.queryByText(farSignererIkkeTermindatoText)).toBeNull();
    expect(screen.queryByText(farSignererIkkeFoedselsnummerText)).toBeNull();
    expect(screen.getByText(foedtIUtlandetTitle)).not.toBeNull();
    expect(screen.getByText(barnetDoerTitle)).not.toBeNull();

    expect(
        screen.getByText(foreldrepengerSvangerskapspengerEngangsstoenadTitle),
    ).not.toBeNull();
    expect(screen.getByText(barnetrygdTitle)).not.toBeNull();
    expect(screen.queryByText(utvidetBarnetrygdTitle)).toBeNull();
    expect(screen.queryByText(barnebidragTitle)).toBeNull();
    expect(screen.queryByText(stoenadTilEnsligMorEllerFarTitle)).toBeNull();
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

    const results = await runAxe(container);
    expect(results.violations).toHaveLength(0);

    expect(screen.queryByText(introMorText)).toBeNull();
    expect(screen.getByText(new RegExp(introFarText))).not.toBeNull(); // Date is added to string in document
    expect(screen.queryByText(morAlertText)).toBeNull();
    expect(screen.getByText(hvaSkjerVidereTitle)).not.toBeNull();
    expect(screen.getByText(hvaSkjerHvisTitle)).not.toBeNull();
    expect(screen.getByText(ytelserOgTjenesterTitle)).not.toBeNull();

    fireEvent.click(screen.getByText(hvaSkjerHvisTitle));
    fireEvent.click(screen.getByText(ytelserOgTjenesterTitle));

    expect(screen.getByText(foedtIUtlandetTitle)).not.toBeNull();
    expect(screen.getByText(barnetDoerTitle)).not.toBeNull();

    expect(
        screen.getByText(foreldrepengerSvangerskapspengerEngangsstoenadTitle),
    ).not.toBeNull();
    expect(screen.getByText(barnetrygdTitle)).not.toBeNull();
    expect(screen.queryByText(barnebidragTitle)).toBeNull();
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

    const results = await runAxe(container);
    expect(results.violations).toHaveLength(0);

    expect(screen.queryByText(introMorText)).toBeNull();
    expect(screen.getByText(new RegExp(introFarText))).not.toBeNull(); // Date is added to string in document
    expect(screen.queryByText(morAlertText)).toBeNull();
    expect(screen.getByText(hvaSkjerVidereTitle)).not.toBeNull();
    expect(screen.queryByText(hvaSkjerHvisTitle)).toBeNull();
    expect(screen.getByText(ytelserOgTjenesterTitle)).not.toBeNull();

    fireEvent.click(screen.getByText(ytelserOgTjenesterTitle));

    expect(
        screen.getByText(foreldrepengerSvangerskapspengerEngangsstoenadTitle),
    ).not.toBeNull();
    expect(screen.getByText(barnetrygdTitle)).not.toBeNull();
    expect(screen.queryByText(barnebidragTitle)).toBeNull();
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

    const results = await runAxe(container);
    expect(results.violations).toHaveLength(0);

    expect(screen.queryByText(introMorText)).toBeNull();
    expect(screen.getByText(new RegExp(introFarText))).not.toBeNull(); // Date is added to string in document
    expect(screen.queryByText(morAlertText)).toBeNull();
    expect(screen.getByText(hvaSkjerVidereTitle)).not.toBeNull();
    expect(screen.getByText(hvaSkjerHvisTitle)).not.toBeNull();
    expect(screen.getByText(ytelserOgTjenesterTitle)).not.toBeNull();

    fireEvent.click(screen.getByText(hvaSkjerHvisTitle));
    fireEvent.click(screen.getByText(ytelserOgTjenesterTitle));

    expect(screen.getByText(foedtIUtlandetTitle)).not.toBeNull();
    expect(screen.getByText(barnetDoerTitle)).not.toBeNull();

    expect(
        screen.getByText(foreldrepengerSvangerskapspengerEngangsstoenadTitle),
    ).not.toBeNull();
    expect(screen.getByText(barnetrygdTitle)).not.toBeNull();
    expect(screen.getByText(barnebidragTitle)).not.toBeNull();
});
