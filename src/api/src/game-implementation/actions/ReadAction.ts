import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { Action } from "../../game-base/actions/Action";
import { GameObject } from "../../game-base/gameObjects/GameObject";

@Interface
export abstract class Read {
    public abstract read(): ActionResult | undefined;
}

export class ReadAction extends Action {
    public static readonly Alias: string = "read";

    public constructor() {
        super(ReadAction.Alias, true);
    }

    public name(): string {
        return "Read";
    }

    public execute(_alias: string, gameObjects: GameObject[]): ActionResult | undefined {
        const gameObject: GameObject = gameObjects[0];

        if (gameObject.instanceOf(Read)) {
            return gameObject.read();
        }
        else {
            return undefined;
        }
    }
}
