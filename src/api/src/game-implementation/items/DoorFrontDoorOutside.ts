import { Item } from "../../game-base/gameObjects/Item";
import { Examine } from "../../game-base/actions/ExamineAction";
import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { GoTo } from "../actions/GoToAction";

export class DoorFrontDoorOutsideItem extends Item implements Examine, GoTo {
    public static readonly Alias: string = "DoorFrontDoorOutsideItem";

    public static readonly validActions: string[] = ["examine", "go to"];

    public constructor() {
        super(DoorFrontDoorOutsideItem.Alias, DoorFrontDoorOutsideItem.validActions);
    }

    public name(): string {
        return "Outside";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "This is the door to get outside.",
            "It is locked.",
            "Seems like you need a key and something to get the planks of the door.",
        ]);
    }

    public goto(): ActionResult | undefined {
        return new TextActionResult([
            "Its locked, i should find a key and something to get the planks of the door.",
        ]);
    }
}
