/**
 * Represents all data that should be stored for a player
 *
 * @remarks Can only contain JSON data types
 */
export type PlayerSession = {
    // Alias of the room the player is in
    currentRoom: string;
    // Current inventory of the player
    inventory: string[];
    // Currently selected item in the inventory
    selectedItem: string;
    // If hidden, logs the room the player is hidden in
    hiddenIn: string;
    // True if player is near the BathtubItem
    walkedToBathtub: boolean;
    // True when the player is picking up the KeyItem in the BathroomRoom
    isPickingUpkey: boolean;
    // True when the player has picked up the KeyItem in the BathroomRoom
    pickedUpKey: boolean;
    // True when the player is near the MirrorItem
    walkedToMirror: boolean;
    // True when the player examined the SafeItem
    knowsAboutSafe: boolean;
    // True when the player solved the riddle of the MirrorCharacter
    solvedRiddle: boolean;
    // True when the player opened the SafeItem
    safeOpened: boolean;
    // True when player clicked on DiaryItem
    clickedDiary: boolean;
    // True when player picked up the DiaryItem
    pickedUpDiary: boolean;
    // True when player clicked on the FirstAidItem
    clickedFirstAid: boolean;
    // True when player picked up the FirstAidItem
    pickedUpFirstAid: boolean;
    // True when the CrowbarItem is used on the FrontDoorItem
    planksGone: boolean;
    // True when the OutsideKeyItem is used on the FrontDoorItem
    outsideKeyUsed: boolean;
    // True when clicked on help
    clickedHelp: boolean;
    // Turns the lights on when true
    pressedLight: boolean;
    // True when clicked on Light
    clickedLight: boolean;
};
