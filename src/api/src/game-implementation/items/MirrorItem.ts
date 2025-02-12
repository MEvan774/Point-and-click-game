import { Item } from "../../game-base/gameObjects/Item";
import { Examine } from "../../game-base/actions/ExamineAction";
import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";

export class MirrorItem extends Item implements Examine {
    public static readonly Alias: string = "Mirror";

    public constructor() {
        super(MirrorItem.Alias);
    }

    public name(): string {
        return "Mirror";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["The mirror stares back at you."]);
    }
}
