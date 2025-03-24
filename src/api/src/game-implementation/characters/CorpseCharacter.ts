import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TalkActionResult } from "../../game-base/actionResults/TalkActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Examine } from "../../game-base/actions/ExamineAction";
import { Talk, TalkChoice } from "../../game-base/actions/TalkAction";
import { Character } from "../../game-base/gameObjects/Character";
// import { gameService } from "../../global";
import { GoTo } from "../actions/GoToAction";
// import { PlayerSession } from "../types";

export class CorpseCharacter extends Character implements Examine, Talk, GoTo {
    public static readonly Alias: string = "CorpseChar";

    public constructor() {
        super(CorpseCharacter.Alias);
    }

    public name(): string {
        return "CorpseChar";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["Test"]);
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
