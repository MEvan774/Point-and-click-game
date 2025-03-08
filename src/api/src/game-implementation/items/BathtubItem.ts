import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { Examine } from "../../game-base/actions/ExamineAction";
import { Item } from "../../game-base/gameObjects/Item";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { gameService } from "../../global";
import { PlayerSession } from "../types";
import { PickUp } from "../actions/PickUpAction";
import { ActionTypes } from "../../game-base/enums/ActionAlias";

export class BathtubItem extends Item implements Examine, PickUp {
    public static readonly Alias: string = "key_in_bathtub";
    /**
     * @_action determines which action will be executed when clicked on.
     * @_position determines where the hitbox will be located.
     * @_size determines the size of the hibox
     * @_isDebugHitboxVisible if true, makes the hitbox visible, false invisible.
     * @validActions the options that will show up when clicked on.
     */
    public _action: ActionTypes = ActionTypes.Examine;
    public _position: Vector2 = { x: -150, y: 0 };
    public _size: Vector2 = { x: 200, y: 200 };
    public _isDebugHitboxVisible: boolean = true;

    public static readonly validActions: string[] = [ActionTypes.PickUp];

    public constructor() {
        super(BathtubItem.Alias, BathtubItem.validActions);
    }

    public name(): string {
        return "Key";
    }

    public examine(): ActionResult | undefined {
        const playerSession: PlayerSession = gameService.getPlayerSession();
        playerSession.isPickingUpkey = false;
        playerSession.pickedUpKey = false;
        return new TextActionResult([
            "There seems to be a key in the bathtub.",
            "This may be the key needed to unlock the door in the bedroom.",
        ]);
    }

    public pickup(): ActionResult | undefined {
        const playerSession: PlayerSession = gameService.getPlayerSession();
        playerSession.isPickingUpkey = true;

        if (!playerSession.pickedUpKey) {
            playerSession.inventory.push("KeyItem");
            playerSession.pickedUpKey = true;
            return new TextActionResult(["You have picked up the key"]);
        }
        else {
            playerSession.isPickingUpkey = false;
            return new TextActionResult(["You have already picked up the key."]);
        }
    }
}
