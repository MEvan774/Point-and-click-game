import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Examine } from "../../game-base/actions/ExamineAction";
import { ActionTypes } from "../../game-base/enums/ActionAlias";
import { Item } from "../../game-base/gameObjects/Item";
import { gameService } from "../../global";
import { PickUp } from "../actions/PickUpAction";
import { PlayerSession } from "../types";

/**
 * The class for DiaryItem, inherts Item properties and uses actions Examine, PickUp.
 */
export class DiaryItem extends Item implements Examine, PickUp {
    public static readonly Alias: string = "Diary";
    /**
     * @param _action determines which action will be executed when clicked on.
     * @param _position determines where the hitbox will be located.
     * @param _size determines the size of the hibox
     * @param _isDebugHitboxVisible if true, makes the hitbox visible, false invisible.
     * @param validActions the options that will show up when clicked on.
     */
    public static readonly validActions: string[] = ["pick up", "read"];
    public _position: Vector2 = { x: -55, y: 340 };
    public _size: Vector2 = { x: 100, y: 80 };
    public _isDebugHitboxVisible: boolean = false;
    public _action: ActionTypes = ActionTypes.Examine;

    public constructor() {
        super(DiaryItem.Alias, DiaryItem.validActions);
    }

    /**
     * Function to give the name of the item
     * @returns the name of the item
     */
    public name(): string {
        return "Diary";
    }

    /**
     * Function examine an item or character
     * @returns a text based reaction to the action
     */
    public examine(): ActionResult | undefined {
        const playerSession: PlayerSession = gameService.getPlayerSession();
        if (!playerSession.pickedUpDiary) {
            return new TextActionResult ([
                "This diary looks old.",
                "I should read this diary.",
                "Maybe, I will find out who did this to me",
            ]);
        }
        else {
            playerSession.clickedDiary = false;
            return new TextActionResult([
                "You have already picked up the diary.",
            ]);
        }
    }

    /**
     * Function to pick up an item
     * @returns a text result based of the action / conditions
     */
    public pickup(): ActionResult | undefined {
        const playerSession: PlayerSession = gameService.getPlayerSession();
        playerSession.pickedUpDiary = true;
        playerSession.inventory.push("DiaryItem");
        return new TextActionResult([
            "You have picked up the diary... Huh? a key fell out!",
            "+1 DiaryItem 1+ OutsideDoor Key",
        ]);
    }
}
