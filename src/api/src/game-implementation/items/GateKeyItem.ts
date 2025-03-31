import { Item } from "../../game-base/gameObjects/Item";
import { Examine } from "../../game-base/actions/ExamineAction";
import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { ActionTypes } from "../../game-base/enums/ActionAlias";
import { PickUp } from "../actions/PickUpAction";
import { gameService } from "../../global";
import { PlayerSession } from "../types";

/**
 * A closet the player can hide inside
 *
 * @remarks Implements the Examine and Hide action
 */
export class GateKeyItem extends Item implements Examine, PickUp {
    // Alias of the item used to find the item
    public static readonly Alias: string = "gate key";

    /**
     * _position: Position of the item's hitbox
     * _size: Size of the item's hitbox
     * _isDebugHitboxVisible: If true, shows the hitbox as a pink square
     * _action: Action that happens when clicked on the item's hitbox
     * validActions: Array of the alias of the actions that are possible for this item
     */
    public _position: Vector2 = { x: 100, y: 185 };
    public _size: Vector2 = { x: 95, y: 90 };
    public _isDebugHitboxVisible: boolean = false;
    public _action: ActionTypes = ActionTypes.Examine;
    public static readonly validActions: string[] = ["pick up"];

    // Create a new instance of this item
    public constructor() {
        super(GateKeyItem.Alias, GateKeyItem.validActions);
    }

    // Name of the item, shows up on the buttons for example
    public name(): string {
        return "Gate key";
    }

    /**
     * Tells about the item
     *
     * @returns TextActionResult with the examine
     */
    public examine(): ActionResult | undefined {
        const playerSession: PlayerSession = gameService.getPlayerSession();

        if (playerSession.inventory.includes("GateKeyItem")) {
            return new TextActionResult([
                "There is nothing interesting here left",
            ]);
        }

        return new TextActionResult([
            "There is a key here!",
            "It's so big, it doesn't look like it would fit a door,",
            "You should pick it up.",
        ]);
    }

    /**
     * Tells about the item
     *
     * @returns TextActionResult with the examine
     */
    public pickup(): ActionResult | undefined {
        const playerSession: PlayerSession = gameService.getPlayerSession();

        if (playerSession.inventory.includes("GateKeyItem")) {
            return new TextActionResult([
                "You already picked up the key here,",
                "There is nothing interesting left.",
            ]);
        }

        playerSession.inventory.push("GateKeyItem");

        return new TextActionResult([
            "You pick up the key.",
            "+1 GateKeyItem",
        ]);
    }
}
