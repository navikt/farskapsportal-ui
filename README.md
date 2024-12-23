# farskapsportal-ui

![Deploy to dev](https://github.com/navikt/farskapsportal-ui/workflows/Deploy%20to%20dev/badge.svg)

UI for [farskapserklæring](https://www.nav.no/erklaer-farskap).

## Oppsett av lokalt utviklingsmiljø

Hent repoet fra GitHub. Hvilken måte du henter repoet på har ikke noe å si, men for å kunne hente GitHub image pakker,
se
lenger ned, må din GitHub bruker ha en Personal Access Token (PAT) autorisert for SSO i ``navikt`` organisasjonen med
minst *read:packages*
scope.

```
git clone https://github.com/navikt/farskapsportal-ui.git
```

```
git clone git@github.com:navikt/farskapsportal-ui.git
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

Velg modus ved å endre import til ønsket test-scenario i src/api/mock/app/index.ts.

Start applikasjonen:

```
yarn start
```

Nå applikasjonen fra nettleser:

http://localhost:3000/nb/oversikt

Endre lokalt testscenario i fila src/api/mock/app/index.tx. Avkommenter scenariet du ønsker å legge til grunn, 
f.eks

 > import user from './get/far_unsigned.json'; 

for simulere prosessen for far som har ventende usignert farskapserklæring.

## Testmiljø

Testmiljøer er tilgjengelige eksternt. Miljøet nærmest likt produksjon finnes
på https://farskapsportal.ekstern.dev.nav.no/. For å logge inn trenger man en
testbruker fra [Tenor - Skatteetatens testdata](https://www.skatteetaten.no/skjema/testdata/).