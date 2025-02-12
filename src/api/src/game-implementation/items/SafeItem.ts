import { Item } from "../../game-base/gameObjects/Item";
import { Examine } from "../../game-base/actions/ExamineAction";
import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { gameService } from "../../global";
import { Open } from "../actions/OpenAction";

export class SafeItem extends Item implements Examine, Open {
    public static readonly Alias: string = "Safe";

    public constructor() {
        super(SafeItem.Alias);
    }

    public name(): string {
        return "Safe";
    }

    public examine(): ActionResult | undefined {
        gameService.getPlayerSession().knowsAboutSafe = true;

        return new TextActionResult([
            "There is a safe in the closet.",
            "The safe has a keypad on it.",
            "Maybe someone knows the code?",
        ]);
    }

    public open(): ActionResult | undefined {
        if (gameService.getPlayerSession().knowsAboutCode) {
            gameService.getPlayerSession().safeOpened = true;

            return new TextActionResult([
                "You put the code you got into the safe.",
                "...",
                "It works! You found the flashlight.",
            ])
        }
        else {
            return new TextActionResult([
                "You need a code to open the safe.",
                "Maybe try looking around?",
            ])
        }
    }
}
