import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TalkActionResult } from "../../game-base/actionResults/TalkActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Examine } from "../../game-base/actions/ExamineAction";
import { Talk, TalkChoice } from "../../game-base/actions/TalkAction";
import { ActionTypes } from "../../game-base/enums/ActionAlias";
import { Character } from "../../game-base/gameObjects/Character";
import { gameService } from "../../global";
import { PlayerSession } from "../types";

/**
 * Implemention of the MirrorCharacter
 *
 * @remarks Implements Examine en Talk
 */
export class MirrorCharacter extends Character implements Examine, Talk {
    // Alias of the item used to find the item
    public static readonly Alias: string = "ghost in the mirror";

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

    // Create a new instance of this item
    public constructor() {
        super(MirrorCharacter.Alias);
    }

    // Name of the item, shows up on the buttons for example
    public name(): string {
        return "Mirror Character";
    }

    /**
     * Tells about the MirrorCharacter, hints at the talk action
     *
     * @returns TextActionResult with the examine
     */
    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "The mirror stares back at you.",
            "Maybe try talking to it?",
        ]);
    }

    /**
     * Talks with the MirrorCharacter
     *
     * @returns TalkActionResult with more dialoge
     */
    public talk(choiceId?: number): ActionResult | undefined {
        const playerSession: PlayerSession = gameService.getPlayerSession();

        // When "Can you tell me the code of the safe?" is chosen
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

        // When "Walk away." is chosen
        if (choiceId === 2) {
            playerSession.walkedToMirror = false;
            return new TextActionResult(["You walk away from the mirror."]);
        }

        // When "Maybe it can help me escape." is chosen
        if (choiceId === 3) {
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

        // When "Hello? Is someone there?" is chosen
        if (choiceId === 4) {
            playerSession.walkedToMirror = false;
            return new TextActionResult([
                "You have no idea what to ask...",
                "You should look around the room first.",
                "Maybe there's something in the bookshelf?",
            ]);
        }

        // When "I'm ready." is chosen
        if (choiceId === 5) {
            return new TalkActionResult(
                this,
                [
                    "I consume without eating, I grow without life,",
                    "Sharp as a blade, cutting deeper than knife.",
                    "What spreads through this castle like poison unseen,",
                    "Consuming all hope with its merciless sheen?",
                ],
                [
                    new TalkChoice(666, "Blood"),
                    new TalkChoice(7, "Despair"),
                    new TalkChoice(666, "Silence"),
                    new TalkChoice(666, "Pain"),
                ]
            );
        }

        // When a wrong answer is chosen
        if (choiceId === 666) {
            playerSession.walkedToMirror = false;
            return new TextActionResult([
                "The moment you say the answer, you hear an alarm go off.",
                "You can hear someone coming...",
                "You better hide!",
            ]);
        }

        // When "Despair" is chosen
        if (choiceId === 7) {
            return new TalkActionResult(
                this,
                [
                    "I break without touching, I kill without hands,",
                    "Invisible chains in these haunted lands.",
                    "What force can destroy without leaving a trace?",
                ],
                [
                    new TalkChoice(666, "Time"),
                    new TalkChoice(666, "Illness"),
                    new TalkChoice(666, "Curse"),
                    new TalkChoice(8, "Guilt"),
                ]
            );
        }

        // When "Guilt" is chosen
        if (choiceId === 8) {
            return new TalkActionResult(
                this,
                [
                    "Crimson rivers flow where I tread,",
                    "Whispers of silence from the long dead.",
                    "My essence lingers between shadow and light,",
                    "What am I that haunts this castle's night?",
                ],
                [
                    new TalkChoice(666, "The owner's curse"),
                    new TalkChoice(666, "A bloodstain"),
                    new TalkChoice(9, "The anger of the dead"),
                    new TalkChoice(666, "Darkness"),
                ]
            );
        }

        // When "The anger of the dead" is chosen
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

        // When the SafeItem has been examined and Talk is selected
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

        // When Talk is selected and SafeItem is not examined
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
