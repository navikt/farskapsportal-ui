import { FormattedMessage } from 'react-intl';
import { Hovedknapp } from 'nav-frontend-knapper';
import { LenkepanelBase } from 'nav-frontend-lenkepanel';
import Panel from 'nav-frontend-paneler';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';

import ExternalLink from 'components/external-link/ExternalLink';
import Page from 'components/page/Page';
import { Path } from 'types/path';
import { useNavigateTo } from 'utils/hooks/useNavigateTo';

import './Forside.less';

function Forside() {
    const navigateTo = useNavigateTo();

    const goToOversikt = () => {
        navigateTo(Path.Oversikt);
    };

    return (
        <Page className="Forside" titleId="header.forside">
            <Panel className="Forside__panel">
                <section className="Forside__section">
                    <Undertittel tag="h2">
                        <FormattedMessage id="forside.1.title" />
                    </Undertittel>
                    <Normaltekst>
                        <FormattedMessage id="forside.1.desc" />
                    </Normaltekst>
                    <ul>
                        <li>
                            <FormattedMessage id="forside.1.li.1" />
                        </li>
                        <li>
                            <FormattedMessage id="forside.1.li.2" />
                        </li>
                        <li>
                            <FormattedMessage id="forside.1.li.3" />
                        </li>
                        <li>
                            <FormattedMessage id="forside.1.li.4" />
                        </li>
                    </ul>
                    <ExternalLink href="https://www.regjeringen.no/bld/farskap">
                        <FormattedMessage id="forside.1.link" />
                    </ExternalLink>
                </section>
                <section className="Forside__section">
                    <Undertittel tag="h2">
                        <FormattedMessage id="forside.2.title" />
                    </Undertittel>
                    <Normaltekst>
                        <FormattedMessage id="forside.2.desc" />
                    </Normaltekst>
                    <ul>
                        <li>
                            <FormattedMessage id="forside.2.li.1" />
                        </li>
                        <li>
                            <FormattedMessage id="forside.2.li.2" />
                        </li>
                        <li>
                            <FormattedMessage id="forside.2.li.3" />
                        </li>
                        <li>
                            <FormattedMessage id="forside.2.li.4" />
                        </li>
                    </ul>
                </section>
                <section className="Forside__section">
                    <Undertittel tag="h2">
                        <FormattedMessage id="forside.3.title" />
                    </Undertittel>
                    <ol>
                        <li>
                            <strong>
                                <FormattedMessage id="forside.3.ol.1" />
                            </strong>
                            <ul>
                                <li>
                                    <FormattedMessage id="forside.3.ol.1.li.1" />
                                </li>
                                <li>
                                    <FormattedMessage id="forside.3.ol.1.li.2" />
                                </li>
                                <li>
                                    <FormattedMessage id="forside.3.ol.1.li.3" />
                                </li>
                            </ul>
                        </li>
                        <li>
                            <strong>
                                <FormattedMessage id="forside.3.ol.2" />
                            </strong>
                            <ul>
                                <li>
                                    <FormattedMessage id="forside.3.ol.2.li.1" />
                                </li>
                                <li>
                                    <FormattedMessage id="forside.3.ol.2.li.2" />
                                </li>
                            </ul>
                        </li>
                    </ol>
                </section>
                <Hovedknapp onClick={goToOversikt}>
                    <FormattedMessage id="forside.login" />
                </Hovedknapp>
                <LenkepanelBase href={'' /* TODO */} border={true}>
                    <div>
                        <Undertittel className="lenkepanel__heading">
                            <FormattedMessage id="forside.inperson.title" />
                        </Undertittel>
                        <Normaltekst>
                            <FormattedMessage id="forside.inperson.desc" />
                        </Normaltekst>
                    </div>
                </LenkepanelBase>
            </Panel>
        </Page>
    );
}

export default Forside;
