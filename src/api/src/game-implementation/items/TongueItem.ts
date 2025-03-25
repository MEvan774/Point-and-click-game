import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Examine } from "../../game-base/actions/ExamineAction";
import { ActionTypes } from "../../game-base/enums/ActionAlias";
import { Item } from "../../game-base/gameObjects/Item";
import { gameService } from "../../global";
import { PickUp } from "../actions/PickUpAction";
import { PlayerSession } from "../types";

export class TongueItem extends Item implements Examine, PickUp {
    public static readonly Alias: string = "Tongue";
    public static readonly validActions: string[] = ["pick up"];
    public _position: Vector2 = { x: -370, y: 260 };
    public _size: Vector2 = { x: 60, y: 60 };
    public _isDebugHitboxVisible: boolean = false;
    public _action: ActionTypes = ActionTypes.Examine;

    public constructor() {
        super(TongueItem.Alias, TongueItem.validActions);
    }

    public name(): string {
        return "Tongue";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "Thats a Tongue nailed to the wall.",
        ]);
    }

    public pickup(): ActionResult | undefined {
        const playerSession: PlayerSession = gameService.getPlayerSession();
        playerSession.inventory.push("Tongue");
        return new TextActionResult([
            "You ripped the tongue off the wall.",
        ]);
    }
}
