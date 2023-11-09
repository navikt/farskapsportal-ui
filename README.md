# farskapsportal-ui

![Deploy to dev](https://github.com/navikt/farskapsportal-ui/workflows/Deploy%20to%20dev/badge.svg)

UI for [farskapserklæring](https://www.nav.no/erklaer-farskap).

## Utviklingsmiljø

Hent repoet fra github:

```
git clone https://github.com/navikt/farskapsportal-ui.git
```

Installer nødvendige pakker:

```
yarn install
```

Autentiser mot Container registry for å kunne hente og bygge Docker imagene definert
i [docker-compose.yaml](docker-compose.yaml):

```
docker login ghcr.io -u GITHUB_USERNAME -p GITHUB_PERSONAL_ACCESS_TOKEN
```

Kjør flere Docker containere samtidig, slik som [nav-dekoratoren](https://github.com/navikt/nav-dekoratoren):

```
docker-compose up -d
```

Start applikasjonen lokalt:

```
yarn start
```

## Testmiljø

Testmiljøet er tilgjengelig på https://farskapsportal.ekstern.dev.nav.no/. For å logge inn trenger man en
testbruker fra [Tenor - Skatteetatens testdata](https://www.skatteetaten.no/skjema/testdata/).