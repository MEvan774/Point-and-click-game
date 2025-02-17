import { Item } from "../../game-base/gameObjects/Item";
import { Examine } from "../../game-base/actions/ExamineAction";
import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { GoTo } from "../actions/GoToAction";
import { gameService } from "../../global";

export class CenterStorageItem extends Item implements GoTo {
    public static readonly Alias: string = "Center Storage";

    public constructor() {
        super(CenterStorageItem.Alias);
    }

    public name(): string {
        return "Center of the room";
    }

    public goto(): ActionResult | undefined {
        gameService.getPlayerSession().walkedToMirror = false;

        return new TextActionResult(["You go back."]);
    }
}
