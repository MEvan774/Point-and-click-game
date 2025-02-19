import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Examine } from "../../game-base/actions/ExamineAction";
import { Item } from "../../game-base/gameObjects/Item";
import { Room } from "../../game-base/gameObjects/Room";
import { gameService } from "../../global";
import { GoTo } from "../actions/GoToAction";
import { LivingRoom } from "../rooms/LivingRoom";

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

    public name(): SyncOrAsync<string> {
        return "Stair to front door";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["I can go downstairs to the front door herre."]);
    }

    public goto(): ActionResult | undefined {
        const livingRoom: Room = new LivingRoom();

        gameService.getPlayerSession().currentRoom = livingRoom.alias;
        return undefined;
    }
}
