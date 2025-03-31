import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Examine } from "../../game-base/actions/ExamineAction";
import { ActionTypes } from "../../game-base/enums/ActionAlias";
import { Item } from "../../game-base/gameObjects/Item";
import { gameService } from "../../global";
import { Drive } from "../actions/DriveAction";
import { PickUp } from "../actions/PickUpAction";
// import { WinScreenRoom } from "../rooms/WinScreenRoom";
import { PlayerSession } from "../types";

/**
 * The class for DiaryItem, inherts Item properties and uses actions Examine, PickUp.
 */
export class CarKeyItem extends Item implements Examine, Drive, PickUp {
    public static readonly Alias: string = "carKey";
    /**
     * @param _action determines which action will be executed when clicked on.
     * @param _position determines where the hitbox will be located.
     * @param _size determines the size of the hibox
     * @param _isDebugHitboxVisible if true, makes the hitbox visible, false invisible.
     * @param validActions the options that will show up when clicked on.
     */
    public static readonly validActions: string[] = ["drive"];
    public _position: Vector2 = { x: 0, y: 0 };
    public _size: Vector2 = { x: 0, y: 0 };
    public _isDebugHitboxVisible: boolean = false;
    public _action: ActionTypes = ActionTypes.Examine;

    public constructor() {
        super(CarKeyItem.Alias, CarKeyItem.validActions);
    }

    /**
     * Function to give the name of the item
     * @returns the name of the item
     */
    public name(): string {
        return "CarKey";
    }

    /**
     * Function examine an item or character
     * @returns a text based reaction to the action
     */
    public examine(): ActionResult | undefined {
        return new TextActionResult ([
            "I should use this key to start the car",
        ]);
    }

    /**
     * Function to pick up an item
     * @returns a text result based of the action / conditions
     */
    public drive(): ActionResult | undefined {
        return new TextActionResult([
            "You put the key in the igniter and twist it",
            "The car turns on, you might be able to escape!",
        ]);
    }

    public pickup(): ActionResult | undefined {
        const playerSession: PlayerSession = gameService.getPlayerSession();
        playerSession.inventory.push("CarKeyItem");

        return new TextActionResult([
            "You pick up the car keys.",
            "+1 Car Key",
        ]);
    }
}
