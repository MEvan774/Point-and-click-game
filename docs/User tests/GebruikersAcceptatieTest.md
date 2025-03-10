# Gebruikers Acceptatie Test

**Projectnaam:** Kidnapped: Castle breakout
**Versie:** 7/3/2025
**Datum:** 7/3/2025
**Testteam:** Fourmula

## Legenda

De testscenarios kennen meerdere categorieen, het formaat is als volgt: UAT-ID categorie (path)  
G - Generiek / functionaliteiten  
R - Room / character / item specifiek  
O - Ontwerp / UI  

## Testscenarios

Scenario ID | Beschrijving | Verwachte resultaat | Status (pass/fail) | Opmerkingen
----------- | ------------ | ------------------- | ------------------ | -----------
UAT-0001G(1) | Als gebruiker kan ik een actie uitvoeren door op het juiste object in de kamer en daarna op de gewenste actie te klikken | De aangeklikte actie wordt uitgevoerd op het aangeklikte object. | [ ] Pass [ ] Fail | [Vul in]
UAT-0002R(2) | Als gebruiker kan ik niet meer praten met de MirrorCharacter na het geven van het juiste antwoord op het raadsel | Na het oplossen van het raadsel wordt de MirrorCharacter uit de StorageRoom verwijdert, waardoor er geen acties meer mogelijk zijn | [ ] Pass [ ] Fail | [Vul in]
UAT-0003R(2) | Als gebruiker kan ik de SafeItem niet openen voordat het raadsel is opgelost, en heb ik dus nog geen toegang tot de FlashlightItem | Wanneer de SafeItem wordt geprobeert open te maken voordat het raadsel is opgelost, krijgt de gebruiker een melding dat ze de verkeerde code invoeren en gaat de safe dus niet open | [ ] Pass [ ] Fail | [Vul in]
UAT-0004R(1) | Als gebruiker kan ik vanuit de StorageRoom naar de HallwayRoom gaan door op de deur en de open functie te klikken | Als de gebruiker op de deur in de StorageRoom klikt krijgt hij de Action Open te zien, en als deze aangeklikt wordt komt de gebruiker in de HallwayRoom |[ ] Pass [ ] Fail | [Vul in]
UAT-0005G(1) | Als gebruiker kan ik de OfficeRoom inkomen door op de deur in de HallwayRoom te klikken | De actie van kamer veranderen wordt uitgevoerd na het klikken van het object | [ ] Pass [ ] Fail | [Vul in]
UAT-0006GR(1) | Als gebruiker kan ik het DiaryItem oppakken nadat ik er op klik| Wanneer een gebruiker voor het eerst klikt op het object, verschijnt deze in de inventory | [ ] Pass [ ] Fail | [Vul in]
UAT-0007R(2) | Als gebruiker kan ik het DiaryItem eenmalig oppakken | Wanneer een gebruiker een tweede keer klikt op het object, krijgt de persoon te lezen dat hij/zij het item al opgeraapt heeft | [ ] Pass [ ] Fail | [Vul in]
UAT-0008R(1) | Als gebruiker kan ik na het oppakken van het DiaryItem in het inventory klikken om deze te lezen | Na het aanklikken in de inventory, verandert de background image binnen de room | [ ] Pass [ ] Fail | [Vul in]
