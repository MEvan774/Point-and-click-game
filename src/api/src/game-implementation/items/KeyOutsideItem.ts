import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { Examine } from "../../game-base/actions/ExamineAction";
import { Item } from "../../game-base/gameObjects/Item";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";

export class FlashlightItem extends Item implements Examine {
    public static readonly Alias: string = "KeyOutside";

    public static readonly validActions: string[] = ["examine"];

    public constructor() {
        super(FlashlightItem.Alias, FlashlightItem.validActions);
    }

    public name(): string {
        return "Key for outside";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "This is the key to go outside with.",
        ]);
    }
}
