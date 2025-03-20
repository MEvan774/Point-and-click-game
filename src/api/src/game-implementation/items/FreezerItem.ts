import { ActionTypes } from "../../game-base/enums/ActionAlias";
import { Item } from "../../game-base/gameObjects/Item";
import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Examine } from "../../game-base/actions/ExamineAction";
import { GoTo } from "../actions/GoToAction";
import { Open } from "../actions/OpenAction";

export class FreezerItem extends Item implements Examine, GoTo, Open {
    /**
     * _position: Position of the item's hitbox
     * _size: Size of the item's hitbox
     * _isDebugHitboxVisible: If true, shows the hitbox as a pink square
     * _action: Action that happens when clicked on the item's hitbox
     * validActions: Array of the alias of the actions that are possible for this item
     */
    public static readonly Alias: string = "Freezer";
    public _position: Vector2 = { x: 230, y: 400 };
    public _size: Vector2 = { x: 200, y: 170 };
    public _isDebugHitboxVisible: boolean = false;
    public _action: ActionTypes = ActionTypes.Examine;
    public static readonly validActions: string[] = ["go to", "open"];

    public constructor() {
        super(FreezerItem.Alias, FreezerItem.validActions);
    }

    /**
     * Tells about the item
     *
     * @returns TextActionResult with the examine
     */
    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "This looks like a freezer, maybe something is in it",
        ]);
    }

    public goto(): ActionResult | undefined {
        return new TextActionResult([
            "You walk up to the freezer, not knowing what you'll find",
        ]);
    }

    public open(): ActionResult | undefined {
        return new TextActionResult([
            "You open the freezer and see a skeleton inside it.",
            "By the looks of it, it was one of the previous victims, not worthy of escaping this castle.",
            "It appears to be holding a metal saw in it's hand.\nThis might come in handy to destroy the lock I saw on the gate",
        ]);
    }

    // Name of the item, shows up on the buttons for example
    public name(): string {
        return "Freezer";
    }
}
