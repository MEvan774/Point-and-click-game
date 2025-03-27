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
    public _size: Vector2 = { x: 165, y: 400 };
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
                        "(The ghost stands before a rotting, grimy stove, it boils over with something",
                        "too thick, too red. It stirs—slow, deliberate—ignoring you.",
                        "The smell of rotten flesh lingers in the air.)",
                    ],
                    [
                        new TalkChoice(1, "uh, Excuse me…?"),
                        new TalkChoice(11, "(Walk away.)"),
                    ]
                );
            }
            case 1:
            {
                return new TalkActionResult(
                    this,
                    [
                        "The ghost doesn’t react at first.",
                        "Then, its head tilts slightly, like it only just realized you exist.",
                    ],
                    [
                        new TalkChoice(3, "The front door… is there a way to open it?"),
                    ]
                );
            }
            case 3:
            {
                return new TalkActionResult(
                    this,
                    [
                        "(The ghost stops. The spoon hovers over the pot, dripping something dark.)",
                        "(It turns, just slightly. You hear bones creak, yours or its, you’re not sure.)",
                        "“…You want out?” (Its voice crackles, low and wet.)",
                        "(A beat of silence. Then: a short, rasping chuckle.) funny.",
                    ],
                    [
                        new TalkChoice(8, "P-please... I need to leave."),
                    ]
                );
            }
            case 8:
            {
                return new TalkActionResult(
                    this,
                    [
                        "You scrape. You pry. But doors do not open for the weak.",
                        "(It gestures lazily toward the bubbling mess.)",
                        "Trade. That’s the way of things. A tool for a tool.",
                        "…But I do not want things.” (It finally looks at you—deep, hollow, unblinking.)",
                        "I want ingredients.",
                    ],
                    [
                        new TalkChoice(9, "…Ingredients?"),
                    ]
                );
            }
            case 9:
            {
                return new TalkActionResult(
                    this,
                    [
                        "(The ghost nods, voice thick with something between hunger and amusement.)",
                        "This dish should watch over us, even as it simmers. (Its head tilts slightly.) Find me what sees.",
                        "I need the cut that tells no lies, where pain is etched deep. (Its voice is slow, deliberate.)",
                        "…Bring them. Then, you may have what you need.",
                    ],
                    [
                        new TalkChoice(11, "Leave."),
                    ]
                );
            }
            case 11:
            {
                return new TalkActionResult(
                    this,
                    [
                        "You left, wondering if the ghost will keep its promise...",
                    ],
                    [
                    ]
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
                        "The ghost is obsessively stirring in the stove.",
                        "Your not sure if its wise to interrupt him.",
                    ],
                    [
                        new TalkChoice(1, "Uhm…?"),
                    ]
                );
            }
            case 1: {
                return new TalkActionResult(
                    this,
                    [
                        "(The ghost doesn’t face you. It reaches to the counter, slow and deliberate.)",
                        "(With a scrape of rusted metal against stone, it slides something toward you.)",
                        "(A crowbar—old, chipped, but heavy in your hands.)",
                    ],
                    [
                        new TalkChoice(2, "Leave."),
                    ]
                );
            }
            case 2: {
                playerSession.inventory.push("CrowbarItem");
                return new TalkActionResult(
                    this,
                    [
                        "You left with the crowbar, eager to break open the door.",
                    ],
                    [
                    ]
                );
            }
        }
        return undefined;
    }

    private talkIfRecievedCrowbar(choiceId?: number): ActionResult | undefined {
        const playerSession: PlayerSession = gameService.getPlayerSession();
        switch (choiceId) {
            case undefined: {
                return new TalkActionResult(
                    this,
                    [
                        "Still here? What... more?",
                        "You should taste it.",
                    ],
                    [
                        new TalkChoice(1, "(Accept)"),
                        new TalkChoice(2, "(Refuse)"),
                    ]
                );
            }
            case 1: {
                playerSession.startedMinigame = true;
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
