import { ReactNode } from 'react';
import * as Sentry from '@sentry/react';

import ErrorPage from 'components/error-page/ErrorPage';

interface ErrorBoundaryProps {
    children: ReactNode;
}

function ErrorBoundary({ children }: ErrorBoundaryProps) {
    return (
        <Sentry.ErrorBoundary
            fallback={
                <ErrorPage
                    banner={{
                        title: 'Oops,',
                        text: 'noe gikk galt.',
                    }}
                    title="Det oppstod en ukjent feil"
                    text="Vennligst prøv igjen senere."
                />
            }
        >
            {children}
        </Sentry.ErrorBoundary>
    );
}

export default ErrorBoundary;
