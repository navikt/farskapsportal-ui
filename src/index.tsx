import React from 'react';
import ReactDOM from 'react-dom';
import { IntlProvider } from 'react-intl';
import { BrowserRouter as Router } from 'react-router-dom';

import './index.less';
import App from './App';
import footer from 'clients/apiMock/decorator/decorator-footer';
import header from 'clients/apiMock/decorator/decorator-header';
import scripts from 'clients/apiMock/decorator/decorator-scripts';
import styles from 'clients/apiMock/decorator/decorator-styles';
import ScrollToTop from 'components/scrollToTop/ScrollToTop';
import { StoreProvider } from 'store/Context';
import { initialState, reducer } from 'store/store';
import messages from 'text/nb';

const init = () => {
    if (process.env.NODE_ENV === 'development') {
        document.body.innerHTML = document.body.innerHTML.replace('{{{STYLES}}}', styles);
        document.body.innerHTML = document.body.innerHTML.replace('{{{HEADER}}}', header);
        document.body.innerHTML = document.body.innerHTML.replace('{{{FOOTER}}}', footer);
        document.body.innerHTML = document.body.innerHTML.replace('{{{SCRIPTS}}}', scripts);

        // Execute client.js
        const script = document.createElement('script');
        script.src = 'http://localhost:8100/dekoratoren/client.js';
        document.body.appendChild(script);
    }

    ReactDOM.render(
        <React.StrictMode>
            <IntlProvider locale="nb" messages={messages}>
                <StoreProvider initialState={initialState} reducer={reducer}>
                    <Router>
                        <ScrollToTop>
                            <App />
                        </ScrollToTop>
                    </Router>
                </StoreProvider>
            </IntlProvider>
        </React.StrictMode>,
        document.getElementById('app')
    );
};

init();
