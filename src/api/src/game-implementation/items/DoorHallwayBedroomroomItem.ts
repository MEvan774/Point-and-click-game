import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { Examine } from "../../game-base/actions/ExamineAction";
import { Item } from "../../game-base/gameObjects/Item";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { GoTo } from "../actions/GoToAction";
import { gameService } from "../../global";
import { Room } from "../../game-base/gameObjects/Room";
import { BedroomRoom } from "../rooms/BedroomRoom";

export class DoorHallwayBedroomItem extends Item implements Examine, GoTo {
    public static readonly Alias: string = "hallway-bedroom-door";

    public static readonly validActions: string[] = ["examine", "go to"];

    public constructor() {
        super(DoorHallwayBedroomItem.Alias, DoorHallwayBedroomItem.validActions);
    }

    public name(): string {
        return "Bedroom";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["The door leads to the bedroom."]);
    }

    public goto(): ActionResult | undefined {
        const room: Room = new BedroomRoom();

        gameService.getPlayerSession().currentRoom = room.alias;
        return room.examine();
    }
}
