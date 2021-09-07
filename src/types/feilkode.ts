export enum Feilkode {
    BarnManglerRelasjonTilMor = 'BARN_MANGLER_RELASJON_TIL_MOR', // Oppgitt barn mangler relasjon til mor
    BarnHarFlereErklaeringer = 'BARN_HAR_FLERE_ERLAERINGER', // Feil i datagrunnlag. Barnet er involvert i mer enn én farskapserklæering
    ErklaeringEksistererBarn = 'ERKLAERING_EKSISTERER_BARN', // Det eksisterer allerede en farskapserklæring for oppgitt barn
    ErklaeringEksistererMor = 'ERKLAERING_EKSISTERER_MOR', // Mor har eksisterende farskapserklæring. Kan ikke opprette ny erklæring for ufødt barn.
    EsigneringSignatureierNull = 'ESIGNERING_SIGNATUREIER_NULL', // Signatureier er null i respons fra esigneringsløsningen
    EsigneringRedirecturlUkjent = 'ESIGNERING_REDIRECTURL_UKJENT', // Redirect-url for ukjent part mottatt fra e-signeringsløsningen
    FeilformatertUrlNyRedirect = 'FEILFORMATERT_URL_NY_REDIRECT', // Feilformatert redirect-url mottatt fra e-signeringsløsningen
    FeilformatertUrlUndertegnerurl = 'FEILFORMATERT_URL_UNDERTEGNERURL', // URL for å hente ny redirect-url er feilformatert
    FantIkkeFarskapserklaering = 'FANT_IKKE_FARSKAPSERKLAERING', // Oppgitt farskapserklæring ble ikke funnet i databasen
    FarHarIkkeFnummer = 'FAR_HAR_IKKE_FNUMMER', // Far er ikke registrert med fødselsnummer i PDL
    FeilRolle = 'FEIL_ROLLE', // Pålogget person kan verken opptre som mor eller far i løsningen
    FeilRolleFar = 'FEIL_ROLLE_FAR', // Personen har ikke riktig rolle for å kunne opptre som far i løsningen
    FeilRolleOpprette = 'FEIL_ROLLE_OPPRETTE', // Personen har ikke rettigheter til å opprette farskapserklæring
    FoedselsnummerManglerFar = 'FOEDSELNUMMER_MANGLER_FAR', // Fødselsnummer mangler for oppgitt far
    ForelderHarVerge = 'FORELDER_HAR_VERGE', // Forelder er registrert med verge i Folkeregisteret, og kan derfor ikke bruke løsningen
    IkkeMyndig = 'IKKE_MYNDIG', // Personen er ikke myndig
    IngenNyfoedteUtenFar = 'INGEN_NYFOEDTE_UTEN_FAR', // Mor er ikke registrert med noen nyfødte barn uten oppgitt far
    NyfoedtErForGammel = 'NYFODT_ER_FOR_GAMMEL', // Gyldighetsperioden for å erklære farskap er utløpt for oppgitt barn
    MedmorEllerUkjent = 'MEDMOR_ELLER_UKJENT', // Medmor eller person med ukjent rolle kan ikke benytte løsningen
    ForskjelligeFedre = 'FORSKJELLIGE_FEDRE', // Mor kan ikke opprette farskapserklæringer med forskjellige fedre for samme kull nyfødte
    MaksAntallForsoek = 'MAKS_ANTALL_FORSOEK', // Mor har brukt opp antall mulige forsøk på å komme frem til riktig kombinasjon av fars fødselsnummer og navn
    MorHarIkkeFnummer = 'MOR_HAR_IKKE_FNUMMER', // Mor er ikke registrert med fødselsnummer i PDL
    MorIkkeNorskBostedsadresse = 'MOR_IKKE_NORSK_BOSTEDSADRESSE', // Mor er ikke registrert med norsk bostedsadresse
    MorOgFarSammePerson = 'MOR_OG_FAR_SAMME_PERSON', // Mor kan ikke oppgi seg selv som far.
    MorSivilstandGift = 'MOR_SIVILSTAND_GIFT', // Mor kan ikke opprette farskapserklæring dersom hun er gift
    MorSivilstandRegistrertPartner = 'MOR_SIVILSTAND_REGISTRERT_PARTNER', // Mor kan ikke opprette farskapserklæring dersom hun er registrert partner
    MorSivilstandUoppgitt = 'MOR_SIVILSTAND_UOPPGITT', // Mor kan ikke opprette farskapserklæring dersom hun har sivilstand uoppgitt
    NavnStemmerIkkeMedRegister = 'NAVN_STEMMER_IKKE_MED_REGISTER', // Oppgitt navn til far stemmer ikke med fars navn i Folkeregisteret
    OppretteSigneringsjobb = 'OPPRETTE_SIGNERINGSJOBB', // Feil oppstod ved opprettelse av signeringsjobb mot Posten
    PdlFeil = 'PDL_FEIL', // Respons fra PDL inneholder feil
    PdlFoedselsdatoTekniskFeil = 'PDL_FOEDSELSDATO_TEKNISK_FEIL', // Feil inntraff ved henting av fødselsdato fra PDL for person
    PdlFoedselsdatoMangler = 'PDL_FOEDSELSDATO_MANGLER', // Respons fra PDL inneholdt ingen informasjon om personens foedselsdato
    PdlKjoennLavesteGyldighetstidspunkt = 'PDL_KJOENN_LAVESTE_GYLDIGHETSTIDSPUNKT', // Feil ved henting av laveste gyldighetstidspunkt for kjønnshistorikk
    PdlKjoennIngenInfo = 'PDL_KJOENN_INGEN_INFO', // Respons fra PDL inneholdt ingen informasjon om kjønn
    PdlKjoennOriginalt = 'PDL_KJOENN_ORIGINALT', // Feil ved henting av originalt kjønn fra PDL
    PdlNavnIkkeFunnet = 'PDL_NAVN_IKKE_FUNNET', // Fant ikke personens navn i PDL
    PdlPersonIkkeFunnet = 'PDL_PERSON_IKKE_FUNNET', // Fant ikke person i PDL
    PdlSivilstandIkkeFunnet = 'PDL_SIVILSTAND_IKKE_FUNNET', // Fant ikke informasjon om personens sivilstand i PDL
    PersonIkkePartIFarskapserklaering = 'PERSON_IKKE_PART_I_FARSKAPSERKLAERING', // Pålogget person er ikke forelder i oppgitt farskapserklaering
    PersonErDoed = 'PERSON_ER_DOED', // Død person kan ikke opptre som forelder i løsningen
    TermindatoUgyldig = 'TERMINDATO_UGYLDIG', // Oppgitt termindato er ikke innenfor godkjent intervall
}
