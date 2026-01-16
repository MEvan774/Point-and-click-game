import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TalkActionResult } from "../../game-base/actionResults/TalkActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Examine } from "../../game-base/actions/ExamineAction";
import { Talk, TalkChoice } from "../../game-base/actions/TalkAction";
import { ActionTypes } from "../../game-base/enums/ActionAlias";
import { Character } from "../../game-base/gameObjects/Character";
import { gameService } from "../../global";
import { PlayerSession } from "../types";

export class GhostCharacter extends Character implements Examine, Talk {
    public static readonly Alias: string = "ghostCharacter";

    /**
     * @_action determines which action will be executed when clicked on.
     * @_position determines where the hitbox will be located.
     * @_size determines the size of the hibox
     * @_isDebugHitboxVisible if true, makes the hitbox visible, false invisible.
     * @validActions the options that will show up when clicked on.
     */
    public _action: ActionTypes = ActionTypes.Examine;
    public _position: Vector2 = { x: -100, y: 100 };
    public _size: Vector2 = { x: 165, y: 300 };
    // public static readonly validActions: string[] = [ActionTypes.Talk, ActionTypes.GoTo];
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
        const playerSession: PlayerSession = gameService.getPlayerSession();

        // Checks if player has all the items, gets them all and removes them from inventory
        if (playerSession.inventory.includes("Eyes") && playerSession.inventory.includes("Tongue")) {
            if (playerSession.inventory.includes("Eyes")) {
                const indexEyes: number = playerSession.inventory.indexOf("Eyes");
                if (indexEyes !== -1)
                    playerSession.inventory.splice(indexEyes, 1);
                const indexTongue: number = playerSession.inventory.indexOf("Tongue");
                if (indexTongue !== -1)
                    playerSession.inventory.splice(indexTongue, 1);

                playerSession.givenEyes = true;
                playerSession.givenTongue = true;
                return new TextActionResult([
                    "Before you could reach for your 'ingredients', the ghost snatched it all away without you realizing it.",
                    "You feel your body freezing up, realizing it could have been the end for you.",
                ]);
            }
        }
        switch (playerSession.selectedItem) {
            case "Eyes": {
                const index: number = playerSession.inventory.indexOf("Eyes");
                if (index !== -1)
                    playerSession.inventory.splice(index, 1);

                playerSession.givenEyes = true;
                return new TextActionResult([
                    "The moment you showed the eyes, it got immediately snatched.",
                ]);
            }
            case "Tongue": {
                const index: number = playerSession.inventory.indexOf("Tongue");
                if (index !== -1)
                    playerSession.inventory.splice(index, 1);

                playerSession.givenTongue = true;
                return new TextActionResult([
                    "The moment you showed the tongue, it got immediately snatched.",
                ]);
            }
            case "": {
                return new TextActionResult([
                    "Better not mess with him.",
                ]);
            }
        }
        return new TextActionResult([
            "Its shadow twitches, but it’s not moving.",
            "It unnerves you.",
        ]);
    }

    /**
     * Talks with the GhostCharacter
     * @class TalkChoice Will call this function again but with its given choiceId
     *
     * @returns TalkActionResult with more dialoge
     */
    public talk(choiceId?: number): ActionResult | undefined {
        const playerSession: PlayerSession = gameService.getPlayerSession();

        if (playerSession.inventory.includes("CrowbarItem"))
            return this.talkIfRecievedCrowbar(choiceId);

        if (playerSession.givenEyes && playerSession.givenTongue)
            return this.talkIfGivenIngredients(choiceId);

        switch (choiceId) {
            case undefined: {
                return new TalkActionResult(
                    this,
                    [
                        "A ghost stands over a filthy stove, stirring a thick red mixture.",
                        "It does not acknowledge you.",
                    ],
                    [
                        new TalkChoice(1, "Excuse me."),
                        new TalkChoice(11, "Leave."),
                    ]
                );
            }

            case 1: {
                return new TalkActionResult(
                    this,
                    [
                        "The ghost pauses.",
                        "It turns slightly toward you.",
                    ],
                    [
                        new TalkChoice(3, "Is there a way to open the front door?"),
                    ]
                );
            }

            case 3: {
                return new TalkActionResult(
                    this,
                    [
                        "You want to leave?",
                        "That’s not free.",
                    ],
                    [
                        new TalkChoice(8, "I need to get out."),
                    ]
                );
            }

            case 8: {
                return new TalkActionResult(
                    this,
                    [
                        "Doors open through trade.",
                        "I don’t want objects.",
                        "I want ingredients.",
                    ],
                    [
                        new TalkChoice(9, "What ingredients?"),
                    ]
                );
            }

            case 9: {
                return new TalkActionResult(
                    this,
                    [
                        "Bring me eyes.",
                        "Bring me a tongue.",
                        "Do that, and I’ll give you what you need.",
                    ],
                    [
                        new TalkChoice(11, "Leave."),
                    ]
                );
            }

            case 11: {
                return new TalkActionResult(
                    this,
                    [
                        "You leave.",
                    ],
                    []
                );
            }
        }

        return undefined;
    }

    private talkIfGivenIngredients(choiceId?: number): ActionResult | undefined {
        const playerSession: PlayerSession = gameService.getPlayerSession();

        switch (choiceId) {
            case undefined: {
                return new TalkActionResult(
                    this,
                    [
                        "The ghost continues stirring at the stove.",
                    ],
                    [
                        new TalkChoice(1, "Get its attention."),
                    ]
                );
            }

            case 1: {
                return new TalkActionResult(
                    this,
                    [
                        "Without turning, the ghost pushes a crowbar toward you.",
                    ],
                    [
                        new TalkChoice(555, "Take the crowbar."),
                    ]
                );
            }

            case 555: {
                playerSession.inventory.push("CrowbarItem");

                return new TalkActionResult(
                    this,
                    [
                        "You take the crowbar.",
                        "+1 CrowbarItem",
                    ],
                    []
                );
            }
        }

        return undefined;
    }

    private talkIfRecievedCrowbar(choiceId?: number): ActionResult | undefined {
        // const playerSession: PlayerSession = gameService.getPlayerSession();
        switch (choiceId) {
            case undefined: {
                return new TalkActionResult(
                    this,
                    [
                        "Still here? What... more?",
                        "You should taste it.",
                    ],
                    [
                        new TalkChoice(777, "(Accept)"),
                        new TalkChoice(2, "(Refuse)"),
                    ]
                );
            }
            case 777: {
                // playerSession.startedMinigame = true;
                return new TalkActionResult(
                    this,
                    [
                        "Brave. Foolish. Open wide, then.",
                    ],
                    [
                    ]
                );
            }
        }
        return new TalkActionResult(
            this,
            [
                "You turn away from a gift... but soon, you’ll crave it.",
            ],
            [
            ]
        );
    }
}
