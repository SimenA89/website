# Endringslogg (Changelog)

Alle viktige endringer i prosjektet vil bli dokumentert i denne filen.

## [Ikke utgitt] - Nåværende oppdatering

### Lagt til (Added)
- **Eksternt JavaScript (`script.js`):** Trukket ut all JavaScript (tema-bytte, validering, animasjoner) i en felles ekstern fil som lastes med `defer`.
- **SEO & Meta-tags:** Lagt til fullverdige Open Graph-tags og _meta descriptions_ på hver side for optimal deling på sosiale medier og bedre synlighet for søkemotorer.
- **Lys/mørk modus (Dark mode):** Implementert en knapp og et tilhørende skript som lar brukeren bytte mellom lyst og mørkt tema. Valget lagres i `localStorage` slik at det huskes til neste besøk.
- **Nytt stilark (`styles.css`):** All CSS er trukket ut og restrukturert med moderne CSS-variabler (`var(--bg)`, `var(--text)`, osv.) for å muliggjøre enkel temabytting og bedre kodevedlikehold.
- **Bilder:** Lagt til nye prosjektbilder (`filmanbefaling.png` og `todo3.png`) i bildemappen.
- **Lokal servering (`serve.ps1`):** Lagt til et PowerShell-skript for enkel, lokal kjøring/testing av nettsiden.
- **Skjema-validering:** Lagt til sjekk på kontaktsiden (`contact.html`) at ingen felt kan være tomme før innsending.

### Endret (Changed)
- **Komponent-struktur (DRY):** Erstattet statiske `<header>` og `<footer>`-elementer i alle HTML-filer med dynamiske *Web Components* (`<site-header>` og `<site-footer>`) i Vanilla JS for enklere fremtidig vedlikehold av fellesseksjoner.
- **Universell utforming (a11y):** Innholdet er nå semantisk pakket inn i `<main>`-tags, og HTML-språket er satt til `lang="en"`.
- **Bilder / Ytelse:** Lagt til beskrivende `alt`-tekster for skjermlesere og SEO, samt `loading="lazy"` slik at nettsiden laster mye raskere.
- **Responsivt design:** Hovedsiden (`index.html`), prosjektsiden (`projects.html`), og om-siden (`about.html`) har fått forbedret grid- og flexbox-layout for å skalere bedre på mobil og nettbrett.
- **Lenker og navigeringsmeny:** Meny-layouten flyter nå mye bedre med `display: flex` og gap, fremfor den gamle `float: right`-metoden.
- **Animasjoner:** Oppdaterte "skills"-seksjonen med en innfade-animasjon som også respekterer brukernes OS-innstillinger for redusert bevegelse (`prefers-reduced-motion`).
- **Headere og Footere:** De har nå fått dynamiske farger avhengig av om brukeren er i lys eller mørk modus.
- **Kode-opprydding:** Fjernet alle gjenværende inline `<style>`-tags i HTML-filene og samlet all CSS i styles.css for et ryddigere oppsett.

---

