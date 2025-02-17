import { Item } from "../../game-base/gameObjects/Item";
import { Examine } from "../../game-base/actions/ExamineAction";
import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { GoTo } from "../actions/GoToAction";
import { StartupRoom } from "../rooms/StartupRoom";
import { gameService } from "../../global";
import { Room } from "../../game-base/gameObjects/Room";

export class DoorFrontDoorLivingRoomItem extends Item implements Examine, GoTo {
    public static readonly Alias: string = "DoorFrontDoorLivingRoomItem";

    public constructor() {
        super(DoorFrontDoorLivingRoomItem.Alias);
    }

    public name(): string {
        return "Livingroom";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["This door leads to the livingroom."]);
    }

    public goto(): ActionResult | undefined {
        const startupRoom: Room = new StartupRoom();

        gameService.getPlayerSession().currentRoom = startupRoom.alias;
        return undefined;
    }
}
