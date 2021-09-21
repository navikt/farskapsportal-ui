import { Knapp } from 'nav-frontend-knapper';
import Modal from 'nav-frontend-modal';
import { useState } from 'react';
import { Normaltekst } from 'nav-frontend-typografi';

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
            <Normaltekst>PVK her</Normaltekst>
        </>
    );
}

export default PvkModal;
