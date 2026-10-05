# Chevalier & Roth – GitHub Pages Website

Diese Version ist so vorbereitet, dass du den **gesamten Inhalt dieses Ordners direkt in ein GitHub-Repository hochladen** kannst.

## GitHub Pages veröffentlichen

1. Auf GitHub ein neues Repository erstellen, z. B. `chevalier-roth`.
2. Alle Dateien aus diesem Ordner in die oberste Ebene des Repositorys hochladen.
3. In GitHub: **Settings → Pages**.
4. Unter **Build and deployment**: `Deploy from a branch`.
5. Branch: `main`, Ordner: `/ (root)` und speichern.
6. Nach wenigen Minuten ist die Website über die von GitHub angezeigte Pages-Adresse erreichbar.

## Admin Login

- Login-Seite: `admin.html`
- Admin-E-Mail: `admin@chevalier-roth.lu`
- Passwort: `CR!Lux2026#Maison47`

**Wichtig:** GitHub Pages ist ein statischer Hosting-Dienst. Ein Login, der nur mit HTML/JavaScript umgesetzt ist, ist **kein sicherer Schutz** für sensible Shopdaten. Für einen echten öffentlichen Shop sollte die Admin-Authentifizierung über einen Backend-Dienst wie Appwrite umgesetzt werden.

## Hamburger-Menü

Das globale Hamburger-Menü wird über `cr-nav.js` auf allen HTML-Seiten eingeblendet. Darin befinden sich Startseite, Kollektion, Konto, Warenkorb, Versand, Zahlung, Widerruf, AGB, Datenschutz, Impressum, Streitschlichtung und Admin.

## Produktbilder

Die Bilddateien bleiben im selben Ordner wie die Website. Die empfohlenen Dateinamen stehen in `BILDER-HIER-REIN.txt`.
