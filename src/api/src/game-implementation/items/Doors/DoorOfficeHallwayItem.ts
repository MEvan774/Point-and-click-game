import { Item } from "../../../game-base/gameObjects/Item";
import { Examine } from "../../../game-base/actions/ExamineAction";
import { ActionResult } from "../../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../../game-base/actionResults/TextActionResult";
import { GoTo } from "../../actions/GoToAction";
import { gameService } from "../../../global";
import { Room } from "../../../game-base/gameObjects/Room";
import { HallwayRoom } from "../../rooms/HallwayRoom";
import { PickUp } from "../../actions/PickUpAction";
import { ActionTypes } from "../../../game-base/enums/ActionAlias";

export class DoorOfficeHallwayItem extends Item implements Examine, GoTo, PickUp {
    public static readonly Alias: string = "office-hallway-door";
    public _position: Vector2 = { x: -510, y: 455 };
    public _size: Vector2 = { x: 855, y: 50 };
    public _isDebugHitboxVisible: boolean = true;
    public _action: ActionTypes = ActionTypes.GoTo;
    public static readonly validActions: string[] = ["examine", "go to", "pick up"];

    public constructor() {
        super(DoorOfficeHallwayItem.Alias, DoorOfficeHallwayItem.validActions);
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

    public pickup(): ActionResult | undefined {

        return new TextActionResult([
            "This door is very heavy, and therefor seems to be able to pack a punch! You have picked up the door.",
        ]);
    }
}
