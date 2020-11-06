import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';

import Banner from 'components/banner/Banner';
import RedirectAfterLogin from 'components/redirect-after-login/RedirectAfterLogin';
import LanguageToggle from 'intl/language-toggle/LanguageToggle';
import FarPage from 'pages/far/FarPage';
import Frontpage from 'pages/frontpage/Frontpage';
import Soeknad from 'pages/mor/soeknad/Soeknad';

import './App.less';

function App() {
    const [message, setMessage] = useState('Sentry test message');

    return (
        <div className="App">
            <LanguageToggle />
            <Banner />
            <div role="main" className="App__content">
                <RedirectAfterLogin>
                    <Switch>
                        <Route path="/" exact={true} component={Frontpage} />
                        <Route path="/mor" exact={true} component={Soeknad} />
                        <Route path="/far" exact={true} component={FarPage} />
                    </Switch>
                </RedirectAfterLogin>
            </div>
            <button
                onClick={() => {
                    const foo = undefined;
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    console.log(foo.bar);
                }}
            >
                Break the world
            </button>
            <div>{message}</div>
            <button
                onClick={() => {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    setMessage({ text: 'Error' });
                }}
            >
                Sentry test
            </button>
        </div>
    );
}

export default App;
