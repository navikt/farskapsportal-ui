import { Route, Routes } from 'react-router';

import RedirectAfterLogin from 'components/redirect-after-login/RedirectAfterLogin';
import RedirectToLanguage from 'components/redirect-to-language/RedirectToLanguage';
import Feilet from 'pages/feilet/Feilet';
import Kvittering from 'pages/kvittering/Kvittering';
import Oversikt from 'pages/oversikt/Oversikt';
import PageNotFound from 'pages/page-not-found/PageNotFound';
import Signer from 'pages/signer/Signer';
import Skjema from 'pages/skjema/Skjema';
import Suksess from 'pages/suksess/Suksess';
import Avbrutt from './pages/avbrutt/Avbrutt';
import AvbruttOversikt from './pages/avbruttoversikt/AvbruttOversikt';
import { Path } from 'types/path';
import { useDekoratorLanguage } from 'utils/hooks/useDekoratorLanguage';

const basePath = '/:lang';

function App() {
    useDekoratorLanguage();

    return (
        <RedirectAfterLogin>
            <RedirectToLanguage>
                <Routes>
                    <Route
                        path={`${basePath}${Path.Oversikt}`}
                        element={<Oversikt />}
                    />
                    <Route
                        path={`${basePath}${Path.Skjema}`}
                        element={<Skjema />}
                    />
                    <Route
                        path={`${basePath}${Path.Kvittering}`}
                        element={<Kvittering />}
                    />
                    <Route
                        path={`${basePath}${Path.Signer}`}
                        element={<Signer />}
                    />
                    <Route
                        path={`${basePath}${Path.Suksess}`}
                        element={<Suksess />}
                    />
                    <Route
                        path={`${basePath}${Path.Feilet}`}
                        element={<Feilet />}
                    />
                    <Route
                        path={`${basePath}${Path.Avbrutt}`}
                        element={<Avbrutt />}
                    />
                    <Route
                        path={`${basePath}${Path.Suksess_deprecated}`}
                        element={<Suksess />}
                    />
                    <Route
                        path={`${basePath}${Path.Feilet_deprecated}`}
                        element={<Feilet />}
                    />
                    <Route
                        path={`${basePath}${Path.Avbrutt_deprecated}`}
                        element={<Avbrutt />}
                    />
                    <Route
                        path={`${basePath}${Path.AvbruttOversikt}`}
                        element={<AvbruttOversikt />}
                    />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </RedirectToLanguage>
        </RedirectAfterLogin>
    );
}

export default App;
