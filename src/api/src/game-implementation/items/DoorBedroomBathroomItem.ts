import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { Examine } from "../../game-base/actions/ExamineAction";
import { Item } from "../../game-base/gameObjects/Item";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { GoTo } from "../actions/GoToAction";
import { gameService } from "../../global";
import { Room } from "../../game-base/gameObjects/Room";
import { BathroomRoom } from "../rooms/Bathroomroom";
import { ActionTypes } from "../../game-base/enums/ActionAlias";

export class DoorBedroomBathroomItem extends Item implements Examine, GoTo {
    public static readonly Alias: string = "bathroom-door";
    public _action: ActionTypes = ActionTypes.Examine;
    public _position: Vector2 = { x: 100, y: 200 };
    public _size: Vector2 = { x: 200, y: 200 };
    public static readonly validActions: string[] = ["examine", "go to"];
    public _isDebugHitboxVisible: boolean = true;

    public constructor() {
        super(DoorBedroomBathroomItem.Alias, DoorBedroomBathroomItem.validActions);
    }

    public name(): string {
        return "Bathroom";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["The door leads to a bathroom"]);
    }

    public goto(): ActionResult | undefined {
        const room: Room = new BathroomRoom();

        gameService.getPlayerSession().currentRoom = room.alias;
        return room.examine();
    }
}
