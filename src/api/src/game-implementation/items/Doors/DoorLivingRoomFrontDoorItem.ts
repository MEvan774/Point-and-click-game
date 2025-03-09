import { Item } from "../../../game-base/gameObjects/Item";
import { Examine } from "../../../game-base/actions/ExamineAction";
import { ActionResult } from "../../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../../game-base/actionResults/TextActionResult";
import { GoTo } from "../../actions/GoToAction";
import { gameService } from "../../../global";
import { Room } from "../../../game-base/gameObjects/Room";
import { FrontDoorRoom } from "../../rooms/FrontDoorRoom";

export class DoorLivingRoomFrontDoorItem extends Item implements Examine, GoTo {
    public static readonly Alias: string = "DoorLivingRoomFrontDoorItem";

    public static readonly validActions: string[] = ["examine", "go to"];

    /**
     * Create a new instance of this item
     *
     * @param alias Alias of this item
     */
    public constructor() {
        super(DoorLivingRoomFrontDoorItem.Alias, DoorLivingRoomFrontDoorItem.validActions);
    }

    // Name of the item, shows up on the buttons for example
    public name(): string {
        return "Front door";
    }

    /**
     * Tells about where the door leads to
     *
     * @returns TextActionResult with information about the item
     */
    public examine(): ActionResult | undefined {
        return new TextActionResult(["This door leads to the front door."]);
    }

    /**
     * Go to the FrontDoorRoom and examines this room
     *
     * @returns room.examine() for the FrontDoorRoom
     */
    public goto(): ActionResult | undefined {
        const room: Room = new FrontDoorRoom();

        gameService.getPlayerSession().currentRoom = room.alias;
        return room.examine();
    }
}
