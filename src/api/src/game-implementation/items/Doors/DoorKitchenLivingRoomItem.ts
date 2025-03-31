import { ActionResult } from "../../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../../game-base/actionResults/TextActionResult";
import { Examine } from "../../../game-base/actions/ExamineAction";
import { ActionTypes } from "../../../game-base/enums/ActionAlias";
import { Item } from "../../../game-base/gameObjects/Item";
import { Room } from "../../../game-base/gameObjects/Room";
import { Timer } from "../../../game-base/timer/Timer";
import { gameService } from "../../../global";
import { GoTo } from "../../actions/GoToAction";
import { LivingRoom } from "../../rooms/LivingRoom";

/**
 * Base class used to represent an item
 */
export class DoorKitchenLivingRoomItem extends Item implements Examine, GoTo {
    public static readonly Alias: string = "KitchenToLivingRoomDoor";

    public _action: ActionTypes = ActionTypes.Examine;
    public _position: Vector2 = { x: -500, y: 500 };
    public _size: Vector2 = { x: 1000, y: 50 };
    public static readonly validActions: string[] = [ActionTypes.Examine, ActionTypes.GoTo];
    public _isDebugHitboxVisible: boolean = false;
    /**
     * Create a new instance of this item
     *
     * @param alias Alias of this item
     */
    public constructor() {
        super(DoorKitchenLivingRoomItem.Alias, DoorKitchenLivingRoomItem.validActions);
    }

    // Name of the item, shows up on the buttons for example
    public name(): string {
        return "Livingroom";
    }

    /**
     * Tells about where the door leads to
     *
     * @returns TextActionResult with information about the item
     */
    public examine(): ActionResult | undefined {
        return new TextActionResult(["I should head out!"]);
    }

    /**
     * Go to the HallwayRoom and examines this room
     *
     * @returns room.examine() for the HallwayRoom
     */
    public goto(): ActionResult | undefined {
        new Timer();

        const livingRoom: Room = new LivingRoom();

        gameService.getPlayerSession().currentRoom = livingRoom.alias;
        return livingRoom.examine();
    }

    public startTimer(): void {
        new Timer(); // This will instantiate Timer
    }
}
