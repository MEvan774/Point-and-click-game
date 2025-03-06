import { Item } from "../../game-base/gameObjects/Item";
import { Examine } from "../../game-base/actions/ExamineAction";
import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { GoTo } from "../actions/GoToAction";
import { gameService } from "../../global";
import { ActionTypes } from "../../game-base/enums/ActionAlias";

export class MirrorItem extends Item implements Examine, GoTo {
    public static readonly Alias: string = "Mirror";

    public _position: Vector2 = { x: -235, y: 180 };
    public _size: Vector2 = { x: 155, y: 245 };
    public _isDebugHitboxVisible: boolean = false;
    public _action: ActionTypes = ActionTypes.Examine;
    public static readonly validActions: string[] = ["go to"];

    public constructor() {
        super(MirrorItem.Alias, MirrorItem.validActions);
    }

    public name(): string {
        return "Mirror";
    }

    public examine(): ActionResult | undefined {
        if (!gameService.getPlayerSession().solvedRiddle) {
            return new TextActionResult(["It looks like someone is staring at you..."]);
        }

        return new TextActionResult(["The mirror looks normal."]);
    }

    public goto(): ActionResult | undefined {
        if (!gameService.getPlayerSession().walkedToMirror) {
            gameService.getPlayerSession().walkedToMirror = true;

            return new TextActionResult(["You go up to the mirror."]);
        }

        return new TextActionResult(["You are already here."]);
    }
}
