import { FormattedMessage, useIntl } from 'react-intl';
import { getMessage } from '../../utils/intl';
import { Normaltekst } from 'nav-frontend-typografi';
import { Farskapserklaering } from '../../types/farskapserklaering';
import { downloadSignedDocument } from '../../api/api';
import { useEffect, useState } from 'react';

interface KvitteringLastNedErklaeringProps {
    erklaering: Farskapserklaering;
}

function KvitteringLastNedErklaering({ erklaering }: KvitteringLastNedErklaeringProps) {
    const intl = useIntl();
    const [pdfDownloadUrl, setPdfDownloaddUrl] = useState<string | undefined>();
    const beggeParterSignert = !!erklaering.dokument?.signertAvFar;

    useEffect(() => {
        downloadSignedDocument(erklaering.idFarskapserklaering)
            .then((blob) => {
                setPdfDownloaddUrl(window.URL.createObjectURL(blob));
            })
            .catch(() => {
                setPdfDownloaddUrl(undefined);
            });
    }, [erklaering]);

    const pdfName = getMessage(intl, 'kvittering.intro.pdfName');

    if (!pdfDownloadUrl) {
        return null;
    }

    return beggeParterSignert ? (
        <Normaltekst className="KvitteringLastNedErklaering">
            <FormattedMessage id="kvittering.intro.downloadPdf" />
            <a href={pdfDownloadUrl} download={pdfName}>
                {pdfName}
            </a>
        </Normaltekst>
    ) : (
        <Normaltekst className="KvitteringLastNedErklaering">
            <FormattedMessage id="kvittering.intro.downloadPdfNotSigned" />
        </Normaltekst>
    );
}

export default KvitteringLastNedErklaering;
