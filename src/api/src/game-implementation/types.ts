/**
 * Represents all data that should be stored for a player
 *
 * @remarks Can only contain JSON data types
 */
export type PlayerSession = {
    /** Alias of the room the player is in */
    currentRoom: string;
    inventory: string[];
    selectedItem: string;
    hiddenIn: string;
    walkedToBathtub: boolean;
    isPickingUpkey: boolean;
    pickedUpKey: boolean;
    walkedToMirror: boolean;
    knowsAboutSafe: boolean;
    solvedRiddle: boolean;
    safeOpened: boolean;
    pickedUpDiary: boolean;
    clickedFirstAid: boolean;
    pickedUpFirstAid: boolean;
    planksGone: boolean;
    outsideKeyUsed: boolean;
};
