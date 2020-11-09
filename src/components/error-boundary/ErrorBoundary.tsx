import React, { ReactNode } from 'react';
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
                    title="Det oppstod en feil"
                    text="Noe gikk galt dessverre. Vennligst prøv igjen senere."
                    banner={{
                        title: 'Oops,',
                        text: 'noe gikk galt.',
                    }}
                />
            }
        >
            {children}
        </Sentry.ErrorBoundary>
    );
}

export default ErrorBoundary;
