import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TalkActionResult } from "../../game-base/actionResults/TalkActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Examine } from "../../game-base/actions/ExamineAction";
import { Talk, TalkChoice } from "../../game-base/actions/TalkAction";
import { ActionTypes } from "../../game-base/enums/ActionAlias";
import { Character } from "../../game-base/gameObjects/Character";
import { gameService } from "../../global";
import { GoTo } from "../actions/GoToAction";
import { PlayerSession } from "../types";

export class EyeCharacter extends Character implements Examine, Talk, GoTo {
    public static readonly Alias: string = "eyeCharacter";

    public _position: Vector2 = { x: -318, y: 100 };
    public _size: Vector2 = { x: 350, y: 450 };
    public _isDebugHitboxVisible: boolean = false;
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
            "Uhhh... it's just an eye with a key around it's neck. What's so special about that?",
        ]);
    }

    // A goto action for the EyeCharacter.
    public goto(): ActionResult | undefined {
        return new TextActionResult([
            "...",
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
                        "Really now? You're talking to an eye?",
                    ],
                    [
                        new TalkChoice(1, "Hello?"),
                        new TalkChoice(2, "Run away as fast as you can."),
                    ]
                );
            }
            case 1:
            {
                return new TalkActionResult(
                    this,
                    [
                        "Did you really think eyes could talk?",
                    ],
                    [
                        new TalkChoice(4, "Snatch the key off of his neck."),
                    ]
                );
            }
            case 2:
            {
                gameService.getPlayerSession().walkedToBathtub = false;
                return new TextActionResult([
                    "You ran away like a coward...",
                ]);
            }
            case 4:
            {
                const playerSession: PlayerSession = gameService.getPlayerSession();
                if (!playerSession.pickedUpKey) {
                    playerSession.inventory.push("KeyItem");
                    playerSession.pickedUpKey = true;
                    playerSession.walkedToBathtub = false;
                    return new TextActionResult([
                        "You snatched the key and ran away...",
                        "+1 KeyItem",
                    ]);
                }
                else {
                    return new TextActionResult([
                        "You already snatched the key, so instead you stab him in the eye and run away.",
                    ]);
                }
            }
        }
        return undefined;
    }
}
