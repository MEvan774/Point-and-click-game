import { Item } from "../../game-base/gameObjects/Item";
import { Examine } from "../../game-base/actions/ExamineAction";
import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { GoTo } from "../actions/GoToAction";
import { gameService } from "../../global";

export class CenterStorageItem extends Item implements Examine, GoTo {
    public static readonly Alias: string = "Center Storage";

    public static readonly validActions: string[] = ["examine", "go to"];

    public constructor() {
        super(CenterStorageItem.Alias, CenterStorageItem.validActions);
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
