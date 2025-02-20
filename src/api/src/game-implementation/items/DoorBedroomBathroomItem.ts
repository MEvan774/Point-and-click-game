import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { Examine } from "../../game-base/actions/ExamineAction";
import { Item } from "../../game-base/gameObjects/Item";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { GoTo } from "../actions/GoToAction";
import { gameService } from "../../global";
import { Room } from "../../game-base/gameObjects/Room";
import { BathroomRoom } from "../rooms/Bathroomroom";

export class DoorBedroomBathroomItem extends Item implements Examine, GoTo {
    public static readonly Alias: string = "bathroom-door";

    public constructor() {
        super(DoorBedroomBathroomItem.Alias);
    }

    public name(): string {
        return "Bathroom";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["The door leads to a bathroom"]);
    }

    public goto(): ActionResult | undefined {
        const room: Room = new BathroomRoom();

        gameService.getPlayerSession().currentRoom = room.alias;
        return room.examine();
    }
}
