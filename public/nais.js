// Local fallback for Faro setup, replaced by Nais at deploy time.
// See https://docs.nais.io/observability/frontend/how-to/setup-faro/
export default {
    telemetryCollectorURL: 'http://localhost:12347/collect',
    app: {
        name: 'farskapsportal-ui',
        namespace: 'farskapsportal',
        version: 'local',
    },
};
