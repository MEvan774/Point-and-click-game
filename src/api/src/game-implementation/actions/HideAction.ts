import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { Action } from "../../game-base/actions/Action";
import { GameObject } from "../../game-base/gameObjects/GameObject";

@Interface
export abstract class Hide {
    public abstract hide(): ActionResult | undefined;
}

export class HideAction extends Action {
    public static readonly Alias: string = "hide";

    public constructor() {
        super(HideAction.Alias, true);
    }

    public name(): string {
        return "Hide";
    }

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
