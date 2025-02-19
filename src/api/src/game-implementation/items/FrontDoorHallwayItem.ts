import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Examine } from "../../game-base/actions/ExamineAction";
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
    /**
     * Create a new instance of this item
     *
     * @param alias Alias of this item
     */
    public constructor() {
        super(FrontDoorHallwayItem.Alias);
    }

    public name(): SyncOrAsync<string> {
        return "Go upstairs";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["I can go upstairs from here."]);
    }

    public goto(): ActionResult | undefined {
        const corridorRoom: Room = new HallwayRoom();

        gameService.getPlayerSession().currentRoom = corridorRoom.alias;
        return undefined;
    }
}
