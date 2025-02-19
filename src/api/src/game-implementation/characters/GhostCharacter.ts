import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TalkActionResult } from "../../game-base/actionResults/TalkActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Examine } from "../../game-base/actions/ExamineAction";
import { Talk, TalkChoice } from "../../game-base/actions/TalkAction";
import { Character } from "../../game-base/gameObjects/Character";

export class GhostCharacter extends Character implements Examine, Talk {
    public static readonly Alias: string = "ghost in the mirror";

    public constructor() {
        super(GhostCharacter.Alias);
    }

    public name(): string {
        return "Ghost Character";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "...",
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
                    "He smiles.",
                ]);
            }
        }
        return undefined;
    }
}
