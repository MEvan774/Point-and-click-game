import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { Action } from "../../game-base/actions/Action";
import { GameObject } from "../../game-base/gameObjects/GameObject";

@Interface
export abstract class Press {
    public abstract press(): ActionResult | undefined;
}

export class PressAction extends Action {
    public static readonly Alias: string = "Press";

    public constructor() {
        super(PressAction.Alias, true);
    }

    public name(): string {
        return "Press";
    }

    public execute(_alias: string, gameObjects: GameObject[]): ActionResult | undefined {
        const gameObject: GameObject = gameObjects[0];
        if (gameObject.instanceOf(Press)) {
            return gameObject.press();
        }
        else {
            return undefined;
        }
    }
}
