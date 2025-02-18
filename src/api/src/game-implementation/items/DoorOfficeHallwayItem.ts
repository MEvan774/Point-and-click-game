import { Item } from "../../game-base/gameObjects/Item";
import { Examine } from "../../game-base/actions/ExamineAction";
import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { GoTo } from "../actions/GoToAction";
import { StartupRoom } from "../rooms/StartupRoom";
import { gameService } from "../../global";
import { Room } from "../../game-base/gameObjects/Room";
import { PickUp } from "../actions/PickUpAction";

export class DoorOfficeHallwayItem extends Item implements Examine, GoTo, PickUp {
    public static readonly Alias: string = "Hallway";

    public constructor() {
        super(DoorOfficeHallwayItem.Alias);
    }

    public name(): string {
        return "Hallway door";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["This door leads back to the hallway."]);
    }

    public goto(): ActionResult | undefined {
        const startupRoom: Room = new StartupRoom();

        gameService.getPlayerSession().currentRoom = startupRoom.alias;
        return undefined;
    }

    public pickup(): ActionResult | undefined {
        gameService.getPlayerSession().walkedToDesk = true;

        return new TextActionResult([
            "This door is very heavy, and therefor seems to be able to pack a punch! You have picked up the door.",
        ]);
    }
}
