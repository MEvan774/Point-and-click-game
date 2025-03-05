import { Item } from "../../game-base/gameObjects/Item";
import { Examine } from "../../game-base/actions/ExamineAction";
import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { GoTo } from "../actions/GoToAction";
import { ActionTypes } from "../../game-base/enums/ActionAlias";

export class DoorFrontDoorOutsideItem extends Item implements Examine, GoTo {
    public static readonly Alias: string = "DoorFrontDoorOutsideItem";

    public _position: Vector2 = { x: -110, y: 139 };
    public _size: Vector2 = { x: 190, y: 245 };
    public _isDebugHitboxVisible: boolean = false;
    public _action: ActionTypes = ActionTypes.Examine;
    public static readonly validActions: string[] = ["go to"];

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
