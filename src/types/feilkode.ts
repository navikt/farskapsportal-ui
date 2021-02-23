export enum Feilkode {
    BarnManglerRelasjonTilMor = 'BARN_MANGLER_RELASJON_TIL_MOR', // Oppgitt barn mangler relasjon til mor
    ErklaeringEksisterer = 'ERKLAERING_EKSISTERER', // Det eksisterer allerede en farskapserklæring for oppgitt barn
    ErklaeringEksistererUfoedt = 'ERKLAERING_EKSISTERER_UFOEDT', // Det eksisterer allerede en farskapserklæring med samme foreldrepar med termindato innenfor gyldig intervall
    FeilRolleOpprette = 'FEIL_ROLLE_OPPRETTE', // Personen har ikke rettigheter til å opprette farskapserklæring
    IkkeMyndig = 'IKKE_MYNDIG', // Personen er ikke myndig
    IngenNyfoedteUtenFar = 'INGEN_NYFOEDTE_UTEN_FAR', // Mor er ikke registrert med noen nyfødte barn uten oppgitt far
    MedmorEllerUkjent = 'MEDMOR_ELLER_UKJENT', // Medmor eller person med ukjent rolle kan ikke benytte løsningen
    MorSivilstandGift = 'MOR_SIVILSTAND_GIFT', // Mor kan ikke opprette farskapserklæring dersom hun er gift
    MorSivilstandRegistrertPartner = 'MOR_SIVILSTAND_REGISTRERT_PARTNER', // Mor kan ikke opprette farskapserklæring dersom hun er registrert partner
    MorSivilstandUoppgitt = 'MOR_SIVILSTAND_UOPPGITT', // Mor kan ikke opprette farskapserklæring dersom hun har sivilstand uoppgitt
    NyfoedtErForGammel = 'NYFODT_ER_FOR_GAMMEL', // Gyldighetsperioden for å erklære farskap er utløpt for oppgitt barn
    OppretteSigneringsjobb = 'OPPRETTE_SIGNERINGSJOBB', // Feil oppstod ved opprettelse av signeringsjobb mot Posten
}
