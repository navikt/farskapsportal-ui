import { Box, Heading } from '@navikt/ds-react';

function PageNotFound() {
    return (
        <Box style={{ minHeight: '20rem', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Heading level="1" size="large">
                404
            </Heading>
        </Box>
    );
}

export default PageNotFound;
