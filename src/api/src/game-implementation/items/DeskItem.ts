import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Examine } from "../../game-base/actions/ExamineAction";
import { Item } from "../../game-base/gameObjects/Item";
import { GoTo } from "../actions/GoToAction";
import { gameService } from "../../global";
import { PlayerSession } from "../types";

export class DeskItem extends Item implements Examine, GoTo {
    public static readonly Alias: string = "Desk";

    public constructor() {
        super(DeskItem.Alias);
    }

    public name(): string {
        return "Desk";
    }

    public examine(): ActionResult | undefined {
        const playerSession: PlayerSession = gameService.getPlayerSession();
        playerSession.isPickingUp = false;
        playerSession.walkedToDesk = false;
        return new TextActionResult ([
            "There appears to be something on the desk. It looks like a diary.",
        ]);
    }

    public goto(): ActionResult | undefined {
        gameService.getPlayerSession().walkedToDesk = true;
        return new TextActionResult(["You walk to the front of the desk."]);
    }
}
