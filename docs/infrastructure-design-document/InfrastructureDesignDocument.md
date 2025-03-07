# Stap 1: 
## Organisatorische context
### Opdracht & opdrachtever:
- Deze game wordt ontwikkeld door medewerkers van Game Studio Luca Stars.
- Inhoudelijke en technische eisen worden bepaald door de Product Owners en er wordt door middel van meerdere T.M.C cyclussen en guerilla testen bepaald of deze eisen goed nageleefd worden

### Gebruikers & rollen:
- Spelers: Dit zijn de mensen die de game gaan gebruiken
- Ontwikkelteam: Het team werkt aan de gamefunctionaliteit en de backend van de game.
- Docenten & begeleiders: Begeleiden het ontwikkelproces en beoordelen het product.

# Stap 2:
## Technische context

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
