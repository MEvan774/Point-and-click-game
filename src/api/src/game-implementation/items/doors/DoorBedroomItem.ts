import { ActionResult } from "../../../game-base/actionResults/ActionResult";
import { Examine } from "../../../game-base/actions/ExamineAction";
import { Item } from "../../../game-base/gameObjects/Item";
import { TextActionResult } from "../../../game-base/actionResults/TextActionResult";
import { GoTo } from "../../actions/GoToAction";
import { gameService } from "../../../global";
import { HallwayRoom } from "../../rooms/HallwayRoom";
import { Room } from "../../../game-base/gameObjects/Room";
import { ActionTypes } from "../../../game-base/enums/ActionAlias";
import { Timer } from "../../../game-base/timer/Timer";

export class DoorBedroomItem extends Item implements Examine, GoTo {
    public static readonly Alias: string = "hallway-door";
    /**
     * @param _action determines which action will be executed when clicked on.
     * @param _position determines where the hitbox will be located.
     * @param _size determines the size of the hibox
     * @param _isDebugHitboxVisible if true, makes the hitbox visible, false invisible.
     * @param validActions the options that will show up when clicked on.
     */
    public _action: ActionTypes = ActionTypes.Examine;
    public _position: Vector2 = { x: -96, y: 162 };
    public _size: Vector2 = { x: 204, y: 275 };
    public _isDebugHitboxVisible: boolean = false;

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
        new Timer();

        if (!gameService.getPlayerSession().inventory.includes("KeyItem")) {
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

    public startTimer(): void {
        new Timer(); // This will instantiate Timer
    }
}
