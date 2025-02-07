---
title: Items
---
# Items
**TODO:** Beschrijf hier welke *Items* er allemaal in het spel zullen voorkomen en hoe de speler interactie met ze aangaat. Is een *Item* om een puzzel op te lossen? Beschrijf dan hier wat voor soort puzzel je kunt verwachten en/of link naar relevante andere *game objecten*/onderdelen in je documentatie.

# ItemClass variables
- ItemName string
- ItemImage HTMLImageElement (link naar image file)
- ItemDescription string
- ItemDestroyMessage string
- ItemDestroySound HTMLAudioElement (link naar sound file)

# ItemClass functions
- OnPickupItem
- OnDestroyItem
- OnUseItem



flashlightItem om de donkere kamer te belichten. De cursor belicht de kamer en de player kan hiermee de deur naar de keuken vinden. Als de player klaar is met de lamp, dan wordt deze vernietigd met een message: "Your flashlight is out of batteries". De flashlight wordt gevonden wanneer de player een raadsel oplost in de storage room, de code vindt die daardoor tevoorschijn komt en deze invoert in de safe in de storage room.

BodyPartItem De player kan deze verzamelen voor de ghostCharacter in de keuken. Deze item varieert kwa uiterlijk aan de hand van wat de de ghostCharacter vraagt. 
