import { ActionTypes } from "../../game-base/enums/ActionAlias";
import { Item } from "../../game-base/gameObjects/Item";
import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Examine } from "../../game-base/actions/ExamineAction";
import { Open } from "../actions/OpenAction";
import { PlayerSession } from "../types";
import { gameService } from "../../global";

export class FreezerItem extends Item implements Examine, Open {
    /**
     * _position: Position of the item's hitbox
     * _size: Size of the item's hitbox
     * _isDebugHitboxVisible: If true, shows the hitbox as a pink square
     * _action: Action that happens when clicked on the item's hitbox
     * validActions: Array of the alias of the actions that are possible for this item
     */
    public static readonly Alias: string = "Freezer";
    public _position: Vector2 = { x: 230, y: 400 };
    public _size: Vector2 = { x: 200, y: 170 };
    public _isDebugHitboxVisible: boolean = false;
    public _action: ActionTypes = ActionTypes.Examine;
    public static readonly validActions: string[] = ["open"];

    public constructor() {
        super(FreezerItem.Alias, FreezerItem.validActions);
    }

    /**
     * Tells about the item
     *
     * @returns TextActionResult with the examine
     */
    public examine(): ActionResult | undefined {
        const playerSession: PlayerSession = gameService.getPlayerSession();
        playerSession.openedFreezer = false;
        return new TextActionResult([
            "This looks like a freezer, maybe something is in it",
        ]);
    }

    public open(): ActionResult | undefined {
        const playerSession: PlayerSession = gameService.getPlayerSession();
        if (!playerSession.openedFreezer) {
            playerSession.openedFreezer = true;
            return new TextActionResult([
                "You open the freezer and see a skeleton inside it.\nBy the looks of it, it was one of the previous victims, not worthy of escaping this castle.",
                "It appears to be holding a metal saw in it's hand.\nThis might come in handy to destroy the lock I saw on the gate",
            ]);
        }
        else {
            return new TextActionResult([
                "The freezer is open",
            ]);
        }
    }

    // Name of the item, shows up on the buttons for example
    public name(): string {
        return "Freezer";
    }
}
