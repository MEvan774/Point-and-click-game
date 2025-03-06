import { Item } from "../../game-base/gameObjects/Item";
import { Examine } from "../../game-base/actions/ExamineAction";
import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { GoTo } from "../actions/GoToAction";
import { gameService } from "../../global";
import { Room } from "../../game-base/gameObjects/Room";
import { LivingRoom } from "../rooms/LivingRoom";
import { ActionTypes } from "../../game-base/enums/ActionAlias";

export class DoorFrontDoorLivingRoomItem extends Item implements Examine, GoTo {
    public static readonly Alias: string = "DoorFrontDoorLivingRoomItem";

    public _position: Vector2 = { x: 320, y: 160 };
    public _size: Vector2 = { x: 170, y: 400 };
    public _isDebugHitboxVisible: boolean = false;
    public _action: ActionTypes = ActionTypes.Examine;
    public static readonly validActions: string[] = ["go to"];

    public constructor() {
        super(DoorFrontDoorLivingRoomItem.Alias, DoorFrontDoorLivingRoomItem.validActions);
    }

    public name(): string {
        return "Livingroom";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["This door leads to the livingroom."]);
    }

    public goto(): ActionResult | undefined {
        const room: Room = new LivingRoom();

        gameService.getPlayerSession().currentRoom = room.alias;
        return room.examine();
    }
}
