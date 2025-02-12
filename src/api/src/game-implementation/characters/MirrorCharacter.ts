import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TalkActionResult } from "../../game-base/actionResults/TalkActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Examine } from "../../game-base/actions/ExamineAction";
import { TalkChoice } from "../../game-base/actions/TalkAction";
import { Character } from "../../game-base/gameObjects/Character";
import { gameService } from "../../global";

export class MirrorCharacter extends Character implements Examine {
    public static readonly Alias: string = "ghost in the mirror";

    public constructor() {
        super(MirrorCharacter.Alias);
    }
    
    public name(): string {
        return "Mirror Character";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "The mirror stares back at you.",
            "Maybe try talking to it?",
        ])
    }

    public talk(choiceId?: number): ActionResult | undefined {
        if (choiceId === 1) {
            return new TalkActionResult(
                this,
                [
                    "Why do you want to know?"
                ],
                [
                    new TalkChoice(3, "I want to escape from here."),
                    new TalkChoice(4, "Nevermind."),
                ]
            )
        }
        else if (choiceId === 3) {
            gameService.getPlayerSession().knowsAboutCode = true;
            return new TextActionResult(["Ok, sure it's 9999."]);
        }
        else if (choiceId === 2 || choiceId === 4) {
            return new TextActionResult(["You walk away from the mirror."]);
        }
        else if (choiceId === 5) {
            return new TextActionResult([
                "...",
                "That's a stupid question."
            ]);
        }

        if (gameService.getPlayerSession().knowsAboutSafe) {
            return new TalkActionResult(
                this,
                [
                    "...",
                ],
                [
                    new TalkChoice(5, "Hello? Is someone there?"),
                    new TalkChoice(1, "Can you tell me the code of the safe?"),
                    new TalkChoice(2, "Walk away."),
                ]
            );
        }
        else {
            return new TalkActionResult(
                this,
                [
                    "...",
                ],
                [
                    new TalkChoice(5, "Hello? Is someone there?"),
                    new TalkChoice(2, "Walk away."),
                ]
            )
        }
    }
}
