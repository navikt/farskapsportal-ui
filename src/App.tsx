import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Banner from 'components/banner/Banner';
import LanguageToggle from 'intl/language-toggle/LanguageToggle';
import Frontpage from 'pages/frontpage/Frontpage';
import MorPage from 'pages/mor/MorPage';

import './App.less';

function App() {
    return (
        <div className="App">
            <LanguageToggle />
            <Banner />
            <div role="main" className="App__content">
                <Switch>
                    <Route path="/" exact={true} component={Frontpage} />
                    <Route path="/mor" exact={true} component={MorPage} />
                </Switch>
            </div>
        </div>
    );
}

export default App;
