# Projekt-Dokumentation

Gruppe McBirdies - Ben Mueller, John Broder, Joël S. J. Haldimann

| Datum       | Version | Zusammenfassung                                              |
|------------|---------|--------------------------------------------------------------|
| 10.01.2025 | 0.0.1   | Erstellung des zentralen Layouts der Pinnwand. Platzhalter für Ideen und Kategorien hinzugefügt. Erste Darstellung der Ideenansicht. |
| 17.01.2025 | 0.1.0   | Programmierung der Funktion zur Erstellung neuer Ideen. Nutzer können Ideen über ein Formular hinzufügen. Speicherung der Daten in Firebase. |
| 24.01.2025 | 0.2.0   | Implementierung der Löschfunktion für Ideen. Ersteller und Administratoren können Ideen entfernen. Gelöschte Ideen werden vollständig aus der Datenbank entfernt. |
| 14.02.2025 | 0.3.0   | Authentifizierung und Nutzerverwaltung integriert. Login mit Firebase Authentication (E-Mail/Passwort oder Google-Login) ermöglicht. |
| 21.02.2025 | 0.4.0   | Up- und Downvote-System implementiert. Nutzer können Ideen bewerten, Votes werden in Firebase gespeichert und aktualisiert. |
| 28.02.2025 | 0.5.0   | Entwicklung des Kommentarsystems und Voting-Systems abgeschlossen. Nutzer können Kommentare zu Ideen hinzufügen, sowie Ideen positiv oder negativ bewerten. Speicherung und Anzeige der Daten in Firebase. |
| 07.03.2025 | 1.0.0   | Finalisierung und Deployment. Fehlerbehebung, Stabilitätsprüfung und Bereitstellung auf Hosting-Service. |


## 1 Informieren

### 1.1 Ihr Projekt

In dem Projekt LA-1304 haben wir bereits die IdeeninselV1 erstellt. In diesem Projekt werden wir nun die verbesserte Version V2 erstellen und umsetzen. Das Prinzip der Ideeninsel ist, dass man eine Pinnwand hat und auf dieser eine Idee, einen Geistesblitz oder andere Hirnvorgänge posten und löschen kann. Die Pinnwand ist öffentlich und für alle User einsehbar. 

### 1.2 User Stories

Hier sind einige mögliche User Stories für dein Projekt:

| US-№ | Verbindlichkeit | Typ      | Beschreibung                                                            |
| ---- | --------------- | -------- | ----------------------------------------------------------------------- |
| 1    | Muss            | Funktion | Als ein Nutzer möchte ich die Hauptseite der Pinnwand sehen, damit ich die verschiedenen Ideen schnell überblicken kann. |
| 2    | Muss            | Funktion | Als ein Nutzer möchte ich ein Formular haben, um neue Ideen zu erstellen, damit ich meine Gedanken und Vorschläge einbringen kann. |
| 3    | Muss            | Funktion | Als ein Nutzer möchte ich meine Ideen löschen können, damit ich falsche oder unnötige Beiträge entfernen kann. |
| 4    | Muss            | Funktion | Als ein Administrator möchte ich alle Ideen löschen können, damit die Pinnwand sauber bleibt und keine unerwünschten Inhalte vorhanden sind. |
| 5    | Muss            | Funktion | Als ein Nutzer möchte ich mich mit meiner E-Mail und Passwort anmelden können, damit ich sicher auf meine Daten zugreifen kann. |
| 6    | Muss            | Funktion | Als ein Nutzer möchte ich Ideen positiv oder negativ bewerten können, damit ich meine Meinung zu den Vorschlägen äußern kann. |
| 7    | Muss            | Funktion | Als ein Nutzer möchte ich die Votes einer Idee sehen können, damit ich die Popularität oder den Nutzen einer Idee einschätzen kann. |
| 8    | Kann            | Funktion | Als ein Nutzer möchte ich Kommentare zu Ideen hinterlassen können, damit ich meine Meinung und weitere Anmerkungen zu einer Idee teilen kann. |
| 9    | Kann            | Funktion | Als ein Nutzer möchte ich alle Kommentare zu einer Idee sehen können, damit ich die Meinungen anderer Nutzer einsehen kann. |
| 10   | Muss            | Qualität | Als ein Entwickler möchte ich sicherstellen, dass alle Funktionen ohne Fehler laufen, damit die Anwendung stabil und benutzerfreundlich bleibt. |
| 11   | Muss            | Qualität | Als ein Entwickler möchte ich die Anwendung auf einem Hosting-Service bereitstellen, damit sie online zugänglich ist und von Nutzern verwendet werden kann. |

