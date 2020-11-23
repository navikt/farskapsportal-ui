import { ReactNode } from 'react';
import { Ingress, Innholdstittel } from 'nav-frontend-typografi';

import VeilederBanner from 'components/veileder-banner/VeilederBanner';

import './ErrorPage.less';

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
                <Innholdstittel>{title}</Innholdstittel>
                <Ingress>{text}</Ingress>
            </div>
        </div>
    );
}

export default ErrorPage;
