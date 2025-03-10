import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { Action } from "../../game-base/actions/Action";
import { GameObject } from "../../game-base/gameObjects/GameObject";

@Interface
export abstract class Open {
    public abstract open(): ActionResult | undefined;
}

/**
 * Action used to open objects
 */
export class OpenAction extends Action {
    // Alias used to find the item
    public static readonly Alias: string = "open";

    // Create new instance of the action
    public constructor() {
        super(OpenAction.Alias, true);
    }

    // Name used for buttons
    public name(): string {
        return "Open";
    }

    /**
     * Execute the OpenAction
     *
     * @param _alias Alias of the Action
     * @param gameObjects Array of the GameObjects selected
     * @returns gameObject.open()
     */
    public execute(_alias: string, gameObjects: GameObject[]): ActionResult | undefined {
        const gameObject: GameObject = gameObjects[0];

        if (gameObject.instanceOf(Open)) {
            return gameObject.open();
        }
        else {
            return undefined;
        }
    }
}
