import fetchMock from 'fetch-mock';

import user from './get/user.json';

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
    response: Record<string, unknown>,
    minDelay = 200,
    maxDelay = 750
) => fetchMock.post(path, () => delay(minDelay, maxDelay).then(() => response));

export const setUpMock = async () => {
    mockGet('/api/kjoenn', user);

    mockPost('/api/kontroller', { statusType: 'OK' });
};
