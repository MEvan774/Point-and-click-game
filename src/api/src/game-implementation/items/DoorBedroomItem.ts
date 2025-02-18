import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { Examine } from "../../game-base/actions/ExamineAction";
import { Item } from "../../game-base/gameObjects/Item";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Open } from "../actions/OpenAction";

export class DoorBedroomItem extends Item implements Examine, Open {
    public static readonly Alias: string = "bedroom-door";

    public constructor() {
        super(DoorBedroomItem.Alias);
    }

    public name(): string {
        return "bathtub";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["There seems to be a key inside the bathtub."]);
    }

    public open(): ActionResult | undefined {
        return new TextActionResult(["The door is locked, maybe there is a key nearby."]);
    }
}
