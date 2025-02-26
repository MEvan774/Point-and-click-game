import { Item } from "../../game-base/gameObjects/Item";
import { Examine } from "../../game-base/actions/ExamineAction";
import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { GoTo } from "../actions/GoToAction";
import { gameService } from "../../global";
import { Room } from "../../game-base/gameObjects/Room";
import { LivingRoom } from "../rooms/LivingRoom";

export class DoorFrontDoorLivingRoomItem extends Item implements Examine, GoTo {
    public static readonly Alias: string = "DoorFrontDoorLivingRoomItem";

    public static readonly validActions: string[] = ["examine", "go to"];

    public constructor() {
        super(DoorFrontDoorLivingRoomItem.Alias, DoorFrontDoorLivingRoomItem.validActions);
    }

    public name(): string {
        return "Livingroom";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["This door leads to the livingroom."]);
    }

    public goto(): ActionResult | undefined {
        const room: Room = new LivingRoom();

        gameService.getPlayerSession().currentRoom = room.alias;
        return room.examine();
    }
}
