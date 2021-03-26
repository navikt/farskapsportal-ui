import { FormattedMessage, useIntl } from 'react-intl';

import ExternalLink from 'components/external-link/ExternalLink';
import { getMessage } from 'utils/intl';

interface FormattedMessageWithExternalLinkProps {
    textId: string;
    linkId: string;
}

function FormattedMessageWithExternalLink({
    textId,
    linkId,
}: FormattedMessageWithExternalLinkProps) {
    const intl = useIntl();

    return (
        <FormattedMessage
            id={textId}
            values={{
                // eslint-disable-next-line react/display-name
                a: (text: string) => (
                    <ExternalLink href={getMessage(intl, linkId)}>{text}</ExternalLink>
                ),
            }}
        />
    );
}

export default FormattedMessageWithExternalLink;
