import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Examine } from "../../game-base/actions/ExamineAction";
import { Item } from "../../game-base/gameObjects/Item";
import { Room } from "../../game-base/gameObjects/Room";
import { gameService } from "../../global";
import { GoTo } from "../actions/GoToAction";
import { FrontDoorRoom } from "../rooms/FrontDoorRoom";

/**
 * Base class used to represent an item
 */
export class HallwayFrontDoorItem extends Item implements Examine, GoTo {
    public static readonly Alias: string = "StairToFrontDoor";
    /**
     * Create a new instance of this item
     *
     * @param alias Alias of this item
     */
    public constructor() {
        super(HallwayFrontDoorItem.Alias);
    }

    public name(): string {
        return "Downstairs";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["I can go downstairs to the front door here."]);
    }

    public goto(): ActionResult | undefined {
        const room: Room = new FrontDoorRoom();

        gameService.getPlayerSession().currentRoom = room.alias;
        return room.examine();
    }
}
