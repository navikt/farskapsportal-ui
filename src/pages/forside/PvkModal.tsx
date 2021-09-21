import { Knapp } from 'nav-frontend-knapper';
import Modal from 'nav-frontend-modal';
import { useState } from 'react';
import { Innholdstittel, Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import FormattedMessageWithExternalLink from 'components/formatted-message-with-external-link/FormattedMessageWithExternalLink';

import './PvkModal.less';

function PvkModal() {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    Modal.setAppElement('div#app');

    return (
        <>
            <Knapp onClick={() => setIsOpen(!isOpen)}>Se PVK</Knapp>
            <Modal
                className="PvkModal"
                isOpen={isOpen}
                onRequestClose={() => setIsOpen(false)}
                closeButton={true}
                contentLabel="Informasjon om behandling av persondata"
            >
                <Pvk />
            </Modal>
        </>
    );
}

function Pvk() {
    return (
        <>
            <Innholdstittel>
                <FormattedMessage id="forside.pvk.title" />
            </Innholdstittel>
            <Undertittel>
                <FormattedMessage id="mor" />
            </Undertittel>
            <Normaltekst>
                <FormattedMessage id="forside.pvk.mor.content" />
            </Normaltekst>
            <ul>
                <li>
                    <FormattedMessage id="forside.pvk.mor.list.1" />
                </li>
                <li>
                    <FormattedMessage id="forside.pvk.mor.list.2" />
                </li>
                <li>
                    <FormattedMessage id="forside.pvk.mor.list.3" />
                </li>
                <li>
                    <FormattedMessage id="forside.pvk.mor.list.4" />
                </li>
            </ul>
            <Undertittel>
                <FormattedMessage id="far" />
            </Undertittel>
            <Normaltekst>
                <FormattedMessage id="forside.pvk.far" />
            </Normaltekst>
            <ul>
                <li>
                    <FormattedMessage id="forside.pvk.far.list.1" />
                </li>
                <li>
                    <FormattedMessage id="forside.pvk.far.list.2" />
                </li>
                <li>
                    <FormattedMessage id="forside.pvk.mor.list.3" />
                </li>
            </ul>
            <Normaltekst>
                <FormattedMessage id="forside.pvk.etterSignering" />
            </Normaltekst>
            <br/>
            <Undertittel>
                <FormattedMessage id="forside.pvk.personvernerklaering.title" />
            </Undertittel>
            <Normaltekst>
                <FormattedMessageWithExternalLink
                    textId="forside.pvk.personvernerklaering.content"
                    linkId="forside.pvk.personvernerklaering.link"
                />
            </Normaltekst>
        </>
    );
}

export default PvkModal;
