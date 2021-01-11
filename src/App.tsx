import { Redirect, Route, Switch } from 'react-router-dom';

import Banner from 'components/banner/Banner';
import RedirectAfterLogin from 'components/redirect-after-login/RedirectAfterLogin';
import FarPage from 'pages/far/FarPage';
import Frontpage from 'pages/frontpage/Frontpage';
import Soeknad from 'pages/mor/soeknad/Soeknad';
import { useDekoratorLanguage } from 'utils/hooks/useDekoratorLanguage';

import './App.less';

const basePathWithLocale = `/(nb|nn|en)`;

function App() {
    useDekoratorLanguage();

    return (
        <div className="App">
            <Banner />
            <div role="main" className="App__content">
                <RedirectAfterLogin>
                    <Switch>
                        <Redirect path="/" exact={true} to="/nb/" />
                        <Route path={basePathWithLocale} exact={true} component={Frontpage} />
                        <Route
                            path={`${basePathWithLocale}/mor`}
                            exact={true}
                            component={Soeknad}
                        />
                        <Route
                            path={`${basePathWithLocale}/far`}
                            exact={true}
                            component={FarPage}
                        />
                    </Switch>
                </RedirectAfterLogin>
            </div>
        </div>
    );
}

export default App;
