import { Item } from "../../game-base/gameObjects/Item";
import { Examine } from "../../game-base/actions/ExamineAction";
import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { GoTo } from "../actions/GoToAction";
import { gameService } from "../../global";
import { Room } from "../../game-base/gameObjects/Room";
import { HallwayRoom } from "../rooms/HallwayRoom";
import { PickUp } from "../actions/PickUpAction";

export class DoorOfficeHallwayItem extends Item implements Examine, GoTo, PickUp {
    public static readonly Alias: string = "office-hallway-door";

    public constructor() {
        super(DoorOfficeHallwayItem.Alias);
    }

    public name(): string {
        return "Hallway";
    }

    public examine(): ActionResult | undefined {
        gameService.getPlayerSession().walkedToDesk = false;
        gameService.getPlayerSession().isPickingUp = false;
        return new TextActionResult(["This door leads back to the hallway."]);
    }

    public goto(): ActionResult | undefined {
        const room: Room = new HallwayRoom();

        gameService.getPlayerSession().walkedToDesk = false;
        gameService.getPlayerSession().isPickingUp = false;
        gameService.getPlayerSession().currentRoom = room.alias;
        return room.examine();
    }

    public pickup(): ActionResult | undefined {
        return new TextActionResult([
            "This door is very heavy, and therefor seems to be able to pack a punch! You have picked up the door.",
        ]);
    }
}
