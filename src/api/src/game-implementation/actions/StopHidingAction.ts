import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { Action } from "../../game-base/actions/Action";
import { GameObject } from "../../game-base/gameObjects/GameObject";

@Interface
export abstract class StopHiding {
    public abstract stopHiding(): ActionResult | undefined;
}

export class StopHidingAction extends Action {
    public static readonly Alias: string = "stop hiding";

    public constructor() {
        super(StopHidingAction.Alias, true);
    }

    public name(): string {
        return "Stop hiding";
    }

    public execute(_alias: string, gameObjects: GameObject[]): ActionResult | undefined {
        const gameObject: GameObject = gameObjects[0];

        if (gameObject.instanceOf(StopHiding)) {
            return gameObject.stopHiding();
        }
        else {
            return undefined;
        }
    }
}
