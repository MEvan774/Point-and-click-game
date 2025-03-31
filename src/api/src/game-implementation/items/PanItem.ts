import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Examine } from "../../game-base/actions/ExamineAction";
import { ActionTypes } from "../../game-base/enums/ActionAlias";
import { Item } from "../../game-base/gameObjects/Item";
import { Taste } from "../actions/TasteAction";

export class PanItem extends Item implements Examine, Taste {
    /**
     * @_action determines which action will be executed when clicked on.
     * @_position determines where the hitbox will be located.
     * @_size determines the size of the hibox
     * @_isDebugHitboxVisible if true, makes the hitbox visible, false invisible.
     * @validActions the options that will show up when clicked on.
     */
    public static readonly Alias: string = "Pan";
    public static readonly validActions: string[] = ["taste"];
    public _position: Vector2 = { x: 75, y: 200 };
    public _size: Vector2 = { x: 120, y: 130 };
    public _isDebugHitboxVisible: boolean = false;
    public _action: ActionTypes = ActionTypes.Examine;

    public constructor() {
        super(PanItem.Alias, PanItem.validActions);
    }

    public taste(): ActionResult | undefined {
        return new TextActionResult([
            "You start to regret your decision.",
        ]);
    }

    public name(): string {
        return "Pan";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "You can taste the 'stew' he made.",
        ]);
    }
}
