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

    // Shows the name of the room
    public name(): string {
        return "Hallway";
    }

    /**
     * Tell the player where this door leads to.
     * @returns TextActionResult with information about the "item".
     */
    public examine(): ActionResult | undefined {
        return new TextActionResult(["This door leads to the hallway."]);
    }

    /**
     * Go to the HallwayRoom after all the checks are "true". Else stay in the same room.
     * @returns room.examine() for the HallwayRoom
     */
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
