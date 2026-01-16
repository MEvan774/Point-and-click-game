import { Item } from "../../game-base/gameObjects/Item";
import { Examine } from "../../game-base/actions/ExamineAction";
import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { gameService } from "../../global";
import { Open } from "../actions/OpenAction";
import { PlayerSession } from "../types";
import { ActionTypes } from "../../game-base/enums/ActionAlias";

/**
 * A mirror the player can walk up to and examine, shows the MirrorCharacter
 *
 * @remarks Implements the Examine and Hide action
 */
export class SafeItem extends Item implements Examine, Open {
    // Alias of the item used to find the item
    public static readonly Alias: string = "Safe";

    /**
     * _position: Position of the item's hitbox
     * _size: Size of the item's hitbox
     * _isDebugHitboxVisible: If true, shows the hitbox as a pink square
     * _action: Action that happens when clicked on the item's hitbox
     * validActions: Array of the alias of the actions that are possible for this item
     */
    public _position: Vector2 = { x: 35, y: 200 };
    public _size: Vector2 = { x: 60, y: 60 };
    public _action: ActionTypes = ActionTypes.Examine;
    public _isDebugHitboxVisible: boolean = false;
    public static readonly validActions: string[] = ["open"];

    // Create a new instance of this item
    public constructor() {
        super(SafeItem.Alias, SafeItem.validActions);
    }

    // Name of the item, shows up on the buttons for example
    public name(): string {
        return "Safe";
    }

    /**
     * Tells about the item, changes when the safe is open
     *
     * @returns TextActionResult with the examine
     */
    public examine(): ActionResult | undefined {
        const playerSession: PlayerSession = gameService.getPlayerSession();

        // Updates PlayerSession with knowledge about the safe, necessary for the MirrorCharacter
        playerSession.knowsAboutSafe = true;

        // Checks if the safe has been opened
        if (playerSession.safeOpened) {
            return new TextActionResult(["The safe is already open."]);
        }

        // If the safe is not open
        return new TextActionResult([
            "There is a safe in the closet.",
            "The safe has a keypad on it.",
            "You suddenly hear whispers from the mirror...",
        ]);
    }

    /**
     * Opens the safe if it is not open and the riddle is solved
     *
     * @returns TextActionResult with the result of the action, either opening it, failing because the code
     * is wrong or it is already open
     */
    public open(): ActionResult | undefined {
        const playerSession: PlayerSession = gameService.getPlayerSession();

        // Checks if the safe is already open
        if (playerSession.safeOpened) {
            return new TextActionResult(["The safe is already open."]);
        }

        // Checks if the riddle is solved
        if (playerSession.solvedRiddle) {
            playerSession.safeOpened = true;
            playerSession.inventory.push("FlashlightItem");

            return new TextActionResult([
                "You put the code you found into the safe.",
                "...",
                "It works! You found the flashlight.",
                "+1 FlashlightItem",
            ]);
        }

        // When the riddle has not been solved and the SafeItem is not open
        return new TextActionResult([
            "You don't know the code.",
            "You try a random code...",
            "Wrong. Obviously.",
        ]);
    }
}
