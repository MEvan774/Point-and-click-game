# Stap 1: 
## Organisatorische context
### Opdracht & Opdrachtgever:
- Ontwikkelaars: Deze game wordt ontwikkeld door medewerkers van Game Studio Luca Stars.

- Vereisten: Inhoudelijke en technische eisen worden bepaald door de Product Owners en er wordt door middel van meerdere T.M.C cyclussen, guerillatesten en gebruikersacceptatiecriteria bepaald of deze eisen goed worden nageleefd.

- Werkwijze: Er zal volgens de SCRUM-methode gewerkt worden, dit houdt in dat er telkens (kleine) werkende onderdelen worden opgeleverd tot het uiteindelijk een geheel wordt. Sprints duren 2 tot 3 weken met aan het einde een sprint review en retrospective, ook is er een dagelijkse standup om de voortgang te bewaken. Daarnaast wordt de backlog bijgewerkt na feedback van de Product Owner en Gebruikersacceptatietesten (UAT).

- Projectdoel: Deze game is een entertainmentproduct. Het doel is dat spelers zich vermaken wanneer zij dit spel spelen

### Gebruikers & rollen:
- Spelers: Dit zijn de mensen die de game gaan gebruiken, zij kunnen door middel van puzzels oplossen, items vinden of raadsels oplossen voortgang maken binnen de game en op deze manier het spel uitspelen.

- Ontwikkelteam: Het team werkt aan de gamefunctionaliteit en de communicatie tussen de front-end en backend van de game.

- Docenten & begeleiders: Begeleiden het ontwikkelproces en beoordelen het product.

- Spel format: Het spel bestaat uit **rooms**, **items** en **characters**. Elke room bevat unieke items en characters die de speler helpen voortgang te maken in het spel.

# Stap 2:
## Technische context
- Data-Opslag: Wij maken gebruik van SessionStorage om de voortgang van het spel op te slaan.  
Doordat de game geen gevoelige informatie en geen grote gegevens zal bevatten, biedt een database geen meerwaarde voor deze game en heeft team **Fourmula** besloten geen externe database te gebruiken.  
SessionStorage-data wordt gewist zodra de browser is gesloten, omdat deze game binnen 5 tot 10 minuten uit te spelen is past dit binnen de scope van het project.

- Communicatie Front-End -> Backend: Communicatie tussen de front-en-backend vindt bij ons plaats via onder andere "shared/types" en "game-implementation/GameController".

- Versiebeheer: Er wordt gebruik gemaakt van de versiebeheertool **GitLab**.  
Elk teamlid werkt in eigen branches, de branches gaan per room om zo overzicht van de voortgang van het project te houden.  
Bij commits wordt er gebruik gemaakt van **Feat** om een toevoeging aan te geven en **Fix** om een bugfix aan te geven.  
Branches worden samengevoegd in de Main-branch door een merge request, ieder teamlid is standaard verantwoordelijk voor zijn/haar code, maar een teamlid houdt specifiek de Coding Conventions bij om zo de kwaliteit te waarborgen.
Commits worden in het volgende format gedaan: **Fix/Feat**: [Wat er gedaan is]. 

- Security: Er wordt gebruik gemaakt van HTTPS en OWASP-beveiligingsrichtlijnen voor veilige API's. De reden dat wij HTTPS gebruiken is zodat gebruikers altijd naar een veilige website genavigeerd worden, en niet een melding krijgen dat de website onveilig is en potentieel spelers wegjaagd.

# 3: Beschrijf vereisten, standaarden en richtlijnen

Functionele vereisten:
- De voortgang van de gebruiker wordt opgeslagen op hun eigen apparaat, zodat ze verder kunnen spelen als ze het opnieuw opstarten, in plaats van dat ze opnieuw moeten beginnen.
- De game is toegankelijk via een webbrowser.

Technische vereisten:
- De API ondersteunt veilige communicatie via HTTPS.
- De gegevens worden opgeslagen in de local storage, en er worden geen gegevens opgeslagen in een online database.

Standaarden en richtlijnen:
- Gebruik van de Code Conventions van de HBO-ICT Knowledgebase.
- Gebruik van de OWASP-beveiligingsrichtlijnen voor veilige API's.

Wetten en regelgeving:
- Niet opslaan van gebruikersgegevens.

# 4: Inrichting van de infrastructuur

De infrastructuur voor dit project wordt volledig gehost op de HBO-ICT.Cloud, bestaande uit:

1.  Frontend: Een statisch gehoste webapplicatie.

2.  Backend: Een API-server, draaiend op Express.js.

3.  Database: Niet gebruikt.

Teamgegevens:

Frontend URL: 
Backend URL: 
Poorten: 3366

# Stap 10: 
### Backend configureren


Stap 7:

Ik heb de volgende stappen gevolgd:

Eerst ben ik naar de main branch gegaan in Visual Studio Code.
Daarna heb ik npm install uitgevoerd, waardoor alles up-to-date werd.

Vervolgens heb ik npm run build uitgevoerd, waardoor er een dist-map werd aangemaakt.
Daarin zaten twee mappen: web en api.

Vervolgens heb ik de app "Bitvise" gebruikt om een SFTP-verbinding te maken met de HBO ICT CLOUD DATABASE.

Toen heb ik in de wwwroot map de dist/web-bestanden gezet en in de app-map de dist/app-bestanden.

En als laatste heb ik de omgeving in de HBO ICT CLOUD herstart.



Stap 10: 
Backend configureren

Installeer de benodigde software en afhankelijkheden voor de backend.
Configureer de server en zorg ervoor dat deze klaar is om requests te verwerken.
Implementeer API die de communicatie tussen de frontend en backend mogelijk maken.



### Frontend uploaden

Zorg ervoor dat de frontend (TypeScript) is voorbereid en geoptimaliseerd.
Upload de bestanden naar de server of een webhost (via FTP of een CI/CD-pijplijn).
Test de responsiviteit en prestaties van de frontend op verschillende apparaten.



### Beveiliging implementeren

Implementeer manieren om een veilige verbinding te garanderen.
Zorg ervoor dat gebruikersdata wordt beschermd door middel van versleuteling waar nodig.
Stel een juiste authenticatie en autorisatie in om te zorgen dat alleen geautoriseerde gebruikers toegang hebben tot specifieke functionaliteiten.



### Controle en afronding

Test de applicatie grondig door middel van functionele tests, stress tests en gebruikerservaring.
Controleer of de frontend goed samenwerkt met de backend en dat alle interfaces goed functioneren.
Voer een laatste controle uit op beveiligingsmaatregelen en prestaties.
