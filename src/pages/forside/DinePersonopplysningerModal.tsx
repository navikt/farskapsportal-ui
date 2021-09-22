import Modal from 'nav-frontend-modal';
import { useState } from 'react';
import { Ingress, Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import FormattedMessageWithExternalLink from 'components/formatted-message-with-external-link/FormattedMessageWithExternalLink';
import Lenke from 'nav-frontend-lenker';

import './DinePersonopplysningerModal.less';

function DinePersonopplysningerModal() {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    Modal.setAppElement('div#app');

    const onClick = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <Lenke href="#bottom" onClick={onClick}>
                Les om hvordan NAV behandler personopplysningene dine
            </Lenke>
            <Modal
                className="DinePersonopplysningerModal"
                isOpen={isOpen}
                onRequestClose={() => setIsOpen(false)}
                closeButton={true}
                contentLabel="Informasjon om behandling av persondata"
            >
                <DinePersonopplysninger />
            </Modal>
        </>
    );
}

function DinePersonopplysninger() {
    return (
        <>
            <Systemtittel className="DinePersonopplysningerModal__header">
                <FormattedMessage id="forside.dinePersonopplysninger.title" />
            </Systemtittel>
            <br />
            <Ingress className="DinePersonopplysningerModal__ingress">
                <FormattedMessage id="mor" />
            </Ingress>
            <Normaltekst>
                <FormattedMessage id="forside.dinePersonopplysninger.mor.content" />
            </Normaltekst>
            <ul>
                <li>
                    <FormattedMessage id="forside.dinePersonopplysninger.mor.list.1" />
                </li>
                <li>
                    <FormattedMessage id="forside.dinePersonopplysninger.mor.list.2" />
                </li>
                <li>
                    <FormattedMessage id="forside.dinePersonopplysninger.mor.list.3" />
                </li>
                <li>
                    <FormattedMessage id="forside.dinePersonopplysninger.mor.list.4" />
                </li>
                <li>
                    <FormattedMessage id="forside.dinePersonopplysninger.mor.list.5" />
                </li>
            </ul>
            <Ingress className="DinePersonopplysningerModal__ingress">
                <FormattedMessage id="far" />
            </Ingress>
            <Normaltekst>
                <FormattedMessage id="forside.dinePersonopplysninger.far.content" />
            </Normaltekst>
            <ul>
                <li>
                    <FormattedMessage id="forside.dinePersonopplysninger.far.list.1" />
                </li>
                <li>
                    <FormattedMessage id="forside.dinePersonopplysninger.far.list.2" />
                </li>
                <li>
                    <FormattedMessage id="forside.dinePersonopplysninger.far.list.3" />
                </li>
            </ul>
            <Normaltekst>
                <FormattedMessage id="forside.dinePersonopplysninger.etterSignering" />
            </Normaltekst>
            <br />
            <Ingress className="DinePersonopplysningerModal__ingress">
                <FormattedMessage id="forside.dinePersonopplysninger.personvernerklaering.title" />
            </Ingress>
            <Normaltekst>
                <FormattedMessageWithExternalLink
                    textId="forside.dinePersonopplysninger.personvernerklaering.content"
                    linkId="forside.dinePersonopplysninger.personvernerklaering.link"
                />
            </Normaltekst>
        </>
    );
}

export default DinePersonopplysningerModal;
