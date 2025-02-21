import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { Examine } from "../../game-base/actions/ExamineAction";
import { Item } from "../../game-base/gameObjects/Item";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { GoTo } from "../actions/GoToAction";
import { gameService } from "../../global";
import { Room } from "../../game-base/gameObjects/Room";
import { BedroomRoom } from "../rooms/BedroomRoom";

export class DooHallwayBedroomItem extends Item implements Examine, GoTo {
    public static readonly Alias: string = "hallway-bedroom-door";

    public constructor() {
        super(DooHallwayBedroomItem.Alias);
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
