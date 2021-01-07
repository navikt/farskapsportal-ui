import { Redirect, Route, Switch } from 'react-router-dom';

import Banner from 'components/banner/Banner';
import RedirectAfterLogin from 'components/redirect-after-login/RedirectAfterLogin';
import LanguageToggle from 'intl/language-toggle/LanguageToggle';
import Forside from 'pages/forside/Forside';
import Kvittering from 'pages/kvittering/Kvittering';
import Oversikt from 'pages/oversikt/Oversikt';
import Soeknad from 'pages/soeknad/Soeknad';
import { Path } from 'types/path';

import './App.less';

function App() {
    return (
        <div className="App">
            <LanguageToggle />
            <Banner />
            <div role="main" className="App__content">
                <RedirectAfterLogin>
                    <Switch>
                        <Route path={Path.Forside} exact={true} component={Forside} />
                        <Route path={Path.Oversikt} exact={true} component={Oversikt} />
                        <Route path={Path.Soeknad} exact={true} component={Soeknad} />
                        <Route path={Path.Kvittering} exact={true} component={Kvittering} />
                        <Redirect to={Path.Forside} />
                    </Switch>
                </RedirectAfterLogin>
            </div>
        </div>
    );
}

export default App;
