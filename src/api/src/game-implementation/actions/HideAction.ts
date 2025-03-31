import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { Action } from "../../game-base/actions/Action";
import { GameObject } from "../../game-base/gameObjects/GameObject";

@Interface
export abstract class Hide {
    public abstract hide(): ActionResult | undefined;
}

/**
 * Action used to hide in items
 */
export class HideAction extends Action {
    // Alias used to find the item
    public static readonly Alias: string = "hide";

    // Create new instance of the action
    public constructor() {
        super(HideAction.Alias, true);
    }

    // Name used for buttons
    public name(): string {
        return "Hide";
    }

    /**
     * Execute the HideAction
     *
     * @param _alias Alias of the Action
     * @param gameObjects Array of the GameObjects selected
     * @returns gameObject.hide()
     */
    public execute(_alias: string, gameObjects: GameObject[]): ActionResult | undefined {
        const gameObject: GameObject = gameObjects[0];

        if (gameObject.instanceOf(Hide)) {
            return gameObject.hide();
        }
        else {
            return undefined;
        }
    }
}
