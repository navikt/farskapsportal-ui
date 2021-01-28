import { FormattedMessage } from 'react-intl';
import { LenkepanelBase } from 'nav-frontend-lenkepanel';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';

import './OppmoeteLink.less';

function OppmoeteLink() {
    return (
        <LenkepanelBase className="OppmoeteLink" href={'' /* TODO */} border={true}>
            <div className="OppmoeteLink__content">
                <Undertittel className="lenkepanel__heading">
                    <FormattedMessage id="forside.oppmoeteLink.title" />
                </Undertittel>
                <Normaltekst>
                    <FormattedMessage id="forside.oppmoeteLink.content" />
                </Normaltekst>
            </div>
        </LenkepanelBase>
    );
}

export default OppmoeteLink;
