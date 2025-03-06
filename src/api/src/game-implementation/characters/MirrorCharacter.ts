import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TalkActionResult } from "../../game-base/actionResults/TalkActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Examine } from "../../game-base/actions/ExamineAction";
import { Talk, TalkChoice } from "../../game-base/actions/TalkAction";
import { ActionTypes } from "../../game-base/enums/ActionAlias";
import { Character } from "../../game-base/gameObjects/Character";
import { gameService } from "../../global";
import { PlayerSession } from "../types";

export class MirrorCharacter extends Character implements Examine, Talk {
    public static readonly Alias: string = "ghost in the mirror";

    public _position: Vector2 = { x: -270, y: 100 };
    public _size: Vector2 = { x: 530, y: 530 };
    public _isDebugHitboxVisible: boolean = false;
    public _action: ActionTypes = ActionTypes.Examine;

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
        ]);
    }

    public talk(choiceId?: number): ActionResult | undefined {
        const playerSession: PlayerSession = gameService.getPlayerSession();
        if (choiceId === 1) {
            return new TalkActionResult(
                this,
                [
                    "Why do you want to know?",
                ],
                [
                    new TalkChoice(3, "Maybe it can help me escape."),
                    new TalkChoice(2, "Nevermind."),
                ]
            );
        }
        else if (choiceId === 3) {
            return new TalkActionResult(
                this,
                [
                    "Then you have to solve my three riddles. Ready?",
                ],
                [
                    new TalkChoice(5, "I'm ready."),
                ]
            );
        }
        else if (choiceId === 2) {
            playerSession.walkedToMirror = false;
            return new TextActionResult(["You walk away from the mirror."]);
        }
        else if (choiceId === 4) {
            playerSession.walkedToMirror = false;
            return new TextActionResult([
                "...",
                "That's a stupid question.",
                "You walk away from the mirror.",
            ]);
        }
        else if (choiceId === 5) {
            return new TalkActionResult(
                this,
                [
                    "I consume without eating, I grow without life,",
                    "Sharp as a blade, cutting deeper than knife.",
                    "What spreads through this castle like poison unseen,",
                    "Consuming all hope with its merciless sheen?",
                ],
                [
                    new TalkChoice(6, "Blood"),
                    new TalkChoice(7, "Despair"),
                    new TalkChoice(6, "Silence"),
                    new TalkChoice(6, "Pain"),
                ]
            );
        }
        else if (choiceId === 6) {
            playerSession.walkedToMirror = false;
            return new TextActionResult([
                "The moment you say the answer, you hear an alarm go off.",
                "You can hear someone coming...",
                "You better hide!",
            ]);
        }
        else if (choiceId === 7) {
            return new TalkActionResult(
                this,
                [
                    "I break without touching, I kill without hands,",
                    "Invisible chains in these haunted lands.",
                    "What force can destroy without leaving a trace?",
                ],
                [
                    new TalkChoice(6, "Time"),
                    new TalkChoice(6, "Illness"),
                    new TalkChoice(6, "Curse"),
                    new TalkChoice(8, "Guilt"),
                ]
            );
        }
        else if (choiceId === 8) {
            return new TalkActionResult(
                this,
                [
                    "Crimson rivers flow where I tread,",
                    "Whispers of silence from the long dead.",
                    "My essence lingers between shadow and light,",
                    "What am I that haunts this castle's night?",
                ],
                [
                    new TalkChoice(6, "The owner's curse"),
                    new TalkChoice(6, "A bloodstain"),
                    new TalkChoice(9, "The anger of the dead"),
                    new TalkChoice(6, "Darkness"),
                ]
            );
        }
        if (choiceId === 9) {
            playerSession.solvedRiddle = true;
            return new TalkActionResult(
                this,
                [
                    "Suddenly, the light turns on.",
                    "You can see numbers on the mirror.",
                    "I guess you gave the right answers.",
                ],
                [
                    new TalkChoice(2, "Walk away."),
                ]
            );
        }

        if (playerSession.knowsAboutSafe) {
            return new TalkActionResult(
                this,
                [
                    "...",
                ],
                [
                    new TalkChoice(4, "Hello? Is someone there?"),
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
                    new TalkChoice(4, "Hello? Is someone there?"),
                    new TalkChoice(2, "Walk away."),
                ]
            );
        }
    }
}
