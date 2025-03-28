import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { Action } from "../../game-base/actions/Action";
import { GameObject } from "../../game-base/gameObjects/GameObject";

@Interface
export abstract class Taste {
    public abstract taste(): ActionResult | undefined;
}

export class TasteAction extends Action {
    public static readonly Alias: string = "taste";

    public constructor() {
        super(TasteAction.Alias, true);
    }

    public name(): string {
        return "Taste the stew?";
    }

    public execute(_alias: string, gameObjects: GameObject[]): ActionResult | undefined {
        const gameObject: GameObject = gameObjects[0];

        if (gameObject.instanceOf(Taste)) {
            return gameObject.taste();
        }
        else {
            return undefined;
        }
    }
}
