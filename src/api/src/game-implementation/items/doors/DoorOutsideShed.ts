import { ActionResult } from "../../../game-base/actionResults/ActionResult";
import { Examine } from "../../../game-base/actions/ExamineAction";
import { Item } from "../../../game-base/gameObjects/Item";
import { TextActionResult } from "../../../game-base/actionResults/TextActionResult";
import { GoTo } from "../../actions/GoToAction";
import { ShedRoom } from "../../rooms/ShedRoom";
import { ActionTypes } from "../../../game-base/enums/ActionAlias";
import { TeleportActionResult } from "../../../game-base/actionResults/TeleportActionResult";

export class DoorOutsideShed extends Item implements Examine, GoTo {
    public static readonly Alias: string = "Outside Shed room";
    /**
    * @param _action determines which action will be executed when clicked on.
    * @param _position determines where the hitbox will be located.
    * @param _size determines the size of the hibox
    * @param _isDebugHitboxVisible if true, makes the hitbox visible, false invisible.
    * @param validActions the options that will show up when clicked on.
    */
    public _position: Vector2 = { x: -375, y: 300 };
    public _size: Vector2 = { x: 100, y: 150 };
    public _isDebugHitboxVisible: boolean = false;
    public _action: ActionTypes = ActionTypes.Examine;
    public static readonly validActions: string[] = ["go to"];

    public constructor() {
        super(DoorOutsideShed.Alias, DoorOutsideShed.validActions);
    }

    public name(): string {
        return "Outside";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["The door leads you inside the shed."]);
    }

    public goto(): ActionResult | undefined {
        return new TeleportActionResult(new ShedRoom());
    }
}
