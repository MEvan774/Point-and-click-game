import { Item } from "../../game-base/gameObjects/Item";
import { Examine } from "../../game-base/actions/ExamineAction";
import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { GoTo } from "../actions/GoToAction";
import { gameService } from "../../global";
import { Room } from "../../game-base/gameObjects/Room";
import { HallwayRoom } from "../rooms/HallwayRoom";

export class DoorStorageHallwayItem extends Item implements Examine, GoTo {
    public static readonly Alias: string = "DoorStorageHallwayItem";

    public static readonly validActions: string[] = ["examine", "go to"];

    public constructor() {
        super(DoorStorageHallwayItem.Alias, DoorStorageHallwayItem.validActions);
    }

    public name(): string {
        return "Hallway";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["This door leads back to the hallway."]);
    }

    public goto(): ActionResult | undefined {
        const room: Room = new HallwayRoom();

        gameService.getPlayerSession().currentRoom = room.alias;
        return room.examine();
    }
}
