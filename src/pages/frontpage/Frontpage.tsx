import React from 'react';
import { FormattedMessage } from 'react-intl';
import Lenke from 'nav-frontend-lenker';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import './Frontpage.less';

function Frontpage() {
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
        </div>
    );
}

export default Frontpage;
