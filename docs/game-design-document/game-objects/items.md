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



LampItem om de donkere kamer te belichten. De cursor belicht de kamer en de player kan hiermee een geheime doorgang vinden. Als de player klaar is met de lamp, dan wordt deze vernietigd met een message: "Your lamp is gone"

BodyPartItem De player kan deze verzamelen voor de ghostCharacter in de keuken. Deze item varieert kwa uiterlijk aan de hand van wat de de ghostCharacter vraagt. 
