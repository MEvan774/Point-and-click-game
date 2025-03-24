import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TalkActionResult } from "../../game-base/actionResults/TalkActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Examine } from "../../game-base/actions/ExamineAction";
import { Talk, TalkChoice } from "../../game-base/actions/TalkAction";
import { ActionTypes } from "../../game-base/enums/ActionAlias";
import { Character } from "../../game-base/gameObjects/Character";
import { GoTo } from "../actions/GoToAction";

export class GhostCharacter extends Character implements Examine, Talk, GoTo {
    public static readonly Alias: string = "ghostCharacter";

    /**
     * @_action determines which action will be executed when clicked on.
     * @_position determines where the hitbox will be located.
     * @_size determines the size of the hibox
     * @_isDebugHitboxVisible if true, makes the hitbox visible, false invisible.
     * @validActions the options that will show up when clicked on.
     */
    public _action: ActionTypes = ActionTypes.Examine;
    public _position: Vector2 = { x: -200, y: 100 };
    public _size: Vector2 = { x: 400, y: 400 };
    public static readonly validActions: string[] = [ActionTypes.Talk];
    public _isDebugHitboxVisible: boolean = false;

    public constructor() {
        super(GhostCharacter.Alias);
    }

    // Name of the item, shows up on the buttons for example
    public name(): string {
        return "Ghost Character";
    }

    /**
     * Tells about the GhostCharacter, hints at the talk action
     *
     * @returns TextActionResult with the examine
     */
    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "It unnerves me...",
        ]);
    }

    // When the goTo action is used on the ghostCharacter
    public goto(): ActionResult | undefined {
        return new TextActionResult([
            "I'd prefer not to get close to him.",
        ]);
    }

    /**
     * Talks with the GhostCharacter
     * @class TalkChoice Will call this function again but with its given choiceId
     *
     * @returns TalkActionResult with more dialoge
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
                        new TalkChoice(1, "Hi."),
                        new TalkChoice(2, "Walk away."),
                    ]
                );
            }
            case 1:
            {
                return new TalkActionResult(
                    this,
                    [
                        "Hi, get me some bodyparts.",
                    ],
                    [
                        new TalkChoice(3, "Sure."),
                    ]
                );
            }
            case 3:
            {
                return new TextActionResult([
                    "You walked away...",
                ]);
            }
        }
        return undefined;
    }
}
