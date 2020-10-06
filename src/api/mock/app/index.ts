import fetchMock from 'fetch-mock';

import user from './get/user.json';

const { REACT_APP_API_URL } = process.env;

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
) =>
    fetchMock.get(`${REACT_APP_API_URL}${path}`, () =>
        delay(minDelay, maxDelay).then(() => response)
    );

const mockPost = (
    path: string,
    response: Record<string, unknown>,
    minDelay = 200,
    maxDelay = 750
) =>
    fetchMock.post(`${REACT_APP_API_URL}${path}`, () =>
        delay(minDelay, maxDelay).then(() => response)
    );

export const setUpMock = async () => {
    mockGet('/kjoenn', user);

    mockPost('/kontroller', { statusType: 'OK' });
};
