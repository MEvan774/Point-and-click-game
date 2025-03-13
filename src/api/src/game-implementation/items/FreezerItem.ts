import { ActionTypes } from "../../game-base/enums/ActionAlias";
import { Item } from "../../game-base/gameObjects/Item";
import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Examine } from "../../game-base/actions/ExamineAction";

export class FreezerItem extends Item implements Examine {
    public static readonly Alias: string = "Freezer";
    public _position: Vector2 = { x: 230, y: 350 };
    public _size: Vector2 = { x: 200, y: 170 };
    public _isDebugHitboxVisible: boolean = true;
    public _action: ActionTypes = ActionTypes.Examine;
    public static readonly validActions: string[] = ["go to"];

    public constructor() {
        super(FreezerItem.Alias, FreezerItem.validActions);
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "This looks like a freezer, maybe something is in it",
        ]);
    }

    public goto(): ActionResult | undefined {
        return new TextActionResult([
            "You walk up to the freezer, not knowing what you'll find",
        ]);
    }

    public name(): string {
        return "Freezer";
    }
}
