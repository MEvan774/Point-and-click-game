import { Item } from "../../game-base/gameObjects/Item";
import { Examine } from "../../game-base/actions/ExamineAction";
import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { gameService } from "../../global";
import { Open } from "../actions/OpenAction";
import { PlayerSession } from "../types";
import { ActionTypes } from "../../game-base/enums/ActionAlias";

export class SafeItem extends Item implements Examine, Open {
    public static readonly Alias: string = "Safe";
    public _position: Vector2 = { x: 20, y: 140 };
    public _size: Vector2 = { x: 80, y: 80 };
    public _action: ActionTypes = ActionTypes.Open;

    public constructor() {
        super(SafeItem.Alias);
    }

    public name(): string {
        return "Safe";
    }

    public examine(): ActionResult | undefined {
        const playerSession: PlayerSession = gameService.getPlayerSession();
        playerSession.knowsAboutSafe = true;

        if (!playerSession.safeOpened) {
            return new TextActionResult([
                "There is a safe in the closet.",
                "The safe has a keypad on it.",
                "Maybe someone knows the code?",
            ]);
        }

        return new TextActionResult(["The safe is open."]);
    }

    public open(): ActionResult | undefined {
        const playerSession: PlayerSession = gameService.getPlayerSession();

        if (!playerSession.solvedRiddle) {
            return new TextActionResult([
                "You put in a random code...",
                "Wrong. Obviously.",
            ]);
        }
        else if (!playerSession.safeOpened) {
            playerSession.safeOpened = true;
            playerSession.inventory.push("FlashlightItem");

            return new TextActionResult([
                "You put the code you got into the safe.",
                "...",
                "It works! You found the flashlight.",
            ]);
        }

        return new TextActionResult(["The safe is already open."]);
    }
}
