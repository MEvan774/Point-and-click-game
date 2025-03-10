import { Item } from "../../game-base/gameObjects/Item";
import { Examine } from "../../game-base/actions/ExamineAction";
import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { GoTo } from "../actions/GoToAction";
import { gameService } from "../../global";
import { ActionTypes } from "../../game-base/enums/ActionAlias";

export class CenterStorageLeftItem extends Item implements Examine, GoTo {
    public static readonly Alias: string = "Center Storage";
    /**
     * @param _action determines which action will be executed when clicked on.
     * @param _position determines where the hitbox will be located.
     * @param _size determines the size of the hibox
     * @param _isDebugHitboxVisible if true, makes the hitbox visible, false invisible.
     * @param validActions the options that will show up when clicked on.
     */
    public _position: Vector2 = { x: -510, y: 95 };
    public _size: Vector2 = { x: 250, y: 535 };
    public _isDebugHitboxVisible: boolean = false;
    public _action: ActionTypes = ActionTypes.Examine;

    public static readonly validActions: string[] = ["go to"];

    public constructor() {
        super(CenterStorageLeftItem.Alias, CenterStorageLeftItem.validActions);
    }

    public name(): string {
        return "Center of the room";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "The center of the room.",
            "You can go back here of you're done with the mirror.",
        ]);
    }

    public goto(): ActionResult | undefined {
        gameService.getPlayerSession().walkedToMirror = false;

        return new TextActionResult(["You go back."]);
    }
}
