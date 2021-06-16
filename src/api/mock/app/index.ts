import fetchMock, { MockResponse, MockResponseFunction } from 'fetch-mock';

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

const getDelay = (min: number, max: number) => Math.random() * (max - min) + min;

const mockGet = (
    path: string,
    response: MockResponse | MockResponseFunction,
    minDelay = 200,
    maxDelay = 750
) => fetchMock.get(path, response, { delay: getDelay(minDelay, maxDelay) });

const mockPost = (
    path: string,
    response: MockResponse | MockResponseFunction,
    minDelay = 200,
    maxDelay = 750
) => fetchMock.post(path, response, { delay: getDelay(minDelay, maxDelay) });

const mockPut = (
    path: string,
    response: MockResponse | MockResponseFunction,
    minDelay = 200,
    maxDelay = 750
) => fetchMock.put(path, response, { delay: getDelay(minDelay, maxDelay) });

export const setUpMock = async () => {
    mockGet('/api/brukerinformasjon', user);

    mockGet('begin:/api/farskapserklaering/dokument', new Blob([''], { type: 'application/pdf' }));

    mockPost('/api/personopplysninger/far', 'OK', 2000, 3000);

    mockPost(
        '/api/farskapserklaering/ny',
        {
            redirectUrlForSigneringMor: '/suksess?status_query_token=123',
            feilkode: null,
        },
        2000,
        3000
    );

    mockPut('begin:/api/farskapserklaering/redirect', {
        barn: null,
        dokument: {},
        far: null,
        idFarskapserklaering: 0,
        mor: null,
    });

    mockPost('begin:/api/redirect-url/ny', '/suksess?status_query_token=123');

    mockPut('/api/farskapserklaering/oppdatere', {
        barn: null,
        dokument: {},
        far: null,
        idFarskapserklaering: 0,
        mor: null,
    });
};
