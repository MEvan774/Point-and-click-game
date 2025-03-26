import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TalkActionResult } from "../../game-base/actionResults/TalkActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Examine } from "../../game-base/actions/ExamineAction";
import { Talk, TalkChoice } from "../../game-base/actions/TalkAction";
import { ActionTypes } from "../../game-base/enums/ActionAlias";
import { Character } from "../../game-base/gameObjects/Character";
import { gameService } from "../../global";
import { PlayerSession } from "../types";

export class CorpseCharacter extends Character implements Examine, Talk {
    public static readonly Alias: string = "CorpseChar";
    /**
     * _position: Position of the item's hitbox
     * _size: Size of the item's hitbox
     * _isDebugHitboxVisible: If true, shows the hitbox as a pink square
     * _action: Action that happens when clicked on the item's hitbox
     * validActions: Array of the alias of the actions that are possible for this item
     */
    public _position: Vector2 = { x: -165, y: 100 };
    public _size: Vector2 = { x: 320, y: 520 };
    public _isDebugHitboxVisible: boolean = false;
    public _action: ActionTypes = ActionTypes.Examine;

    public constructor() {
        super(CorpseCharacter.Alias);
    }

    public name(): string {
        return "CorpseChar";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([""]);
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
        const playerSession: PlayerSession = gameService.getPlayerSession();
        switch (option) {
            case undefined:
                return new TalkActionResult(
                    this,
                    ["The corpse looks like it has been here for quite a while."],
                    [
                        new TalkChoice(1, "Hi."),
                        new TalkChoice(4, "Walk away."),
                    ]
                );
            case 1:
                return new TalkActionResult(
                    this,
                    ["The corpse looks like it has been here for quite a while."],
                    [
                        new TalkChoice(3, "Am I really talking to a corpse?"),
                        new TalkChoice(4, "Walk away."),
                    ]
                );
            case 3:
                return new TalkActionResult(
                    this,
                    ["Yes, I am dead. Somehow my spirit lingers in this freezer and is unable to depart."],
                    [
                        new TalkChoice(5, "I am sorry this happened to you"),
                        new TalkChoice(4, "Walk away."),
                    ]
                );
            case 4:
                playerSession.openedFreezer = false;
                return new TextActionResult(["You close the freezer and walk away."]);
            case 5:
                return new TalkActionResult(
                    this,
                    ["The presence of the spirit seems to wander off, maybe you set it free."],
                    [
                        new TalkChoice(6, "Take metalsaw"),
                        new TalkChoice(4, "Walk away."),
                    ]
                );
            case 6:
                if (!playerSession.pickedUpSaw) {
                    playerSession.openedFreezer = false;
                    playerSession.pickedUpSaw = true;
                    playerSession.inventory.push("MetalSawItem");
                    return new TextActionResult(["You grab the saw from the corpse as gently as you can so you don't disturb it further"]);
                }
                else {
                    playerSession.openedFreezer = false;
                    return new TextActionResult(["You already grabbed the saw.\nThis spot makes a good hiding place, however you try to respect the dead."]);
                }
        }
        return undefined;
    }
}
