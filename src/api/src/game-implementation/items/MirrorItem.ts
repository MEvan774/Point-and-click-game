import { Item } from "../../game-base/gameObjects/Item";
import { Examine } from "../../game-base/actions/ExamineAction";
import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { GoTo } from "../actions/GoToAction";
import { gameService } from "../../global";
import { ActionTypes } from "../../game-base/enums/ActionAlias";

/**
 * A mirror the player can walk up to and examine, shows the MirrorCharacter
 *
 * @remarks Implements the Examine and Hide action
 */
export class MirrorItem extends Item implements Examine, GoTo {
    // Alias of the item used to find the item
    public static readonly Alias: string = "Mirror";

    /**
     * _position: Position of the item's hitbox
     * _size: Size of the item's hitbox
     * _isDebugHitboxVisible: If true, shows the hitbox as a pink square
     * _action: Action that happens when clicked on the item's hitbox
     * validActions: Array of the alias of the actions that are possible for this item
     */
    public _position: Vector2 = { x: -235, y: 180 };
    public _size: Vector2 = { x: 155, y: 245 };
    public _isDebugHitboxVisible: boolean = false;
    public _action: ActionTypes = ActionTypes.Examine;
    public static readonly validActions: string[] = ["go to"];

    // Create a new instance of this item
    public constructor() {
        super(MirrorItem.Alias, MirrorItem.validActions);
    }

    // Name of the item, shows up on the buttons for example
    public name(): string {
        return "Mirror";
    }

    /**
     * Tells about the item, changes when the riddle is solved
     *
     * @returns TextActionResult with the examine
     */
    public examine(): ActionResult | undefined {
        // Checks if the riddle has been solved
        if (gameService.getPlayerSession().solvedRiddle) {
            return new TextActionResult(["The mirror looks normal."]);
        }

        // When the riddle has not been solved
        return new TextActionResult(["It looks like someone is staring at you..."]);
    }

    /**
     * Go to the mirror, updates the PlayerSession
     *
     * @returns TextActionResult that tells the player they go to the mirror
     */
    public goto(): ActionResult | undefined {
        return new TextActionResult(["You go up to the mirror."]);
    }
}
