import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { Action } from "../../game-base/actions/Action";
import { GameObject } from "../../game-base/gameObjects/GameObject";

@Interface
export abstract class Drive {
    public abstract drive(): ActionResult | undefined;
}

export class DriveAction extends Action {
    public static readonly Alias: string = "drive";

    public constructor() {
        super(DriveAction.Alias, true);
    }

    public name(): string {
        return "Drive";
    }

    public execute(_alias: string, gameObjects: GameObject[]): ActionResult | undefined {
        const gameObject: GameObject = gameObjects[0];
        if (gameObject.instanceOf(Drive)) {
            return gameObject.drive();
        }
        else {
            return undefined;
        }
    }
}