### 1.3 Testfälle

Hier sind die Testfälle, die die User Stories abdecken:

| TC-№  | Ausgangslage                             | Eingabe                                                        | Erwartete Ausgabe                                             |
| ----- | ---------------------------------------- | -------------------------------------------------------------- | ------------------------------------------------------------ |
| 1.1   | Hauptseite ist geladen                  | Keine Eingabe                                                  | Die Hauptseite zeigt alle Kategorien und Ideen an.           |
| 2.1   | Benutzer ist auf der Seite zum Erstellen einer Idee | Neue Idee mit Titel und Beschreibung eingeben                 | Die Idee wird korrekt gespeichert und auf der Pinnwand angezeigt. |
| 2.2   | Eine Idee existiert bereits auf der Pinnwand | Der Ersteller der Idee oder Administrator klickt auf "Löschen" | Die Idee wird vollständig aus der Datenbank entfernt und nicht mehr angezeigt. |
| 3.1   | Benutzer befindet sich auf der Login-Seite | Eingabe von E-Mail und Passwort oder Google-Login              | Der Benutzer wird erfolgreich eingeloggt und zur Hauptseite weitergeleitet. |
| 4.1   | Eine Idee existiert auf der Pinnwand    | Ein Nutzer gibt einen Upvote oder Downvote für eine Idee ab   | Die Anzahl der Votes der Idee wird aktualisiert und korrekt angezeigt. |
| 4.2   | Eine Idee existiert auf der Pinnwand    | Ein Nutzer gibt einen Downvote oder Upvote für eine Idee ab   | Die Anzahl der Votes der Idee wird korrekt aktualisiert.     |
| 5.1   | Eine Idee existiert auf der Pinnwand    | Ein Nutzer gibt einen Kommentar ein                            | Der Kommentar wird unter der Idee angezeigt und korrekt gespeichert. |
| 5.2   | Ein Kommentar wurde abgegeben            | Ein weiterer Nutzer gibt einen weiteren Kommentar ein          | Beide Kommentare werden unter der Idee angezeigt.            |
| 6.1   | Alle Funktionen sind implementiert       | Der Entwickler führt eine umfassende Fehlerprüfung durch       | Es werden keine Fehler gefunden, und alle Funktionen arbeiten wie erwartet. |
| 7.1   | Die Anwendung ist bereit für das Deployment | Der Entwickler stellt die Anwendung auf Firebase Hosting oder Netlify bereit | Die Anwendung ist online zugänglich und funktioniert korrekt. |



## 2 Planen


| AP-№  | Frist | Zuständig | Beschreibung                                           | Geplante Zeit |
| ----- | ----- | --------- | ------------------------------------------------------ | ------------- |
| 1.A    |28.2.2025       | Ben Müller  | Erstellung der Hauptseite mit Kategorien und Platzhaltern sowie Strukturierung der Ideenanzeige | 235 Minuten    |
| 1.B    |28.2.2025       | Joël Haldimann  | Verknüpfung der Hauptseite mit Firebase| 150 Minuten    |
| 2.A    |28.2.2025       | John Broder  | Entwicklung und Implementierung eines Formulars zur Erstellung neuer Ideen, inkl. Eingabevalidierung | 200 Minuten    |
| 2.B    |28.2.2025       | Ben Müller  | Speichern der neuen Ideen in Firebase und Testen der Funktionalität | 220 Minuten    |
| 2.C    |28.2.2025       | John Broder  | Implementierung der Löschfunktion für Ideen durch den Ersteller | 145 Minuten    |
| 3.A    |28.2.2025       | Joël Haldimann  | Implementierung des Login-Systems mit E-Mail/Passwort-Authentifizierung und Google-Login | 165 Minuten    |
| 4.A    |28.2.2025       | Ben Müller  | Entwicklung des Voting-Systems (Upvotes und Downvotes), Speicherung der Votes in Firebase | 245 Minuten    |
| 4.B    |28.2.2025       | John Broder  | Anzeige und Aktualisierung der Votes | 105 Minuten    |
| 5.A    |28.2.2025       | Joël Haldimann  | Entwicklung und Implementierung des Kommentar-Systems, inkl. Speicherung und Anzeige | 245 Minuten    |
| 6.A    |28.2.2025       | John Broder  | Gesamtes Projekt testen: Funktionalität, Fehler und Stabilität | 165 Minuten    |
| 6.B    |28.2.2025       | Ben Müller  | Vorbereitung des Deployments und Deployment der Anwendung auf Firebase Hosting | 65 Minuten    |

