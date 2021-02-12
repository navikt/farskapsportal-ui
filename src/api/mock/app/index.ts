import fetchMock from 'fetch-mock';

// import user from './get/far.json';
// import user from './get/far_both_signed.json';
// import user from './get/far_twins.json';
// import user from './get/far_unsigned.json';
import user from './get/mor.json';
// import user from './get/mor_awaiting_far.json';
// import user from './get/mor_both_signed.json';
// import user from './get/mor_child.json';
// import user from './get/mor_eller_far.json';
// import user from './get/mor_eller_far_awaiting_self_as_far_and_other.json';
// import user from './get/mor_eller_far_child.json';
// import user from './get/mor_eller_far_twins_one_awaiting_far.json';
// import user from './get/mor_eller_far_twins_one_unsigned.json';
// import user from './get/mor_twins.json';
// import user from './get/mor_twins_one_awaiting_far.json';
// import user from './get/mor_twins_one_unsigned.json';
// import user from './get/mor_unsigned.json';

fetchMock.config.fallbackToNetwork = true;

const delay = (min: number, max: number) =>
    new Promise((resolve) => {
        setTimeout(resolve, Math.random() * (max - min) + min);
    });

const mockGet = (
    path: string,
    response: Record<string, unknown> | string,
    minDelay = 200,
    maxDelay = 750
) => fetchMock.get(path, () => delay(minDelay, maxDelay).then(() => response));

const mockPost = (
    path: string,
    response: Record<string, unknown> | string,
    minDelay = 200,
    maxDelay = 750
) => fetchMock.post(path, () => delay(minDelay, maxDelay).then(() => response));

export const setUpMock = async () => {
    mockGet('/api/brukerinformasjon', user);

    mockPost('/api/personopplysninger/far', 'OK', 2000, 3000);

    mockPost(
        '/api/farskapserklaering/ny',
        { redirectUrlForSigneringMor: 'https://farskapsportal.no/redirectMor', feilkode: null },
        2000,
        3000
    );
};
