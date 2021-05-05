import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';

import FormattedMessageWithExternalLink from 'components/formatted-message-with-external-link/FormattedMessageWithExternalLink';
import InfoExpandablePanel from 'components/info-expandable-panel/InfoExpandablePanel';

function Rettigheter() {
    return (
        <section>
            <Undertittel>
                <FormattedMessage id="forside.rettigheter.title" />
            </Undertittel>
            <Normaltekst>
                <FormattedMessage id="forside.rettigheter.content" />
            </Normaltekst>
            <InfoExpandablePanel titleId="forside.rettigheter.arv.title">
                <FormattedMessage id="forside.rettigheter.arv.content" />
            </InfoExpandablePanel>
            <InfoExpandablePanel titleId="forside.rettigheter.foreldreansvar.title">
                <Normaltekst>
                    <FormattedMessage id="forside.rettigheter.foreldreansvar.content.1" />
                </Normaltekst>
                <Normaltekst>
                    <FormattedMessage id="forside.rettigheter.foreldreansvar.content.2" />
                </Normaltekst>
                <Normaltekst>
                    <FormattedMessage id="forside.rettigheter.foreldreansvar.content.3" />
                </Normaltekst>
            </InfoExpandablePanel>
            <InfoExpandablePanel titleId="forside.rettigheter.barnebidrag.title">
                <FormattedMessage id="forside.rettigheter.barnebidrag.content" />
            </InfoExpandablePanel>
            <InfoExpandablePanel titleId="forside.rettigheter.samvaer.title">
                <Normaltekst>
                    <FormattedMessage id="forside.rettigheter.samvaer.content.1" />
                </Normaltekst>
                <Normaltekst>
                    <FormattedMessage id="forside.rettigheter.samvaer.content.2" />
                </Normaltekst>
            </InfoExpandablePanel>
            <InfoExpandablePanel titleId="forside.rettigheter.navn.title">
                <Normaltekst>
                    <FormattedMessageWithExternalLink
                        textId="forside.rettigheter.navn.content"
                        linkId="forside.rettigheter.navn.link"
                    />
                </Normaltekst>
            </InfoExpandablePanel>
            <Normaltekst>
                <FormattedMessageWithExternalLink
                    textId="forside.rettigheter.linkLabel"
                    linkId="forside.rettigheter.link"
                />
            </Normaltekst>
        </section>
    );
}

export default Rettigheter;
