declare module '/nais.js' {
    const nais: {
        telemetryCollectorURL: string;
        app: {
            name: string;
            namespace: string;
            version: string;
        };
    };
    export default nais;
}