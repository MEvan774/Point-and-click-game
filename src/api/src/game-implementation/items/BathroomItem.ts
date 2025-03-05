import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { Examine } from "../../game-base/actions/ExamineAction";
import { Item } from "../../game-base/gameObjects/Item";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { gameService } from "../../global";
import { PlayerSession } from "../types";
import { GoTo } from "../actions/GoToAction";
import { ActionTypes } from "../../game-base/enums/ActionAlias";

export class BathroomItem extends Item implements Examine, GoTo {
    public static readonly Alias: string = "Bathtub";
    public _action: ActionTypes = ActionTypes.Examine;
    public _position: Vector2 = { x: 150, y: 410 };
    public _size: Vector2 = { x: 200, y: 200 };
    public _isDebugHitboxVisible: boolean = true;

    public static readonly validActions: string[] = [ActionTypes.GoTo];

    public constructor() {
        super(BathroomItem.Alias, BathroomItem.validActions);
    }

    public name(): string {
        return "Bathtub";
    }

    public examine(): ActionResult | undefined {
        const playerSession: PlayerSession = gameService.getPlayerSession();
        playerSession.walkedToBathtub = false;
        playerSession.pickedUpKey = false;
        return new TextActionResult([
            "There is a bathtub in the bathroom, obviously.",
        ]);
    }

    public goto(): ActionResult | undefined {
        const playerSession: PlayerSession = gameService.getPlayerSession();
        playerSession.walkedToBathtub = true;
        return new TextActionResult(["You walk to the bathtub."]);
    }
}
