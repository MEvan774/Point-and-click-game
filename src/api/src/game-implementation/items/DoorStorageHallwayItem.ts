import { Item } from "../../game-base/gameObjects/Item";
import { Examine } from "../../game-base/actions/ExamineAction";
import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { GoTo } from "../actions/GoToAction";
import { gameService } from "../../global";
import { Room } from "../../game-base/gameObjects/Room";
import { HallwayRoom } from "../rooms/HallwayRoom";
import { ActionTypes } from "../../game-base/enums/ActionAlias";

export class DoorStorageHallwayItem extends Item implements Examine, GoTo {
    public static readonly Alias: string = "DoorStorageHallwayItem";
    public _position: Vector2 = { x: -480, y: 200 };
    public _size: Vector2 = { x: 140, y: 350 };
    public _isDebugHitboxVisible: boolean = true;
    public _action: ActionTypes = ActionTypes.Examine;
    public static readonly validActions: string[] = ["go to"];

    public constructor() {
        super(DoorStorageHallwayItem.Alias, DoorStorageHallwayItem.validActions);
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
