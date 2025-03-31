import { Item } from "../../game-base/gameObjects/Item";
import { Examine } from "../../game-base/actions/ExamineAction";
import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { ActionTypes } from "../../game-base/enums/ActionAlias";
import { Room } from "../../game-base/gameObjects/Room";
import { StorageRoom } from "../rooms/StorageRoom";
import { gameService } from "../../global";
import { StopHiding } from "../actions/StopHidingAction";
import { BedroomRoom } from "../rooms/BedroomRoom";
import { LivingRoom } from "../rooms/LivingRoom";

/**
 * The item to stop hiding when hiding
 *
 * @remarks Implements the Examine and StopHiding action
 */
export class StopHidingItem extends Item implements Examine, StopHiding {
    // Alias of the item used to find the item
    public static readonly Alias: string = "StopHidingItem";

    /**
     * _position: Position of the item's hitbox
     * _size: Size of the item's hitbox
     * _isDebugHitboxVisible: If true, shows the hitbox as a pink square
     * _action: Action that happens when clicked on the item's hitbox
     * validActions: Array of the alias of the actions that are possible for this item
     */
    public _position: Vector2 = { x: -510, y: 95 };
    public _size: Vector2 = { x: 1020, y: 520 };
    public _isDebugHitboxVisible: boolean = false;
    public _action: ActionTypes = ActionTypes.Examine;
    public static readonly validActions: string[] = ["stop hiding"];

    // Create a new instance of this item
    public constructor() {
        super(StopHidingItem.Alias, StopHidingItem.validActions);
    }

    // Name of the item, shows up on the buttons for example
    public name(): string {
        return "Stop hiding";
    }

    /**
     * Asks if the player wants to stop hiding
     *
     * @returns TextActionResult with the question to stop hiding
     */
    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "Want to stop hiding?",
        ]);
    }

    /**
     * Stop hiding and go back to the previous room
     *
     * @returns room.examine() for the room hidden in
     */
    public stopHiding(): ActionResult | undefined {
        let room: Room;

        if (gameService.getPlayerSession().hiddenIn === "StorageRoom") {
            room = new StorageRoom();
        }
        else if (gameService.getPlayerSession().hiddenIn === "bedroom") {
            room = new BedroomRoom();
        }
        else if (gameService.getPlayerSession().hiddenIn === "livingRoom") {
            room = new LivingRoom();
        }
        else {
            return undefined;
        }

        gameService.getPlayerSession().currentRoom = room.alias;
        return room.examine();
    }
}
