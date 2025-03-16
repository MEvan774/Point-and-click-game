import { ActionResult } from "../../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../../game-base/actionResults/TextActionResult";
import { Examine } from "../../../game-base/actions/ExamineAction";
import { ActionTypes } from "../../../game-base/enums/ActionAlias";
import { Item } from "../../../game-base/gameObjects/Item";
import { Room } from "../../../game-base/gameObjects/Room";
import { gameService } from "../../../global";
import { KitchenRoom } from "../../rooms/KitchenRoom";
import { GoTo } from "../../actions/GoToAction";

/**
 * Base class used to represent an item
 */
export class DoorLivingRoomKitchenItem extends Item implements Examine, GoTo {
    public static readonly Alias: string = "LivingToKitchenDoor";

    public _action: ActionTypes = ActionTypes.Examine;
    public _position: Vector2 = { x: 40, y: 200 };
    public _size: Vector2 = { x: 150, y: 240 };
    public static readonly validActions: string[] = [ActionTypes.Examine, ActionTypes.GoTo];
    public _isDebugHitboxVisible: boolean = false;

    /**
     * Create a new instance of this item
     *
     * @param alias Alias of this item
     */
    public constructor() {
        super(DoorLivingRoomKitchenItem.Alias, DoorLivingRoomKitchenItem.validActions);
    }
    // Name of the item, shows up on the buttons for example

    public name(): string {
        return "Kitchen";
    }

    /**
     * Tells about where the door leads to
     *
     * @returns TextActionResult with information about the item
     */
    public examine(): ActionResult | undefined {
        return new TextActionResult(["You see blood near the door...",
            "You try to guess whats behind it."]);
    }

    /**
     * Go to the KitchenRoom and examines this room
     *
     * @returns room.examine() for the KitchenRoom
     */
    public goto(): ActionResult | undefined {
        const livingRoom: Room = new KitchenRoom();

        gameService.getPlayerSession().currentRoom = livingRoom.alias;
        return livingRoom.examine();
    }
}
