import { ActionResult } from "../../../game-base/actionResults/ActionResult";
import { Examine } from "../../../game-base/actions/ExamineAction";
import { Item } from "../../../game-base/gameObjects/Item";
import { TextActionResult } from "../../../game-base/actionResults/TextActionResult";
import { ShedRoom } from "../../rooms/ShedRoom";
import { Room } from "../../../game-base/gameObjects/Room";
import { gameService } from "../../../global";

export class DoorOutsideShed extends Item implements Examine {
    public static readonly Alias: string = "Outside Shed room";

    public constructor() {
        super(DoorOutsideShed.Alias, ["examine"]);
    }

    public name(): string {
        return "Outside";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["The door leads to the shed that's half open."]);
    }

    public goto(): ActionResult | undefined {
        const room: Room = new ShedRoom();

        gameService.getPlayerSession().currentRoom = room.alias;
        return room.examine();
    }
}
