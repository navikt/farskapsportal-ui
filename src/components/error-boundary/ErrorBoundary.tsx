import { ReactNode } from 'react';
import { ApmErrorBoundary } from '@nais/apm/react';

import ErrorPage from 'components/error-page/ErrorPage';

interface ErrorBoundaryProps {
    children: ReactNode;
}

function ErrorBoundary({ children }: ErrorBoundaryProps) {
    return (
            <ApmErrorBoundary
                fallback={
                    <ErrorPage
                        banner={{
                            title: 'Ukjent feil',
                            text: 'Beklager, noe gikk galt.',
                        }}
                        title="Det oppstod en ukjent feil"
                        text="Vennligst prøv igjen senere."
                    />
                }
            >
                {children}
            </ApmErrorBoundary>
    );
}

export default ErrorBoundary;
