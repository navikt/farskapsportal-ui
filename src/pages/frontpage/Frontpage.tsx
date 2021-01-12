import { FormattedMessage } from 'react-intl';
import { Hovedknapp } from 'nav-frontend-knapper';
import { LenkepanelBase } from 'nav-frontend-lenkepanel';
import Panel from 'nav-frontend-paneler';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';

import ExternalLink from 'components/external-link/ExternalLink';
import { useRedirectTo } from 'utils/hooks/useRedirectTo';

import './Frontpage.less';

function Frontpage() {
    const redirectTo = useRedirectTo();

    return (
        <Panel className="Frontpage">
            <section className="Frontpage__section">
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
                <ExternalLink href="https://www.regjeringen.no/bld/farskap">
                    <FormattedMessage id="frontpage.1.link" />
                </ExternalLink>
            </section>
            <section className="Frontpage__section">
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
            </section>
            <section className="Frontpage__section">
                <Undertittel tag="h2">
                    <FormattedMessage id="frontpage.3.title" />
                </Undertittel>
                <ol>
                    <li>
                        <strong>
                            <FormattedMessage id="frontpage.3.ol.1" />
                        </strong>
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
                        <strong>
                            <FormattedMessage id="frontpage.3.ol.2" />
                        </strong>
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
            </section>
            <Hovedknapp onClick={() => redirectTo('/mor')}>
                <FormattedMessage id="frontpage.login" />
            </Hovedknapp>
            <LenkepanelBase href="#" border={true}>
                <div>
                    <Undertittel className="lenkepanel__heading">
                        <FormattedMessage id="frontpage.inperson.title" />
                    </Undertittel>
                    <Normaltekst>
                        <FormattedMessage id="frontpage.inperson.desc" />
                    </Normaltekst>
                </div>
            </LenkepanelBase>
        </Panel>
    );
}

export default Frontpage;
