import { FormattedMessage, useIntl } from 'react-intl';
import { getMessage } from '../../utils/intl';
import { BodyShort, Link } from '@navikt/ds-react';
import { Farskapserklaering } from '../../types/farskapserklaering';
import { downloadSignedDocument } from '../../api/api';
import { useEffect, useState } from 'react';
import { DownloadIcon } from '@navikt/aksel-icons';

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
        <BodyShort>
            <FormattedMessage id="kvittering.intro.downloadPdf" />
            <Link href={pdfDownloadUrl} download={pdfName}>
                {pdfName}
                <DownloadIcon aria-hidden fontSize="1.5rem" />
            </Link>
        </BodyShort>
    ) : (
        <BodyShort>
            <FormattedMessage id="kvittering.intro.downloadPdfNotSigned" />
        </BodyShort>
    );
}

export default KvitteringLastNedErklaering;
