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

    public constructor() {
        super(DoorLivingRoomFrontDoorItem.Alias, DoorLivingRoomFrontDoorItem.validActions);
    }

    public name(): string {
        return "Front door";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["This door leads to the front door."]);
    }

    public goto(): ActionResult | undefined {
        const room: Room = new FrontDoorRoom();

        gameService.getPlayerSession().currentRoom = room.alias;
        return room.examine();
    }
}
