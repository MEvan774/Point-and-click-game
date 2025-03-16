import { Item } from "../../game-base/gameObjects/Item";
import { Examine } from "../../game-base/actions/ExamineAction";
import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { ActionTypes } from "../../game-base/enums/ActionAlias";
import { gameService } from "../../global";

/**
 * A mirror the player can walk up to and examine, shows the MirrorCharacter
 *
 * @remarks Implements the Examine and Hide action
 */
export class LightItem extends Item implements Examine {
    // Alias of the item used to find the item
    public static readonly Alias: string = "Light";

    /**
     * _position: Position of the item's hitbox
     * _size: Size of the item's hitbox
     * _isDebugHitboxVisible: If true, shows the hitbox as a pink square
     * _action: Action that happens when clicked on the item's hitbox
     * validActions: Array of the alias of the actions that are possible for this item
     */
    public _position: Vector2 = { x: -75, y: 222 };
    public _size: Vector2 = { x: 53, y: 98 };
    public _action: ActionTypes = ActionTypes.Examine;
    public _isDebugHitboxVisible: boolean = false;
    public static readonly validActions: string[] = [];

    // Create a new instance of this item
    public constructor() {
        super(LightItem.Alias, LightItem.validActions);
    }

    // Name of the item, shows up on the buttons for example
    public name(): string {
        return "Light";
    }

    /**
     * Tells about the item, changes when the riddle is solved
     *
     * @returns TextActionResult with the examine
     */
    public examine(): ActionResult | undefined {
        // Checks if the light is turned on
        if (gameService.getPlayerSession().solvedRiddle) {
            return new TextActionResult([
                "You turned the lantern on!",
                "Good job",
            ]);
        }

        return new TextActionResult([
            "It's a lantern,",
            "But there's no way to light it.",
            "Maybe there is another way to turn it on?",
        ]);
    }
}
