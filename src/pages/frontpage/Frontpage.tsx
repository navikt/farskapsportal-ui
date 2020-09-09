import React from 'react';
import { useHistory } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import Lenke from 'nav-frontend-lenker';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';

import { sendToLogin } from 'clients/apiClients';

import './Frontpage.less';

function Frontpage() {
    const history = useHistory();

    return (
        <div className="Frontpage">
            <Undertittel tag="h2">
                <FormattedMessage id="frontpage.1.title" />
            </Undertittel>
            <Normaltekst>
                <FormattedMessage id="frontpage.1.desc" />
            </Normaltekst>
            <ul>
                <li>
                    <FormattedMessage id="frontpage.1.li.1" />
                </li>
                <li>
                    <FormattedMessage id="frontpage.1.li.2" />
                </li>
                <li>
                    <FormattedMessage id="frontpage.1.li.3" />
                </li>
                <li>
                    <FormattedMessage id="frontpage.1.li.4" />
                </li>
            </ul>
            <FormattedMessage
                id="frontpage.1.link"
                values={{
                    a: (text: String) => (
                        <Lenke
                            href="https://www.regjeringen.no/bld/farskap"
                            target="blank"
                            rel="noopener noreferrer"
                        >
                            {text}
                        </Lenke>
                    ),
                }}
            />
            <br />
            <br />
            <Undertittel tag="h2">
                <FormattedMessage id="frontpage.2.title" />
            </Undertittel>
            <Normaltekst>
                <FormattedMessage id="frontpage.2.desc" />
            </Normaltekst>
            <ul>
                <li>
                    <FormattedMessage id="frontpage.2.li.1" />
                </li>
                <li>
                    <FormattedMessage id="frontpage.2.li.2" />
                </li>
                <li>
                    <FormattedMessage id="frontpage.2.li.3" />
                </li>
                <li>
                    <FormattedMessage id="frontpage.2.li.4" />
                </li>
            </ul>
            <Undertittel tag="h2">
                <FormattedMessage id="frontpage.3.title" />
            </Undertittel>
            <ol>
                <li>
                    <FormattedMessage id="frontpage.3.ol.1" />
                    <ul>
                        <li>
                            <FormattedMessage id="frontpage.3.ol.1.li.1" />
                        </li>
                        <li>
                            <FormattedMessage id="frontpage.3.ol.1.li.2" />
                        </li>
                        <li>
                            <FormattedMessage id="frontpage.3.ol.1.li.3" />
                        </li>
                    </ul>
                </li>
                <li>
                    <FormattedMessage id="frontpage.3.ol.2" />
                    <ul>
                        <li>
                            <FormattedMessage id="frontpage.3.ol.2.li.1" />
                        </li>
                        <li>
                            <FormattedMessage id="frontpage.3.ol.2.li.2" />
                        </li>
                    </ul>
                </li>
            </ol>
            <Hovedknapp onClick={() => history.push('/mor')}>
                <FormattedMessage id="frontpage.login" />
            </Hovedknapp>
            <Knapp onClick={() => sendToLogin()}>Send to login</Knapp>
        </div>
    );
}

export default Frontpage;
