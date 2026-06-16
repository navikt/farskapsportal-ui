import { BugIcon } from '@navikt/aksel-icons';
import { Heading, VStack, Page, Box, BodyShort, List, Button, Link } from '@navikt/ds-react';

function PageNotFound() {
    return (
        <Page.Block as="main" width="xl" gutters>
            <Box paddingBlock="space-32 space-64" data-aksel-template="404-v3">
                <VStack gap="space-64">
                    <VStack gap="space-48" align="start">
                        <VStack gap="space-16">
                            <Heading level="1" size="large">
                                Beklager, vi fant ikke siden
                            </Heading>
                            <BodyShort>
                                Denne siden kan være slettet eller flyttet, eller det er en feil i
                                lenken.
                            </BodyShort>
                            <List>
                                <List.Item>Bruk gjerne søket eller menyen</List.Item>
                                <List.Item>
                                    <Link href="/">Gå til forsiden</Link>
                                </List.Item>
                            </List>
                        </VStack>
                        <Button as="a" href="/minside" variant="primary">
                            Gå til Min side
                        </Button>
                        <Link href="/person/kontakt-oss/nb/tilbakemeldinger/feil-og-mangler">
                            <BugIcon aria-hidden />
                            Meld gjerne fra om at lenken ikke virker
                        </Link>
                    </VStack>

                    <div>
                        <Heading level="2" size="large" spacing>
                            Page not found
                        </Heading>
                        <BodyShort spacing>The page you requested cannot be found.</BodyShort>
                        <BodyShort>
                            Go to the <Link href="/">front page</Link>, or use one of the links in
                            the menu.
                        </BodyShort>
                    </div>
                </VStack>
            </Box>
        </Page.Block>
    );
}

export default PageNotFound;
