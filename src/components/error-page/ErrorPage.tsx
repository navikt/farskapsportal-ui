import { ReactNode } from 'react';
import { BodyLong, Heading } from '@navikt/ds-react';

import VeilederBanner from 'components/veileder-banner/VeilederBanner';

import './ErrorPage.css';

export interface ErrorPageProps {
    title: ReactNode;
    text: ReactNode;
    banner: {
        title: string;
        text: ReactNode;
    };
}

function ErrorPage({ title, text, banner }: ErrorPageProps) {
    return (
        <div className="ErrorPage">
            <VeilederBanner title={banner.title} text={banner.text} veileder={{ type: 'unsure' }} />
            <div className="ErrorPage__content">
                <Heading level="2" size="medium">{title}</Heading>
                <BodyLong size="large">{text}</BodyLong>
            </div>
        </div>
    );
}

export default ErrorPage;
