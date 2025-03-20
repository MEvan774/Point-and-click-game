import { Item } from "../../../game-base/gameObjects/Item";
import { Examine } from "../../../game-base/actions/ExamineAction";
import { ActionResult } from "../../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../../game-base/actionResults/TextActionResult";
import { GoTo } from "../../actions/GoToAction";
import { ActionTypes } from "../../../game-base/enums/ActionAlias";
import { PlayerSession } from "../../types";
import { gameService } from "../../../global";
import { Room } from "../../../game-base/gameObjects/Room";
import { Open } from "../../actions/OpenAction";
import { WinScreenRoom } from "../../rooms/WinScreenRoom";
import { FrontDoorRoom } from "../../rooms/FrontDoorRoom";

/**
 * The item that is used to go to the OutsideRoom from the FrontDoorRoom
 *
 * @remarks Implements the Examine, GoTo and Open action
 */
export class DoorFrontDoorOutsideItem extends Item implements Examine, GoTo, Open {
    // Alias of the item used to find the item
    public static readonly Alias: string = "DoorFrontDoorOutsideItem";

    /**
     * _position: Position of the item's hitbox
     * _size: Size of the item's hitbox
     * _isDebugHitboxVisible: If true, shows the hitbox as a pink square
     * _action: Action that happens when clicked on the item's hitbox
     * validActions: Array of the alias of the actions that are possible for this item
     */
    public _position: Vector2 = { x: -110, y: 139 };
    public _size: Vector2 = { x: 190, y: 245 };
    public _isDebugHitboxVisible: boolean = false;
    public _action: ActionTypes = ActionTypes.Examine;
    public static readonly validActions: string[] = ["go to", "open"];

    // Create a new instance of this item
    public constructor() {
        super(DoorFrontDoorOutsideItem.Alias, DoorFrontDoorOutsideItem.validActions);
    }

    // Name of the item, shows up on the buttons for example
    public name(): string {
        return "Outside";
    }

    /**
     * Tells about the state of the door
     *
     * @returns TextActionResult with the state of the door (open/closed)
     */
    public examine(): ActionResult | undefined {
        const playerSession: PlayerSession = gameService.getPlayerSession();

        // If the door is open
        if (playerSession.outsideKeyUsed && playerSession.planksGone) {
            return new TextActionResult([
                "This is the front door.",
                "You have opened it and can go outside.",
            ]);
        }

        // If the key is used but the crowbar is not
        if (playerSession.outsideKeyUsed) {
            return new TextActionResult([
                "This is the front door.",
                "It is not locked anymore,",
                "But you still have to get the planks off.",
            ]);
        }

        // If the crowbar is used but the key not
        if (playerSession.planksGone) {
            return new TextActionResult([
                "This is the front door.",
                "The planks are gone,",
                "But you still need the key to open it.",
            ]);
        }

        // If the door is fully locked
        return new TextActionResult([
            "This is the front door.",
            "It is locked.",
            "Seems like you need a key and something to get the planks of the door.",
        ]);
    }

    /**
     * Go to the OutsideRoom if door is opened, otherwise tells the user what they need to open the door
     *
     * @returns room.examine() for the OutsideRoom, or TextActionResult naming what is needed to open the door
     */
    public goto(): ActionResult | undefined {
        const playerSession: PlayerSession = gameService.getPlayerSession();

        // If the door is opened, go to the OutsideRoom
        if (playerSession.planksGone && playerSession.outsideKeyUsed) {
            gameService.getPlayerSession().lastRoom = FrontDoorRoom.Alias;
            const room: Room = new WinScreenRoom();

            gameService.getPlayerSession().currentRoom = room.alias;
            return room.examine();
        }

        // If the crowbar is used but the key is not
        if (playerSession.planksGone) {
            return new TextActionResult([
                "The planks are gone, but you still need to find a key.",
            ]);
        }

        // If the key is used but the crowbar is not
        if (playerSession.outsideKeyUsed) {
            return new TextActionResult([
                "You still have to get rid of the planks to go outside.",
            ]);
        }

        // If the door is fully locked
        return new TextActionResult([
            "Its locked, you should find a key and something to get the planks of the door.",
        ]);
    }

    /**
     * Opens the door if the right item is selected, otherwise tells the user what they need to open the door
     *
     * @returns TextActionResult about the state of the door
     */
    public open(): ActionResult | undefined {
        const playerSession: PlayerSession = gameService.getPlayerSession();

        // If the key is selected, the planks are gone and the key is not used yet
        if (playerSession.selectedItem === "OutsideKeyItem" &&
          playerSession.planksGone && !playerSession.outsideKeyUsed) {
            playerSession.outsideKeyUsed = true;

            return new TextActionResult([
                "You use the key on the door...",
                "It fits!",
                "The door is now open!",
            ]);
        }

        // If the key is selected, the planks are not gone and the key is not used yet
        if (playerSession.selectedItem === "OutsideKeyItem" && !playerSession.outsideKeyUsed) {
            playerSession.outsideKeyUsed = true;

            return new TextActionResult([
                "You use the key on the door...",
                "It fits!",
                "Now you only have to get rid of the planks.",
            ]);
        }

        // If the crowbar is selected, the key is used and the planks are not gone yet
        if (playerSession.selectedItem === "CrowbarItem" && playerSession.outsideKeyUsed && !playerSession.planksGone) {
            playerSession.planksGone = true;

            return new TextActionResult([
                "You take the planks of the door using the crowbar you found.",
                "The door is now open!",
                "You can go outside from now.",
            ]);
        }

        // If the crowbar is selected, the key is not used and the planks are not gone yet
        if (playerSession.selectedItem === "CrowbarItem" && !playerSession.planksGone) {
            playerSession.planksGone = true;

            return new TextActionResult([
                "You take the planks of the door using the crowbar you found.",
                "Now you only have to find a key that fits...",
            ]);
        }

        // If the key is used and the planks are gone
        if (playerSession.outsideKeyUsed && playerSession.planksGone) {
            return new TextActionResult(["The door is already open..."]);
        }

        // If the key is selected but already used
        if (playerSession.selectedItem === "OutsideKeyItem" && playerSession.outsideKeyUsed) {
            return new TextActionResult(["You have already used the key."]);
        }

        // If the crowbar is selected but already used
        if (playerSession.selectedItem === "CrowbarItem" && playerSession.planksGone) {
            return new TextActionResult(["You have already got rid of the planks."]);
        }

        // If the wrong key is used
        if (playerSession.selectedItem === "KeyItem") {
            return new TextActionResult([
                "You try to open the door with the key you found...",
                "It doesn't fit.",
                "Try finding another key.",
            ]);
        }

        // If neither the key or the crowbar is selected
        return new TextActionResult(["You should use a key and something to get rid of the planks."]);
    }
}
