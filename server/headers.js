import cors from 'cors';

export const setup = (app) => {
    app.disable('x-powered-by');
    app.use(cors());
    app.use((req, res, next) => {
        res.header('X-Frame-Options', 'DENY');
        res.header('X-Xss-Protection', '1; mode=block');
        res.header('X-Content-Type-Options', 'nosniff');
        res.header('Referrer-Policy', 'no-referrer');

        if (process.env.ENV === 'prod') {
            res.setHeader('Access-Control-Allow-Origin', 'https://farskapsportal.nav.no');
            res.setHeader('Access-Control-Allow-Methods', 'POST, GET');
            res.setHeader('Access-Control-Allow-Headers',  'Origin, X-Requested-With, Content-Type, Accept');
        }

        next();
    });
};