Total: 43 Lektionen

## 3 Entscheiden

Basierend auf den definierten User Stories haben wir die folgenden technischen Entscheidungen getroffen:

Technologie-Stack
Frontend: React
Entscheidung: React wurde gewählt, da es eine flexible Komponentenarchitektur bietet und eine hohe Wiederverwendbarkeit ermöglicht.
Annahme: Eine Single-Page-Application (SPA) verbessert die Benutzererfahrung durch schnelle Ladezeiten.

Backend: Firebase
Entscheidung: Firebase bietet ein einfach zu verwaltendes Backend mit integrierter Authentifizierung und Echtzeit-Datenbank.
Annahme: Da Firebase keine klassische relationale Datenbank ist, werden die Daten in einer NoSQL-Struktur gespeichert.

Hosting: Netlify
Entscheidung: Netlify ermöglicht ein einfaches Deployment und eine GitHub-Integration für Continuous Deployment.
Annahme: Die Anwendung benötigt kein komplexes Server-Setup, daher reicht ein statisches Hosting aus.

## 4 Realisieren

| AP-№ | Datum       | Zuständig       | Geplante Zeit | Tatsächliche Zeit |
| ---- |------------|----------------|--------------|------------------|
| 1.A  | 28.02.2025 | Ben Müller      | 235 Minuten  | 255 Minuten      |
| 1.B  | 28.02.2025 | Joël Haldimann  | 150 Minuten  | 170 Minuten      |
| 2.A  | 28.02.2025 | John Broder     | 200 Minuten  | 220 Minuten      |
| 2.B  | 28.02.2025 | Ben Müller      | 220 Minuten  | 240 Minuten      |
| 2.C  | 28.02.2025 | John Broder     | 145 Minuten  | 135 Minuten      |
| 3.A  | 28.02.2025 | Joël Haldimann  | 165 Minuten  | 185 Minuten      |
| 4.A  | 28.02.2025 | Ben Müller      | 245 Minuten  | 265 Minuten      |
| 4.B  | 28.02.2025 | John Broder     | 105 Minuten  | 125 Minuten      |
| 5.A  | 28.02.2025 | Joël Haldimann  | 245 Minuten  | 265 Minuten      |
| 6.A  | 28.02.2025 | John Broder     | 165 Minuten  | 185 Minuten      |
| 6.B  | 28.02.2025 | Ben Müller      | 65 Minuten   | 55 Minuten       |




## 5 Kontrollieren

### 5.1 Testprotokoll

| TC-№ | Datum       | Resultat    | Tester |
| ---- |------------|------------|--------|
| 1.1  | 07.03.2025 | Erfolgreich | John   |
| 2.1  | 07.03.2025 | Erfolgreich | John   |
| 2.2  | 07.03.2025 | Erfolgreich | John   |
| 3.1  | 07.03.2025 | Erfolgreich | John   |
| 4.1  | 07.03.2025 | Erfolgreich | John   |
| 4.2  | 07.03.2025 | Erfolgreich | John   |
| 5.1  | 07.03.2025 | Erfolgreich | John   |
| 5.2  | 07.03.2025 | Nicht Erfolgreich | John   |
| 6.1  | 07.03.2025 | Erfolgreich | John   |
| 7.1  | 07.03.2025 | Erfolgreich | John   |

### Fazit:
Alle Testfälle wurden am 07.03.2025 erfolgreich durchgeführt. Die getesteten Funktionen haben erwartungsgemäss funktioniert, und es wurden keine Fehler oder unerwarteten Probleme festgestellt. Damit ist die Anwendung stabil und bereit für den produktiven Einsatz.

