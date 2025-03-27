import { ActionResult } from "../../../game-base/actionResults/ActionResult";
import { Examine } from "../../../game-base/actions/ExamineAction";
import { Item } from "../../../game-base/gameObjects/Item";
import { TextActionResult } from "../../../game-base/actionResults/TextActionResult";
import { GoTo } from "../../actions/GoToAction";
import { Room } from "../../../game-base/gameObjects/Room";
import { OutsideRoom } from "../../rooms/OutsideRoom";
import { gameService } from "../../../global";
import { ActionTypes } from "../../../game-base/enums/ActionAlias";

export class DoorShedOutside extends Item implements Examine, GoTo {
    public static readonly Alias: string = "Shed Outside room";
    /**
    * @param _action determines which action will be executed when clicked on.
    * @param _position determines where the hitbox will be located.
    * @param _size determines the size of the hibox
    * @param _isDebugHitboxVisible if true, makes the hitbox visible, false invisible.
    * @param validActions the options that will show up when clicked on.
    */
    public _position: Vector2 = { x: -509, y: 530 };
    public _size: Vector2 = { x: 1020, y: 100 };
    public _isDebugHitboxVisible: boolean = false;
    public _action: ActionTypes = ActionTypes.Examine;
    public static readonly validActions: string[] = ["go to"];

    public constructor() {
        super(DoorShedOutside.Alias, DoorShedOutside.validActions);
    }

    public name(): string {
        return "Outside";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["The door leads you back outside."]);
    }

    public goto(): ActionResult | undefined {
        const room: Room = new OutsideRoom();

        gameService.getPlayerSession().currentRoom = room.alias;
        return room.examine();
    }
}
