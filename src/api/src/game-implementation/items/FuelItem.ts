import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Examine } from "../../game-base/actions/ExamineAction";
import { ActionTypes } from "../../game-base/enums/ActionAlias";
import { Item } from "../../game-base/gameObjects/Item";
import { gameService } from "../../global";
import { PickUp } from "../actions/PickUpAction";
import { PlayerSession } from "../types";

export class FuelItem extends Item implements Examine, PickUp {
    /**
     * @_action determines which action will be executed when clicked on.
     * @_position determines where the hitbox will be located.
     * @_size determines the size of the hibox
     * @_isDebugHitboxVisible if true, makes the hitbox visible, false invisible.
     * @validActions the options that will show up when clicked on.
     */
    public static readonly Alias: string = "fuel";
    public static readonly validActions: string[] = [];
    public _position: Vector2 = { x: 0, y: 0 };
    public _size: Vector2 = { x: 0, y: 0 };
    public _isDebugHitboxVisible: boolean = false;
    public _action: ActionTypes = ActionTypes.Examine;

    public constructor() {
        super(FuelItem.Alias, FuelItem.validActions);
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "A full tank of fuel.",
        ]);
    }

    public pickup(): ActionResult | undefined {
        const playerSession: PlayerSession = gameService.getPlayerSession();
        playerSession.inventory.push("FuelItem");

        return new TextActionResult([
            "You somehow managed to put the fuel in your inventory.",
            "+1 Fuel",
        ]);
    }

    public name(): string {
        return "Fuel";
    }
}
