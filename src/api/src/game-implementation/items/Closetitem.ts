import { Item } from "../../game-base/gameObjects/Item";
import { Examine } from "../../game-base/actions/ExamineAction";
import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Hide } from "../actions/HideAction";
import { ActionTypes } from "../../game-base/enums/ActionAlias";
import { gameService } from "../../global";
import { Room } from "../../game-base/gameObjects/Room";
import { HiddenRoom } from "../rooms/HiddenRoom";

/**
 * A closet the player can hide inside
 *
 * @remarks Implements the Examine and Hide action
 */
export class ClosetItem extends Item implements Examine, Hide {
    // Alias of the item used to find the item
    public static readonly Alias: string = "Closet";

    /**
     * _position: Position of the item's hitbox
     * _size: Size of the item's hitbox
     * _isDebugHitboxVisible: If true, shows the hitbox as a pink square
     * _action: Action that happens when clicked on the item's hitbox
     * validActions: Array of the alias of the actions that are possible for this item
     */
    public _position: Vector2 = { x: 220, y: 150 };
    public _size: Vector2 = { x: 250, y: 430 };
    public _isDebugHitboxVisible: boolean = false;
    public _action: ActionTypes = ActionTypes.Examine;
    public static readonly validActions: string[] = ["hide"];

    // Create a new instance of this item
    public constructor() {
        super(ClosetItem.Alias, ClosetItem.validActions);
    }

    // Name of the item, shows up on the buttons for example
    public name(): string {
        return "Closet";
    }

    /**
     * Tells about the item
     *
     * @returns TextActionResult with the examine
     */
    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "The closet is big enough to hide inside.",
            "There is blood inside though...",
            "But I guess it's better than getting caught.",
        ]);
    }

    /**
     * Brings the player to the HiddenRoom and saves the StorageRoom in the PlayerSession
     *
     * @returns room.examine() of the HiddenRoom
     */
    public hide(): ActionResult | undefined {
        gameService.getPlayerSession().hiddenIn = "StorageRoom";
        const room: Room = new HiddenRoom();

        gameService.getPlayerSession().currentRoom = room.alias;
        return room.examine();
    }
}
