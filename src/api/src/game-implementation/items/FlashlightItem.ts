import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { Examine } from "../../game-base/actions/ExamineAction";
import { Item } from "../../game-base/gameObjects/Item";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";

/**
 * A flashlight to light up the LivingRoom
 *
 * @remarks Implements the Examine action
 */
export class FlashlightItem extends Item implements Examine {
    // Alias of the item used to find the item
    public static readonly Alias: string = "Flashlight";

    // Array of the alias of the actions that are possible for this item
    public static readonly validActions: string[] = ["examine"];

    // Create a new instance of this item
    public constructor() {
        super(FlashlightItem.Alias, FlashlightItem.validActions);
    }

    // Name of the item, shows up on the buttons for example
    public name(): string {
        return "Flashlight";
    }

    /**
     * Tells about the item
     *
     * @returns TextActionResult with the examine
     */
    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "This is a flashlight.",
        ]);
    }
}
