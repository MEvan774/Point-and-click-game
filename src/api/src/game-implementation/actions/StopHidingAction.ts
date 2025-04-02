import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { Action } from "../../game-base/actions/Action";
import { GameObject } from "../../game-base/gameObjects/GameObject";
import { gameService } from "../../global";
import { PlayerSession } from "../types";

@Interface
export abstract class StopHiding {
    public abstract stopHiding(): ActionResult | undefined;
}

/**
 * Action used to stop hiding
 */
export class StopHidingAction extends Action {
    // Alias used to find the item
    public static readonly Alias: string = "stop hiding";

    // Create new instance of the action
    public constructor() {
        super(StopHidingAction.Alias, true);
    }

    // Name used for buttons
    public name(): string {
        return "Stop hiding";
    }

    /**
     * Execute the StopHidingAction
     *
     * @param _alias Alias of the Action
     * @param gameObjects Array of the GameObjects selected
     * @returns gameObject.stopHiding()
     */
    public execute(_alias: string, gameObjects: GameObject[]): ActionResult | undefined {
        const playerSession: PlayerSession = gameService.getPlayerSession();
        playerSession.playerIsHiding = false;
        const gameObject: GameObject = gameObjects[0];

        if (gameObject.instanceOf(StopHiding)) {
            return gameObject.stopHiding();
        }
        else {
            return undefined;
        }
    }
}
