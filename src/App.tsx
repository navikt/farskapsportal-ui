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
                <Redirect exact={true} from="/" to="/nb/" />
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
            </Switch>
        </RedirectAfterLogin>
    );
}

export default App;
