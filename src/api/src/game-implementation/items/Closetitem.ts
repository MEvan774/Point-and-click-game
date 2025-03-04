import { Item } from "../../game-base/gameObjects/Item";
import { Examine } from "../../game-base/actions/ExamineAction";
import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Hide } from "../actions/HideAction";
import { ActionTypes } from "../../game-base/enums/ActionAlias";

export class ClosetItem extends Item implements Examine, Hide {
    public static readonly Alias: string = "Closet";

    public _position: Vector2 = { x: 220, y: 150 };
    public _size: Vector2 = { x: 250, y: 430 };
    public _isDebugHitboxVisible: boolean = true;
    public _action: ActionTypes = ActionTypes.Examine;
    public static readonly validActions: string[] = ["hide"];

    public constructor() {
        super(ClosetItem.Alias, ClosetItem.validActions);
    }

    public name(): string {
        return "Closet";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "There is blood coming out of the closet.",
            "But at least there are no dead bodies inside...",
            "The closet is large enough to hide in if it's needed.",
        ]);
    }

    public hide(): ActionResult | undefined {
        return new TextActionResult(["You hide in the closet."]);
    }
}
