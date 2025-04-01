import { Item } from "../../../game-base/gameObjects/Item";
import { Examine } from "../../../game-base/actions/ExamineAction";
import { ActionResult } from "../../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../../game-base/actionResults/TextActionResult";
import { GoTo } from "../../actions/GoToAction";
import { gameService } from "../../../global";
import { Room } from "../../../game-base/gameObjects/Room";
import { HallwayRoom } from "../../rooms/HallwayRoom";
import { ActionTypes } from "../../../game-base/enums/ActionAlias";

/**
 * The item that is used to go to the HallwayRoom from the StorageRoom
 *
 * @remarks Implements the Examine and the GoTo action
 */
export class DoorStorageHallwayItem extends Item implements Examine, GoTo {
    // Alias of the item used to find the item
    public static readonly Alias: string = "DoorStorageHallwayItem";

    /**
     * _position: Position of the item's hitbox
     * _size: Size of the item's hitbox
     * _isDebugHitboxVisible: If true, shows the hitbox as a pink square
     * _action: Action that happens when clicked on the item's hitbox
     * validActions: Array of the alias of the actions that are possible for this item
     */
    public _position: Vector2 = { x: -480, y: 200 };
    public _size: Vector2 = { x: 140, y: 350 };
    public _isDebugHitboxVisible: boolean = false;
    public _action: ActionTypes = ActionTypes.Examine;
    public static readonly validActions: string[] = ["go to"];

    // Create a new instance of this item
    public constructor() {
        super(DoorStorageHallwayItem.Alias, DoorStorageHallwayItem.validActions);
    }

    // Name of the item, shows up on the buttons for example
    public name(): string {
        return "Hallway";
    }

    /**
     * Tells about where the door leads to
     *
     * @returns TextActionResult with information about the item
     */
    public examine(): ActionResult | undefined {
        return new TextActionResult(["This door leads back to the hallway."]);
    }

    /**
     * Go to the HallwayRoom and examines this room
     *
     * @returns room.examine() for the HallwayRoom
     */
    public goto(): ActionResult | undefined {
        const room: Room = new HallwayRoom();

        gameService.getPlayerSession().currentRoom = room.alias;
        return room.examine();
    }
}
