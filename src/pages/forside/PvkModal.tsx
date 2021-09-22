import { Knapp } from 'nav-frontend-knapper';
import Modal from 'nav-frontend-modal';
import { useState } from 'react';
import { Ingress, Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import FormattedMessageWithExternalLink from 'components/formatted-message-with-external-link/FormattedMessageWithExternalLink';

import './PvkModal.less';

function PvkModal() {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    Modal.setAppElement('div#app');

    const onClick = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <Knapp onClick={onClick}>Se PVK</Knapp>
            <Modal
                shouldFocusAfterRender={true}
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
            <Systemtittel className="PvkModal__header">
                <FormattedMessage id="forside.pvk.title" />
            </Systemtittel>
            <br />
            <Ingress className="PvkModal__ingress">
                <FormattedMessage id="mor" />
            </Ingress>
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
                <li>
                    <FormattedMessage id="forside.pvk.mor.list.5" />
                </li>
            </ul>
            <Ingress className="PvkModal__ingress">
                <FormattedMessage id="far" />
            </Ingress>
            <Normaltekst>
                <FormattedMessage id="forside.pvk.far.content" />
            </Normaltekst>
            <ul>
                <li>
                    <FormattedMessage id="forside.pvk.far.list.1" />
                </li>
                <li>
                    <FormattedMessage id="forside.pvk.far.list.2" />
                </li>
                <li>
                    <FormattedMessage id="forside.pvk.far.list.3" />
                </li>
            </ul>
            <Normaltekst>
                <FormattedMessage id="forside.pvk.etterSignering" />
            </Normaltekst>
            <br />
            <Ingress className="PvkModal__ingress">
                <FormattedMessage id="forside.pvk.personvernerklaering.title" />
            </Ingress>
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
