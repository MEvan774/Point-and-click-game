import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TalkActionResult } from "../../game-base/actionResults/TalkActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Examine } from "../../game-base/actions/ExamineAction";
import { Talk, TalkChoice } from "../../game-base/actions/TalkAction";
import { Character } from "../../game-base/gameObjects/Character";
import { gameService } from "../../global";
import { GoTo } from "../actions/GoToAction";

export class EyeCharacter extends Character implements Examine, Talk, GoTo {
    public static readonly Alias: string = "eyeCharacter";

    public constructor() {
        super(EyeCharacter.Alias);
    }

    public name(): string {
        return "Eye Character";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "It is looking at you, obviously.",
        ]);
    }

    public goto(): ActionResult | undefined {
        return new TextActionResult([
            "Really? You want to go there?",
        ]);
    }

    public talk(choiceId?: number): ActionResult | undefined {
        switch (choiceId) {
            case undefined: {
                return new TalkActionResult(
                    this,
                    [
                        "...",
                    ],
                    [
                        new TalkChoice(1, "Hello?"),
                        new TalkChoice(2, "Run away as fast as you can."),
                    ]
                );
            }
            case 1:
                gameService.getPlayerSession().pickedUpKey = false;
                gameService.getPlayerSession().isPickingUpkey = false;
                {
                    return new TalkActionResult(
                        this,
                        [
                            "Did you really think eyes could talk?",
                        ],
                        [
                            new TalkChoice(3, "Snatch the key off of his neck."),
                        ]
                    );
                }
            case 2:
            {
                return new TextActionResult([
                    "You ran away like a coward...",
                ]);
            }
            case 3:
            {
                gameService.getPlayerSession().isPickingUpkey = true;
                gameService.getPlayerSession().pickedUpKey = true;
                gameService.getPlayerSession().inventory.push("KeyItem");
                return new TextActionResult([
                    "You snatched the key and ran away...",
                ]);
            }
        }
        return undefined;
    }
}
