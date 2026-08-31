import ErrorPage from 'components/error-page/ErrorPage';

// TODO: change error text
// TODO: knapp tilbake til oversikt?
function Feilet() {
    return (
        <ErrorPage
            banner={{
                title: 'Uvented feil',
                text: 'Noe gikk galt.',
            }}
            title="Det oppstod en ukjent feil"
            text="Vennligst prøv igjen senere."
        />
    );
}

export default Feilet;
