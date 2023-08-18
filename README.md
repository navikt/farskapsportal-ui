# farskapsportal-ui

![Deploy to dev](https://github.com/navikt/farskapsportal-ui/workflows/Deploy%20to%20dev/badge.svg)

UI for farskapserklæring

## Komme i gang

Hent repoet fra github:

```
git clone https://github.com/navikt/farskapsportal-ui.git
```

Installer nødvendige pakker:

```
yarn install
```

Start dekoratøren:

```
docker login docker.pkg.github.com -u GITHUB_USERNAME -p GITHUB_PERSONAL_ACCESS_TOKEN
docker-compose up -d
```

Start applikasjonen lokalt:

```
yarn start
```

### Vedlikeholdsmodus

Se https://www.npmjs.com/package/nodejs-server-maintenance

```
Eksempel-curl for å aktivere vedlikeholdsmodus:
curl -d "access_key=pw123" -X POST https://farskapsportal-feature.ekstern.dev.nav.no/maintenance

deaktivere:
curl -d "access_key=pw123" -X DELETE https://farskapsportal-feature.ekstern.dev.nav.no/maintenance
```