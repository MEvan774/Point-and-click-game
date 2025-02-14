import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Examine } from "../../game-base/actions/ExamineAction";
import { Item } from "../../game-base/gameObjects/Item";

export class DiaryItem extends Item implements Examine {
    public static readonly Alias: string = "Diary";

    public constructor() {
        super(DiaryItem.Alias);
    }

    public name(): string {
        return "Diary";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult ([
            "This looks like a diary, maybe I need to pick it up",
        ]);
    }
}
