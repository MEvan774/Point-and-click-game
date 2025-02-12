import { Item } from "../../game-base/gameObjects/Item";
import { Examine } from "../../game-base/actions/ExamineAction";
import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { GoTo } from "../actions/GoToAction";
import { gameService } from "../../global";

export class MirrorItem extends Item implements Examine, GoTo {
    public static readonly Alias: string = "Mirror";

    public constructor() {
        super(MirrorItem.Alias);
    }

    public name(): string {
        return "Mirror";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["It looks like someone is staring at you..."]);
    }

    public goto(): ActionResult | undefined {
        gameService.getPlayerSession().walkedToMirror = true;

        return new TextActionResult(["You go up to the mirror."]);
    }
}
