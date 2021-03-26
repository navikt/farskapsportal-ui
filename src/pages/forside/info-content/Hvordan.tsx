import { Element, Undertittel } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';

import InfoExpandablePanel from 'components/info-expandable-panel/InfoExpandablePanel';

function Hvordan() {
    return (
        <section>
            <Undertittel>
                <FormattedMessage id="forside.hvordan.title" />
            </Undertittel>
            <InfoExpandablePanel titleId="forside.hvordan.foer.title">
                <ol>
                    <li>
                        <Element>
                            <FormattedMessage id="forside.hvordan.foer.step.1" />
                        </Element>
                        <ul>
                            <li>
                                <FormattedMessage id="forside.hvordan.foer.step.1.content.1" />
                            </li>
                            <li>
                                <FormattedMessage id="forside.hvordan.foer.step.1.content.2" />
                            </li>
                            <li>
                                <FormattedMessage id="forside.hvordan.foer.step.1.content.3" />
                            </li>
                            <li>
                                <FormattedMessage id="forside.hvordan.foer.step.1.content.4" />
                            </li>
                        </ul>
                    </li>
                    <li>
                        <Element>
                            <FormattedMessage id="forside.hvordan.foer.step.2" />
                        </Element>
                        <ul>
                            <li>
                                <FormattedMessage id="forside.hvordan.foer.step.2.content.1" />
                            </li>
                            <li>
                                <FormattedMessage id="forside.hvordan.foer.step.2.content.2" />
                            </li>
                            <li>
                                <FormattedMessage id="forside.hvordan.foer.step.2.content.3" />
                            </li>
                            <li>
                                <FormattedMessage id="forside.hvordan.foer.step.2.content.4" />
                            </li>
                        </ul>
                    </li>
                    <li>
                        <Element>
                            <FormattedMessage id="forside.hvordan.foer.step.3" />
                        </Element>
                    </li>
                </ol>
            </InfoExpandablePanel>
            <InfoExpandablePanel titleId="forside.hvordan.etter.title">
                <ol>
                    <li>
                        <Element>
                            <FormattedMessage id="forside.hvordan.etter.step.1" />
                        </Element>
                        <ul>
                            <li>
                                <FormattedMessage id="forside.hvordan.etter.step.1.content.1" />
                            </li>
                            <li>
                                <FormattedMessage id="forside.hvordan.etter.step.1.content.2" />
                            </li>
                            <li>
                                <FormattedMessage id="forside.hvordan.etter.step.1.content.3" />
                            </li>
                            <li>
                                <FormattedMessage id="forside.hvordan.etter.step.1.content.4" />
                            </li>
                        </ul>
                    </li>
                    <li>
                        <Element>
                            <FormattedMessage id="forside.hvordan.etter.step.2" />
                        </Element>
                        <ul>
                            <li>
                                <FormattedMessage id="forside.hvordan.etter.step.2.content.1" />
                            </li>
                            <li>
                                <FormattedMessage id="forside.hvordan.etter.step.2.content.2" />
                            </li>
                            <li>
                                <FormattedMessage id="forside.hvordan.etter.step.2.content.3" />
                            </li>
                            <li>
                                <FormattedMessage id="forside.hvordan.etter.step.2.content.4" />
                            </li>
                        </ul>
                    </li>
                    <li>
                        <Element>
                            <FormattedMessage id="forside.hvordan.etter.step.3" />
                        </Element>
                    </li>
                </ol>
            </InfoExpandablePanel>
        </section>
    );
}

export default Hvordan;
