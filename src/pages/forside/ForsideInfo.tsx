import { FormattedMessage } from 'react-intl';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { Element, Normaltekst, Systemtittel, Undertittel } from 'nav-frontend-typografi';

import './ForsideInfo.less';

function ForsideInfo() {
    return (
        <article className="ForsideInfo">
            <section className="ForsideInfo__section">
                <Systemtittel>
                    <FormattedMessage id="forside.innebaerer.title" />
                </Systemtittel>
                <Normaltekst>
                    <FormattedMessage id="forside.innebaerer.description" />
                </Normaltekst>
                <Ekspanderbartpanel
                    tittel={<FormattedMessage id="forside.innebaerer.foreldreansvar.title" />}
                >
                    <Normaltekst>
                        <FormattedMessage id="forside.innebaerer.foreldreansvar.content.1" />
                    </Normaltekst>
                    <Normaltekst>
                        <FormattedMessage id="forside.innebaerer.foreldreansvar.content.2" />
                    </Normaltekst>
                    <Normaltekst>
                        <FormattedMessage id="forside.innebaerer.foreldreansvar.content.3" />
                    </Normaltekst>
                </Ekspanderbartpanel>
                <Ekspanderbartpanel
                    tittel={<FormattedMessage id="forside.innebaerer.barnebidrag.title" />}
                >
                    <Normaltekst>
                        <FormattedMessage id="forside.innebaerer.barnebidrag.content" />
                    </Normaltekst>
                </Ekspanderbartpanel>
                <Ekspanderbartpanel
                    tittel={<FormattedMessage id="forside.innebaerer.samvaer.title" />}
                >
                    <Normaltekst>
                        <FormattedMessage id="forside.innebaerer.samvaer.content.1" />
                    </Normaltekst>
                    <Normaltekst>
                        <FormattedMessage id="forside.innebaerer.samvaer.content.2" />
                    </Normaltekst>
                </Ekspanderbartpanel>
                <Ekspanderbartpanel tittel={<FormattedMessage id="forside.innebaerer.arv.title" />}>
                    <Normaltekst>
                        <FormattedMessage id="forside.innebaerer.arv.content" />
                    </Normaltekst>
                </Ekspanderbartpanel>
                <Ekspanderbartpanel
                    tittel={<FormattedMessage id="forside.innebaerer.navn.title" />}
                >
                    <Normaltekst>
                        <FormattedMessage id="forside.innebaerer.navn.content" />
                    </Normaltekst>
                </Ekspanderbartpanel>
            </section>
            <section className="ForsideInfo__section">
                <Systemtittel>
                    <FormattedMessage id="forside.naar.title" />
                </Systemtittel>
                <ul>
                    <li>
                        <Normaltekst>
                            <FormattedMessage id="forside.naar.content.1" />
                        </Normaltekst>
                    </li>
                    <li>
                        <Normaltekst>
                            <FormattedMessage id="forside.naar.content.2" />
                        </Normaltekst>
                    </li>
                </ul>
            </section>
            <section className="ForsideInfo__section">
                <Systemtittel>
                    <FormattedMessage id="forside.elektroniskNaar.title" />
                </Systemtittel>
                <ul>
                    <li>
                        <Normaltekst>
                            <FormattedMessage id="forside.elektroniskNaar.content.1" />
                        </Normaltekst>
                    </li>
                    <li>
                        <Normaltekst>
                            <FormattedMessage id="forside.elektroniskNaar.content.2" />
                        </Normaltekst>
                    </li>
                    <li>
                        <Normaltekst>
                            <FormattedMessage id="forside.elektroniskNaar.content.3" />
                        </Normaltekst>
                    </li>
                    <li>
                        <Normaltekst>
                            <FormattedMessage id="forside.elektroniskNaar.content.4" />
                        </Normaltekst>
                    </li>
                    <li>
                        <Normaltekst>
                            <FormattedMessage id="forside.elektroniskNaar.content.5" />
                        </Normaltekst>
                    </li>
                </ul>
            </section>
            <section className="ForsideInfo__section">
                <Systemtittel>
                    <FormattedMessage id="forside.hvordan.title" />
                </Systemtittel>
                <Undertittel tag="h3">
                    <FormattedMessage id="forside.hvordan.foer.title" />
                </Undertittel>
                <ol>
                    <li>
                        <Element>
                            <FormattedMessage id="forside.hvordan.foer.step.1.title" />
                        </Element>
                        <ul>
                            <li>
                                <Normaltekst>
                                    <FormattedMessage id="forside.hvordan.foer.step.1.content.1" />
                                </Normaltekst>
                            </li>
                            <li>
                                <Normaltekst>
                                    <FormattedMessage id="forside.hvordan.foer.step.1.content.2" />
                                </Normaltekst>
                            </li>
                            <li>
                                <Normaltekst>
                                    <FormattedMessage id="forside.hvordan.foer.step.1.content.3" />
                                </Normaltekst>
                            </li>
                            <li>
                                <Normaltekst>
                                    <FormattedMessage id="forside.hvordan.foer.step.1.content.4" />
                                </Normaltekst>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <Element>
                            <FormattedMessage id="forside.hvordan.foer.step.2.title" />
                        </Element>
                        <ul>
                            <li>
                                <Normaltekst>
                                    <FormattedMessage id="forside.hvordan.foer.step.2.content.1" />
                                </Normaltekst>
                            </li>
                            <li>
                                <Normaltekst>
                                    <FormattedMessage id="forside.hvordan.foer.step.2.content.2" />
                                </Normaltekst>
                            </li>
                            <li>
                                <Normaltekst>
                                    <FormattedMessage id="forside.hvordan.foer.step.2.content.3" />
                                </Normaltekst>
                            </li>
                            <li>
                                <Normaltekst>
                                    <FormattedMessage id="forside.hvordan.foer.step.2.content.4" />
                                </Normaltekst>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <Element>
                            <FormattedMessage id="forside.hvordan.foer.step.3.title" />
                        </Element>
                    </li>
                </ol>
                <Undertittel tag="h3">
                    <FormattedMessage id="forside.hvordan.etter.title" />
                </Undertittel>
                <ol>
                    <li>
                        <Element>
                            <FormattedMessage id="forside.hvordan.etter.step.1.title" />
                        </Element>
                        <ul>
                            <li>
                                <Normaltekst>
                                    <FormattedMessage id="forside.hvordan.etter.step.1.content.1" />
                                </Normaltekst>
                            </li>
                            <li>
                                <Normaltekst>
                                    <FormattedMessage id="forside.hvordan.etter.step.1.content.2" />
                                </Normaltekst>
                            </li>
                            <li>
                                <Normaltekst>
                                    <FormattedMessage id="forside.hvordan.etter.step.1.content.3" />
                                </Normaltekst>
                            </li>
                            <li>
                                <Normaltekst>
                                    <FormattedMessage id="forside.hvordan.etter.step.1.content.4" />
                                </Normaltekst>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <Element>
                            <FormattedMessage id="forside.hvordan.etter.step.2.title" />
                        </Element>
                        <ul>
                            <li>
                                <Normaltekst>
                                    <FormattedMessage id="forside.hvordan.etter.step.2.content.1" />
                                </Normaltekst>
                            </li>
                            <li>
                                <Normaltekst>
                                    <FormattedMessage id="forside.hvordan.etter.step.2.content.2" />
                                </Normaltekst>
                            </li>
                            <li>
                                <Normaltekst>
                                    <FormattedMessage id="forside.hvordan.etter.step.2.content.3" />
                                </Normaltekst>
                            </li>
                            <li>
                                <Normaltekst>
                                    <FormattedMessage id="forside.hvordan.etter.step.2.content.4" />
                                </Normaltekst>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <Element>
                            <FormattedMessage id="forside.hvordan.etter.step.3.title" />
                        </Element>
                    </li>
                </ol>
            </section>
        </article>
    );
}

export default ForsideInfo;
