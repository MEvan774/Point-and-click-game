import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { Action } from "../../game-base/actions/Action";
import { GameObject } from "../../game-base/gameObjects/GameObject";

@Interface
export abstract class GoToStartup {
    public abstract gotostartup(): ActionResult | undefined;
}

/**
 * Action used to go to objects or rooms
 */
export class GoToStartupAction extends Action {
    // Alias used to find the item
    public static readonly Alias: string = "go to startup";

    // Create new instance of the action
    public constructor() {
        super(GoToStartupAction.Alias, true);
    }

    // Name used for buttons
    public name(): string {
        return "Go to startup";
    }

    /**
     * Execute the GoTo Action
     *
     * @param _alias Alias of the Action
     * @param gameObjects Array of the GameObjects selected
     * @returns gameObject.goto()
     */
    public execute(_alias: string, gameObjects: GameObject[]): ActionResult | undefined {
        const gameObject: GameObject = gameObjects[0];

        if (gameObject.instanceOf(GoToStartup)) {
            return gameObject.gotostartup();
        }

        return undefined;
    }
}
