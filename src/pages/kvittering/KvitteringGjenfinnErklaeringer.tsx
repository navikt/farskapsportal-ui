import { FormattedMessage, useIntl } from 'react-intl';
import { getMessage } from '../../utils/intl';
import { Normaltekst } from 'nav-frontend-typografi';
import { useStore } from '../../store/Context';
import { Path } from '../../types/path';

// TODO: replace link -> download pdf?

function KvitteringGjenfinnErklaeringer() {
    const intl = useIntl();
    const [{ language }] = useStore();
    const oversiktLinkPath = `/${language}${Path.Oversikt}`;

    return (
        <Normaltekst className="KvitteringGjenfinnErklaeringer">
            <FormattedMessage id="kvittering.intro.mor.4" />
            <a href={oversiktLinkPath}>{getMessage(intl, 'kvittering.intro.mor.link')}</a>
        </Normaltekst>
    );
}

export default KvitteringGjenfinnErklaeringer;
