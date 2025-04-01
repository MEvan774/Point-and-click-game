import { ActionTypes } from "../../game-base/enums/ActionAlias";
import { Item } from "../../game-base/gameObjects/Item";
import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Examine } from "../../game-base/actions/ExamineAction";
import { Open } from "../actions/OpenAction";
import { PlayerSession } from "../types";
import { gameService } from "../../global";
import { Room } from "../../game-base/gameObjects/Room";
import { Hide } from "../actions/HideAction";
import { HiddenRoom } from "../rooms/HiddenRoom";

export class FreezerItem extends Item implements Examine, Open, Hide {
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
    public static readonly validActions: string[] = ["open", "hide"];

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

    public goto(): ActionResult | undefined {
        const playerSession: PlayerSession = gameService.getPlayerSession();
        if (!playerSession.walkedToFreezer) {
            playerSession.walkedToFreezer = true;
            return new TextActionResult([
                "You walk up to the freezer",
            ]);
        }
        else {
            return new TextActionResult([
                "You are already at the freezer",
            ]);
        }
    }

    public walkaway(): ActionResult | undefined {
        const playerSession: PlayerSession = gameService.getPlayerSession();
        if (playerSession.walkedToFreezer) {
            playerSession.walkedToFreezer = false;
            FreezerItem.validActions.splice(1);
            return new TextActionResult([
                "You walk away from the freezer.",
            ]);
        }
        else {
            return new TextActionResult([
                "You aren't at the freezer.",
            ]);
        }
    }

    /**
     * Brings the player to the HiddenRoom and saves the StorageRoom in the PlayerSession
     *
     * @returns room.examine() of the HiddenRoom
     */
    public hide(): ActionResult | undefined {
        gameService.getPlayerSession().hiddenIn = "ShedRoom";
        const room: Room = new HiddenRoom();

        gameService.getPlayerSession().currentRoom = room.alias;
        return room.examine();
    }

    // Name of the item, shows up on the buttons for example
    public name(): string {
        return "Freezer";
    }
}
