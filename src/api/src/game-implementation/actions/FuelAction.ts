import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { Action } from "../../game-base/actions/Action";
import { GameObject } from "../../game-base/gameObjects/GameObject";

@Interface
export abstract class Fuel {
    public abstract fuel(): ActionResult | undefined;
}

export class FuelAction extends Action {
    public static readonly Alias: string = "fuel";

    public constructor() {
        super(FuelAction.Alias, true);
    }

    public name(): string {
        return "Fuel";
    }

    public execute(_alias: string, gameObjects: GameObject[]): ActionResult | undefined {
        const gameObject: GameObject = gameObjects[0];
        if (gameObject.instanceOf(Fuel)) {
            return gameObject.fuel();
        }
        else {
            return undefined;
        }
    }
}
