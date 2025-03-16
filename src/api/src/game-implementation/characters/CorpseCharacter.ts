import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TalkActionResult } from "../../game-base/actionResults/TalkActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Examine } from "../../game-base/actions/ExamineAction";
import { Talk, TalkChoice } from "../../game-base/actions/TalkAction";
import { ActionTypes } from "../../game-base/enums/ActionAlias";
import { Character } from "../../game-base/gameObjects/Character";

export class CorpseCharacter extends Character implements Examine, Talk {
    public static readonly Alias: string = "CorpseChar";
    /**
     * _position: Position of the item's hitbox
     * _size: Size of the item's hitbox
     * _isDebugHitboxVisible: If true, shows the hitbox as a pink square
     * _action: Action that happens when clicked on the item's hitbox
     * validActions: Array of the alias of the actions that are possible for this item
     */
    public _position: Vector2 = { x: -270, y: 100 };
    public _size: Vector2 = { x: 530, y: 530 };
    public _isDebugHitboxVisible: boolean = false;
    public _action: ActionTypes = ActionTypes.Examine;

    public constructor() {
        super(CorpseCharacter.Alias);
    }

    public name(): string {
        return "CorpseChar";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["You expect a horrid smell, but the flesh is gone. Only the bones remain."]);
    }

    public goto(): ActionResult | undefined {
        return new TextActionResult(["Hi"]);
    }

    /**
     * This function represents the choices a player can make
     * @param option this represents the ID of the choice
     * @returns textactionresult based of the chosen ID (option)
     */
    public talk(option?: number): ActionResult | undefined {
        // const playerSession: PlayerSession = gameService.getPlayerSession();
        switch (option) {
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
            case 1: {
                return new TalkActionResult(
                    this,
                    [
                        "The corpse looks like it has been here for quite a while. ",
                    ],
                    [
                        new TalkChoice(3, "Am I really talking to a corpse?"),
                    ]
                );
            }
            case 2: {
                return new TalkActionResult(
                    this,
                    [
                        "You have walked away",
                    ],
                    [
                    ]
                );
            }
            case 3: {
                return new TalkActionResult(
                    this,
                    [
                        "Yes, I am dead. Somehow my spirit lingers in this freezer and is unable to depart.",
                    ],
                    [
                        new TalkChoice(4, "I am sorry this happened to you"),
                    ]
                );
            }
            case 4: {
                return new TalkActionResult(
                    this,
                    [
                        "The presence of the spirit seems to wander off, maybe you set it free",
                    ],
                    [
                    ]
                );
            }
        }
        return undefined;
    }
}
