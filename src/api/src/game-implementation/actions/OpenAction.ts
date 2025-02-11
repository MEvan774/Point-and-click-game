import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { Action } from "../../game-base/actions/Action";
import { GameObject } from "../../game-base/gameObjects/GameObject";

@Interface
export abstract class Open {
    public abstract open(): ActionResult | undefined;
}

export class OpenAction extends Action {
    public static readonly Alias: string = "open";

    public constructor() {
        super(OpenAction.Alias, true);
    }

    public name(): string {
        return "Open";
    }

    public execute(_alias: string, _gameObjects: GameObject[]): ActionResult | undefined {
        return undefined;
    }
}
