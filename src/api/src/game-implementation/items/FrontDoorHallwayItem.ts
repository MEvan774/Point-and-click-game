import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Examine } from "../../game-base/actions/ExamineAction";
import { ActionTypes } from "../../game-base/enums/ActionAlias";
import { Item } from "../../game-base/gameObjects/Item";
import { Room } from "../../game-base/gameObjects/Room";
import { gameService } from "../../global";
import { GoTo } from "../actions/GoToAction";
import { HallwayRoom } from "../rooms/HallwayRoom";

/**
 * Base class used to represent an item
 */
export class FrontDoorHallwayItem extends Item implements Examine, GoTo {
    public static readonly Alias: string = "FrontDoorToStair";

    public _position: Vector2 = { x: -510, y: 520 };
    public _size: Vector2 = { x: 350, y: 100 };
    public _isDebugHitboxVisible: boolean = false;
    public _action: ActionTypes = ActionTypes.Examine;

    public static readonly validActions: string[] = ["go to"];

    /**
     * Create a new instance of this item
     *
     * @param alias Alias of this item
     */
    public constructor() {
        super(FrontDoorHallwayItem.Alias, FrontDoorHallwayItem.validActions);
    }

    public name(): SyncOrAsync<string> {
        return "Upstairs";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["I can go upstairs from here."]);
    }

    public goto(): ActionResult | undefined {
        const room: Room = new HallwayRoom();

        gameService.getPlayerSession().currentRoom = room.alias;
        return room.examine();
    }
}
