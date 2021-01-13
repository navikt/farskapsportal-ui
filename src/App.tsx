import { Redirect, Route, Switch } from 'react-router-dom';

import RedirectAfterLogin from 'components/redirect-after-login/RedirectAfterLogin';
import Forside from 'pages/forside/Forside';
import Kvittering from 'pages/kvittering/Kvittering';
import Oversikt from 'pages/oversikt/Oversikt';
import Skjema from 'pages/skjema/Skjema';
import { Path } from 'types/path';
import { useDekoratorLanguage } from 'utils/hooks/useDekoratorLanguage';

const basePathWithLanguage = '/(nb|nn|en)';

function App() {
    useDekoratorLanguage();

    return (
        <RedirectAfterLogin>
            <Switch>
                <Redirect path="/" exact={true} to="/nb/" />
                <Route
                    path={`${basePathWithLanguage}${Path.Forside}`}
                    exact={true}
                    component={Forside}
                />
                <Route
                    path={`${basePathWithLanguage}${Path.Oversikt}`}
                    exact={true}
                    component={Oversikt}
                />
                <Route
                    path={`${basePathWithLanguage}${Path.Skjema}`}
                    exact={true}
                    component={Skjema}
                />
                <Route
                    path={`${basePathWithLanguage}${Path.Kvittering}`}
                    exact={true}
                    component={Kvittering}
                />
            </Switch>
        </RedirectAfterLogin>
    );
}

export default App;
