import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TalkActionResult } from "../../game-base/actionResults/TalkActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Examine } from "../../game-base/actions/ExamineAction";
import { Talk, TalkChoice } from "../../game-base/actions/TalkAction";
import { Character } from "../../game-base/gameObjects/Character";
import { gameService } from "../../global";
import { PlayerSession } from "../types";

export class MirrorCharacter extends Character implements Examine, Talk {
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
        const playerSession: PlayerSession = gameService.getPlayerSession();
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
            playerSession.solvedRiddle = true;
            return new TalkActionResult(
                this,
                [
                    "Oh, the light turned on.",
                    "There are numbers written on the mirror,",
                    "Maybe this is the code for the safe?",
                ],
                [
                    new TalkChoice(2, "Walk away."),
                ]
            );
        }
        else if (choiceId === 2 || choiceId === 4) {
            playerSession.walkedToMirror = false;
            return new TextActionResult(["You walk away from the mirror."]);
        }
        else if (choiceId === 5) {
            playerSession.walkedToMirror = false;
            return new TextActionResult([
                "...",
                "That's a stupid question.",
                "You walk away from the mirror."
            ]);
        }

        if (playerSession.knowsAboutSafe) {
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
