import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { Examine } from "../../game-base/actions/ExamineAction";
import { Item } from "../../game-base/gameObjects/Item";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { GoTo } from "../actions/GoToAction";
import { gameService } from "../../global";
import { Room } from "../../game-base/gameObjects/Room";
import { FrontDoorRoom } from "../rooms/FrontDoorRoom";

export class DoorOutsideFrontdoor extends Item implements Examine, GoTo {
    public static readonly Alias: string = "Outside Frontdoor room";

    public constructor() {
        super(DoorOutsideFrontdoor.Alias);
    }

    public name(): string {
        return "Outside";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["The door leads back to the FrontDoorRoom"]);
    }

    public goto(): ActionResult | undefined {
        const room: Room = new FrontDoorRoom();

        gameService.getPlayerSession().currentRoom = room.alias;
        return room.examine();
    }
}
