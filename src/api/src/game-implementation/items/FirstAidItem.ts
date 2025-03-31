import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Examine } from "../../game-base/actions/ExamineAction";
import { ActionTypes } from "../../game-base/enums/ActionAlias";
import { Item } from "../../game-base/gameObjects/Item";
import { gameService } from "../../global";
import { PickUp } from "../actions/PickUpAction";
import { PlayerSession } from "../types";

export class FirstAidItem extends Item implements Examine, PickUp {
    public static readonly Alias: string = "First Aid";
    public static readonly validActions: string[] = ["pick up"];
    public _position: Vector2 = { x: -300, y: 280 };
    public _size: Vector2 = { x: 100, y: 80 };
    public _isDebugHitboxVisible: boolean = false;
    public _action: ActionTypes = ActionTypes.Examine;

    public constructor() {
        super(FirstAidItem.Alias, FirstAidItem.validActions);
    }

    public name(): string {
        return "First Aid";
    }

    public examine(): ActionResult | undefined {
        const playerSession: PlayerSession = gameService.getPlayerSession();
        if (!playerSession.clickedFirstAid) {
            playerSession.clickedFirstAid = true;
            return new TextActionResult([
                "This looks like a First Aid kit.",
                "One can never go wrong with that.",
            ]);
        }
        else if (!playerSession.pickedUpFirstAid) {
            return this.pickup();
        }
        else {
            playerSession.clickedFirstAid = false;
            return new TextActionResult([
                "I have already picked up the First Aid kit.",
            ]);
        }
    }

    public pickup(): ActionResult | undefined {
        const playerSession: PlayerSession = gameService.getPlayerSession();
        playerSession.pickedUpFirstAid = true;
        playerSession.inventory.push("FirstAidItem");
        return new TextActionResult([
            "You pick up the First Aid kit",
            "+1 FirstAidItem",
        ]);
    }
}
