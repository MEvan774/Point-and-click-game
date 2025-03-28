import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Examine } from "../../game-base/actions/ExamineAction";
import { ActionTypes } from "../../game-base/enums/ActionAlias";
import { Item } from "../../game-base/gameObjects/Item";
import { gameService } from "../../global";
import { PickUp } from "../actions/PickUpAction";
import { PlayerSession } from "../types";

export class EyesItem extends Item implements Examine, PickUp {
    public static readonly Alias: string = "Eyes";
    public static readonly validActions: string[] = ["pick up"];
    public _position: Vector2 = { x: -10, y: 210 };
    public _size: Vector2 = { x: 60, y: 60 };
    public _isDebugHitboxVisible: boolean = false;
    public _action: ActionTypes = ActionTypes.Examine;

    public constructor() {
        super(EyesItem.Alias, EyesItem.validActions);
    }

    public name(): string {
        return "Eyes";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "Those are eyes.",
        ]);
    }

    public pickup(): ActionResult | undefined {
        const playerSession: PlayerSession = gameService.getPlayerSession();
        playerSession.inventory.push("Eyes");
        return new TextActionResult([
            "You pick up the eyes.",
            "+1 Eyes",
        ]);
    }
}
