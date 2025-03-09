import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { Examine } from "../../game-base/actions/ExamineAction";
import { Item } from "../../game-base/gameObjects/Item";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { GoTo } from "../actions/GoToAction";
import { gameService } from "../../global";
import { HallwayRoom } from "../rooms/HallwayRoom";
import { Room } from "../../game-base/gameObjects/Room";
import { ActionTypes } from "../../game-base/enums/ActionAlias";

export class DoorBedroomItem extends Item implements Examine, GoTo {
    public static readonly Alias: string = "hallway-door";
    public _action: ActionTypes = ActionTypes.Examine;
    public _position: Vector2 = { x: -96, y: 112 };
    public _size: Vector2 = { x: 205, y: 275 };
    public _isDebugHitboxVisible: boolean = true;

    public static readonly validActions: string[] = [ActionTypes.GoTo];

    public constructor() {
        super(DoorBedroomItem.Alias, DoorBedroomItem.validActions);
    }

    public name(): string {
        return "Hallway";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["This door leads to the hallway."]);
    }

    public goto(): ActionResult | undefined {
        if (!gameService.getPlayerSession().pickedUpKey) {
            return new TextActionResult(["The door is locked, maybe there is a key nearby."]);
        }
        else if (gameService.getPlayerSession().selectedItem !== "KeyItem") {
            return new TextActionResult(["I should use the key I found."]);
        }
        else {
            const room: Room = new HallwayRoom();
            gameService.getPlayerSession().currentRoom = room.alias;
            return room.examine();
        }
    }
}
