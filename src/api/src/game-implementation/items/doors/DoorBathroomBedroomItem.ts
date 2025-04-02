import { ActionResult } from "../../../game-base/actionResults/ActionResult";
import { Examine } from "../../../game-base/actions/ExamineAction";
import { Item } from "../../../game-base/gameObjects/Item";
import { TextActionResult } from "../../../game-base/actionResults/TextActionResult";
import { GoTo } from "../../actions/GoToAction";
import { BedroomRoom } from "../../rooms/BedroomRoom";
import { ActionTypes } from "../../../game-base/enums/ActionAlias";
import { TeleportActionResult } from "../../../game-base/actionResults/TeleportActionResult";

export class DoorBathroomBedroomItem extends Item implements Examine, GoTo {
    public static readonly Alias: string = "bathroom bedroom door";
    /**
     * @param _action determines which action will be executed when clicked on.
     * @param _position determines where the hitbox will be located.
     * @param _size determines the size of the hibox
     * @param _isDebugHitboxVisible if true, makes the hitbox visible, false invisible.
     * @param validActions the options that will show up when clicked on.
     */
    public _action: ActionTypes = ActionTypes.Examine;
    public _position: Vector2 = { x: 315, y: 150 };
    public _size: Vector2 = { x: 108, y: 325 };
    public static readonly validActions: string[] = ["go to"];
    public _isDebugHitboxVisible: boolean = false;

    public constructor() {
        super(DoorBathroomBedroomItem.Alias, DoorBathroomBedroomItem.validActions);
    }

    public name(): string {
        return "Bedroom";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["The door leads back to the bedroom"]);
    }

    public goto(): ActionResult | undefined {
        return new TeleportActionResult(new BedroomRoom());
    }
}
