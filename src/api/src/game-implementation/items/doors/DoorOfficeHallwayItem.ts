import { Item } from "../../../game-base/gameObjects/Item";
import { Examine } from "../../../game-base/actions/ExamineAction";
import { ActionResult } from "../../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../../game-base/actionResults/TextActionResult";
import { GoTo } from "../../actions/GoToAction";
import { gameService } from "../../../global";
import { Room } from "../../../game-base/gameObjects/Room";
import { HallwayRoom } from "../../rooms/HallwayRoom";
import { ActionTypes } from "../../../game-base/enums/ActionAlias";
import { Timer } from "../../../game-base/timer/Timer";
/**
 * A class for a door leading from the office to the hallway
 */
export class DoorOfficeHallwayItem extends Item implements Examine, GoTo {
    public static readonly Alias: string = "office-hallway-door";
    /**
     * @_action determines which action will be executed when clicked on.
     * @_position determines where the hitbox will be located.
     * @_size determines the size of the hibox
     * @_isDebugHitboxVisible if true, makes the hitbox visible, false invisible.
     * @validActions the options that will show up when clicked on.
     */
    public _position: Vector2 = { x: -509, y: 530 };
    public _size: Vector2 = { x: 1020, y: 100 };
    public _isDebugHitboxVisible: boolean = false;
    public _action: ActionTypes = ActionTypes.Examine;
    public static readonly validActions: string[] = ["go to"];

    public constructor() {
        super(DoorOfficeHallwayItem.Alias, DoorOfficeHallwayItem.validActions);
    }

    public name(): string {
        return "Hallway";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["This door leads back to the hallway."]);
    }

    public goto(): ActionResult | undefined {
        new Timer();

        const room: Room = new HallwayRoom();

        gameService.getPlayerSession().currentRoom = room.alias;
        return room.examine();
    }

    public startTimer(): void {
        new Timer(); // This will instantiate Timer
    }
}
