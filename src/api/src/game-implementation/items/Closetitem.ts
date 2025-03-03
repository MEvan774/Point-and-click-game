import { Item } from "../../game-base/gameObjects/Item";
import { Examine } from "../../game-base/actions/ExamineAction";
import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Hide } from "../actions/HideAction";
import { ActionTypes } from "../../game-base/enums/ActionAlias";

export class ClosetItem extends Item implements Examine, Hide {
    public static readonly Alias: string = "Closet";

    public _position: Vector2 = { x: 220, y: 80 };
    public _size: Vector2 = { x: 250, y: 430 };
    public _isDebugHitboxVisible: boolean = true;
    public _action: ActionTypes = ActionTypes.Hide;

    public constructor() {
        super(ClosetItem.Alias);
    }

    public name(): string {
        return "Closet";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "The closet is empty apart from some old clothes.",
            "A person could fit inside,",
            "But luckily there isn't.",
        ]);
    }

    public hide(): ActionResult | undefined {
        return new TextActionResult(["You hide in the closet."]);
    }
}
