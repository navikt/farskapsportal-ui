import fetchMock from 'fetch-mock';

// import user from './get/mor.json';
// import user from './get/mor_child.json';
// import user from './get/mor_twins.json';
// import user from './get/mor_twins_one_awaiting_far.json';
import user from './get/far_unsigned.json';

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

    mockPost('/api/farskapserklaering/ny', 'OK', 2000, 3000);
};
