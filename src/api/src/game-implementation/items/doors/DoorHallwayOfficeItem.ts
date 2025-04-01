import { Item } from "../../../game-base/gameObjects/Item";
import { Examine } from "../../../game-base/actions/ExamineAction";
import { ActionResult } from "../../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../../game-base/actionResults/TextActionResult";
import { GoTo } from "../../actions/GoToAction";
import { gameService } from "../../../global";
import { Room } from "../../../game-base/gameObjects/Room";
import { WorkRoom } from "../../rooms/WorkRoom";
import { ActionTypes } from "../../../game-base/enums/ActionAlias";

export class DoorHallwayOfficeItem extends Item implements Examine, GoTo {
    public static readonly Alias: string = "hallway-office-door";
    /**
     * @_action determines which action will be executed when clicked on.
     * @_position determines where the hitbox will be located.
     * @_size determines the size of the hibox
     * @_isDebugHitboxVisible if true, makes the hitbox visible, false invisible.
     * @validActions the options that will show up when clicked on.
     */
    public _position: Vector2 = { x: -240, y: 120 };
    public _size: Vector2 = { x: 170, y: 280 };
    public _isDebugHitboxVisible: boolean = false;
    public _action: ActionTypes = ActionTypes.Examine;
    public static readonly validActions: string[] = ["go to"];

    public constructor() {
        super(DoorHallwayOfficeItem.Alias, DoorHallwayOfficeItem.validActions);
    }

    public name(): string {
        return "Office";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["This door leads to the office."]);
    }

    public goto(): ActionResult | undefined {
        const room: Room = new WorkRoom();

        gameService.getPlayerSession().currentRoom = room.alias;
        return room.examine();
    }
}
