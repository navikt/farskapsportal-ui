import { Route, Switch } from 'react-router-dom';

import RedirectAfterLogin from 'components/redirect-after-login/RedirectAfterLogin';
import RedirectToLanguage from 'components/redirect-to-language/RedirectToLanguage';
import Feilet from 'pages/feilet/Feilet';
import Forside from 'pages/forside/Forside';
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

const basePathWithLanguage = '/(nb|nn|en)?';

function App() {
    useDekoratorLanguage();

    return (
        <RedirectAfterLogin>
            <RedirectToLanguage>
                <Switch>
                    <Route
                        exact={true}
                        path={`${basePathWithLanguage}${Path.Forside}`}
                        component={Forside}
                    />
                    <Route
                        exact={true}
                        path={`${basePathWithLanguage}${Path.Oversikt}`}
                        component={Oversikt}
                    />
                    <Route
                        exact={true}
                        path={`${basePathWithLanguage}${Path.Skjema}`}
                        component={Skjema}
                    />
                    <Route
                        exact={true}
                        path={`${basePathWithLanguage}${Path.Kvittering}`}
                        component={Kvittering}
                    />
                    <Route
                        exact={true}
                        path={`${basePathWithLanguage}${Path.Signer}`}
                        component={Signer}
                    />
                    <Route
                        exact={false}
                        path={`${basePathWithLanguage}${Path.Suksess}`}
                        component={Suksess}
                    />
                    <Route
                        exact={false}
                        path={`${basePathWithLanguage}${Path.Feilet}`}
                        component={Feilet}
                    />
                    <Route
                        exact={false}
                        path={`${basePathWithLanguage}${Path.Avbrutt}`}
                        component={Avbrutt}
                    />
                    <Route
                        exact={true}
                        path={`${basePathWithLanguage}${Path.Suksess_deprecated}`}
                        component={Suksess}
                    />
                    <Route
                        exact={true}
                        path={`${basePathWithLanguage}${Path.Feilet_deprecated}`}
                        component={Feilet}
                    />
                    <Route
                        exact={true}
                        path={`${basePathWithLanguage}${Path.Avbrutt_deprecated}`}
                        component={Avbrutt}
                    />
                    <Route
                        exact={true}
                        path={`${basePathWithLanguage}${Path.AvbruttOversikt}`}
                        component={AvbruttOversikt}
                    />
                    <Route component={PageNotFound} />
                </Switch>
            </RedirectToLanguage>
        </RedirectAfterLogin>
    );
}

export default App;
