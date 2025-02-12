import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { Action } from "../../game-base/actions/Action";
import { GameObject } from "../../game-base/gameObjects/GameObject";

@Interface
export abstract class GoTo {
    public abstract goto(): ActionResult | undefined;
}

export class GoToAction extends Action {
    public static readonly Alias: string = "go to";

    public constructor() {
        super(GoToAction.Alias, true);
    }

    public name(): string {
        return "Go to";
    }

    public execute(_alias: string, gameObjects: GameObject[]): ActionResult | undefined {
        const gameObject: GameObject = gameObjects[0];

        if (gameObject.instanceOf(GoTo)) {
            return gameObject.goto();
        }
    }
}
