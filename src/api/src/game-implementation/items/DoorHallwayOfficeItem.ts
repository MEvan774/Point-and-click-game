import { Item } from "../../game-base/gameObjects/Item";
import { Examine } from "../../game-base/actions/ExamineAction";
import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { GoTo } from "../actions/GoToAction";
import { gameService } from "../../global";
import { Room } from "../../game-base/gameObjects/Room";
import { WorkRoom } from "../rooms/WorkRoom";

export class DoorHallwayOfficeItem extends Item implements Examine, GoTo {
    public static readonly Alias: string = "hallway-office-door";

    public static readonly validActions: string[] = ["examine", "go to"];

    public constructor() {
        super(DoorHallwayOfficeItem.Alias, DoorHallwayOfficeItem.validActions);
    }

    public name(): string {
        return "Office";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["This door leads to the office."]);
    }

    public goto(): ActionResult | undefined {
        const room: Room = new WorkRoom();

        gameService.getPlayerSession().currentRoom = room.alias;
        return room.examine();
    }
}
