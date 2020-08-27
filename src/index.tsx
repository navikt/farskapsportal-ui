import React from 'react';
import ReactDOM from 'react-dom';
import { IntlProvider } from 'react-intl';
import './index.less';
import App from './App';
import * as serviceWorker from './serviceWorker';
import messages from './text/nb';
import footer from './clients/apiMock/decorator/decorator-footer';
import withMenu from './clients/apiMock/decorator/decorator-header-withmenu';
import megamenu from './clients/apiMock/decorator/decorator-megamenu';
import scripts from './clients/apiMock/decorator/decorator-scripts';
import skiplinks from './clients/apiMock/decorator/decorator-skiplinks';
import styles from './clients/apiMock/decorator/decorator-styles';

const init = () => {
    if (process.env.NODE_ENV === 'development') {
        document.body.innerHTML = document.body.innerHTML.replace(
            '{{{NAV_HEADING}}}',
            withMenu
        );
        document.body.innerHTML = document.body.innerHTML.replace(
            '{{{NAV_FOOTER}}}',
            footer
        );
        document.body.innerHTML = document.body.innerHTML.replace(
            '{{{NAV_STYLES}}}',
            styles
        );
        document.body.innerHTML = document.body.innerHTML.replace(
            '{{{NAV_SCRIPTS}}}',
            scripts
        );
        document.body.innerHTML = document.body.innerHTML.replace(
            '{{{NAV_SKIPLINKS}}}',
            skiplinks
        );
        document.body.innerHTML = document.body.innerHTML.replace(
            '{{{MEGAMENU_RESOURCES}}}',
            megamenu
        );

        // Execute client.js
        const script = document.createElement('script');
        script.src = 'http://localhost:8100/dekoratoren/client.js';
        document.body.appendChild(script);
    }

    ReactDOM.render(
        <IntlProvider locale="nb" messages={messages}>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </IntlProvider>,
        document.getElementById('app')
    );

    serviceWorker.unregister();
};

init();
