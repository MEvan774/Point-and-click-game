import { ActionResult } from "../../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../../game-base/actionResults/TextActionResult";
import { Examine } from "../../../game-base/actions/ExamineAction";
import { ActionTypes } from "../../../game-base/enums/ActionAlias";
import { Item } from "../../../game-base/gameObjects/Item";
import { Room } from "../../../game-base/gameObjects/Room";
import { Timer } from "../../../game-base/timer/Timer";
import { gameService } from "../../../global";
import { GoTo } from "../../actions/GoToAction";
import { HallwayRoom } from "../../rooms/HallwayRoom";

/**
 * The item that is used to go to the HallwayRoom from the FrontDoorRoom
 *
 * @remarks Implements the Examine and the GoTo action
 */
export class FrontDoorHallwayItem extends Item implements Examine, GoTo {
    // Alias of the item used to find the item
    public static readonly Alias: string = "FrontDoorToStair";

    /**
     * _position: Position of the item's hitbox
     * _size: Size of the item's hitbox
     * _isDebugHitboxVisible: If true, shows the hitbox as a pink square
     * _action: Action that happens when clicked on the item's hitbox
     * validActions: Array of the alias of the actions that are possible for this item
     */
    public _position: Vector2 = { x: -510, y: 520 };
    public _size: Vector2 = { x: 350, y: 100 };
    public _isDebugHitboxVisible: boolean = false;
    public _action: ActionTypes = ActionTypes.Examine;
    public static readonly validActions: string[] = ["go to"];

    // Create a new instance of this item
    public constructor() {
        super(FrontDoorHallwayItem.Alias, FrontDoorHallwayItem.validActions);
    }

    // Name of the item, shows up on the buttons for example
    public name(): SyncOrAsync<string> {
        return "Upstairs";
    }

    /**
     * Tells about where the door leads to
     *
     * @returns TextActionResult with information about the item
     */
    public examine(): ActionResult | undefined {
        return new TextActionResult(["I can go upstairs from here."]);
    }

    /**
     * Go to the HallwayRoom and examines this room
     *
     * @returns room.examine() for the HallwayRoom
     */
    public goto(): ActionResult | undefined {
        new Timer();

        const room: Room = new HallwayRoom();

        gameService.getPlayerSession().currentRoom = room.alias;
        return room.examine();
    }

    public startTimer(): void {
        new Timer(); // This will instantiate Timer
    }
}
