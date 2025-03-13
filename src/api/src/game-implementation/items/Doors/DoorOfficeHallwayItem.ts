import { Item } from "../../../game-base/gameObjects/Item";
import { Examine } from "../../../game-base/actions/ExamineAction";
import { ActionResult } from "../../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../../game-base/actionResults/TextActionResult";
import { GoTo } from "../../actions/GoToAction";
import { gameService } from "../../../global";
import { Room } from "../../../game-base/gameObjects/Room";
import { HallwayRoom } from "../../rooms/HallwayRoom";
import { ActionTypes } from "../../../game-base/enums/ActionAlias";

export class DoorOfficeHallwayItem extends Item implements Examine, GoTo {
    public static readonly Alias: string = "office-hallway-door";
    public _position: Vector2 = { x: -510, y: 455 };
    public _size: Vector2 = { x: 855, y: 50 };
    public _isDebugHitboxVisible: boolean = false;
    public _action: ActionTypes = ActionTypes.GoTo;
    public static readonly validActions: string[] = ["examine", "go to"];

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
}
