import { initializeFaro, getWebInstrumentations } from '@grafana/faro-web-sdk';
import nais from '/nais.js';

let faro: ReturnType<typeof initializeFaro> | null = null;

export const initFaro = () => {
    if (faro) return faro;

    faro = initializeFaro({
        url: nais.telemetryCollectorURL,
        paused: window.location.hostname === 'localhost',
        app: nais.app,
        instrumentations: [...getWebInstrumentations()],
    });

    return faro;
};

export const getFaro = () => faro;
