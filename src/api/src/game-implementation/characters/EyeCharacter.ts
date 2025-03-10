import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TalkActionResult } from "../../game-base/actionResults/TalkActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Examine } from "../../game-base/actions/ExamineAction";
import { Talk, TalkChoice } from "../../game-base/actions/TalkAction";
import { ActionTypes } from "../../game-base/enums/ActionAlias";
import { Character } from "../../game-base/gameObjects/Character";
import { gameService } from "../../global";
import { GoTo } from "../actions/GoToAction";

export class EyeCharacter extends Character implements Examine, Talk, GoTo {
    public static readonly Alias: string = "eyeCharacter";

    public _position: Vector2 = { x: -318, y: 100 };
    public _size: Vector2 = { x: 350, y: 450 };
    public _isDebugHitboxVisible: boolean = true;
    public _action: ActionTypes = ActionTypes.Examine;

    // Create a new instance of EyeCharacter.
    public constructor() {
        super(EyeCharacter.Alias);
    }

    // Return the name of the character.
    public name(): string {
        return "Eye Character";
    }

    /**
     * Tells you a bit about the EyeCharacter.
     *
     * @returns TextActionResult with an examin function.
     */
    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "It is looking at you, obviously.",
        ]);
    }

    // A goto action for the EyeCharacter.
    public goto(): ActionResult | undefined {
        return new TextActionResult([
            "Really? You want to go there?",
        ]);
    }

    /**
     * Talk to the EyeCharacter.
     * @class TalkChoice will call this function with the choiceId.
     *
     * @returns TalkActionResult returns more dialog options.
     */
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
