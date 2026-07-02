import { ReactNode } from 'react';
import * as Sentry from '@sentry/react';
import { FaroErrorBoundary } from '@grafana/faro-react';

import ErrorPage from 'components/error-page/ErrorPage';

interface ErrorBoundaryProps {
    children: ReactNode;
}

function ErrorBoundary({ children }: ErrorBoundaryProps) {
    return (
        <FaroErrorBoundary>
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
        </FaroErrorBoundary>
    );
}

export default ErrorBoundary;
