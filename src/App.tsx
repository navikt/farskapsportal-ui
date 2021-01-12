import { Redirect, Route, Switch } from 'react-router-dom';

import Banner from 'components/banner/Banner';
import RedirectAfterLogin from 'components/redirect-after-login/RedirectAfterLogin';
import Forside from 'pages/forside/Forside';
import Kvittering from 'pages/kvittering/Kvittering';
import Oversikt from 'pages/oversikt/Oversikt';
import Skjema from 'pages/skjema/Skjema';
import { Path } from 'types/path';
import { useDekoratorLanguage } from 'utils/hooks/useDekoratorLanguage';

import './App.less';

const basePathWithLanguage = '/(nb|nn|en)';

function App() {
    useDekoratorLanguage();

    return (
        <div className="App">
            <Banner />
            <div role="main" className="App__content">
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
            </div>
        </div>
    );
}

export default App;
