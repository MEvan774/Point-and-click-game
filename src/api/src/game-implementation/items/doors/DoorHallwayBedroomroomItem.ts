import { ActionResult } from "../../../game-base/actionResults/ActionResult";
import { Examine } from "../../../game-base/actions/ExamineAction";
import { Item } from "../../../game-base/gameObjects/Item";
import { TextActionResult } from "../../../game-base/actionResults/TextActionResult";
import { GoTo } from "../../actions/GoToAction";
import { gameService } from "../../../global";
import { Room } from "../../../game-base/gameObjects/Room";
import { BedroomRoom } from "../../rooms/BedroomRoom";
import { ActionTypes } from "../../../game-base/enums/ActionAlias";
import { Timer } from "../../../game-base/timer/Timer";

export class DoorHallwayBedroomItem extends Item implements Examine, GoTo {
    public static readonly Alias: string = "hallway-bedroom-door";
    /**
     * @param _action determines which action will be executed when clicked on.
     * @param _position determines where the hitbox will be located.
     * @param _size determines the size of the hibox
     * @param _isDebugHitboxVisible if true, makes the hitbox visible, false invisible.
     * @param validActions the options that will show up when clicked on.
     */
    public _action: ActionTypes = ActionTypes.Examine;
    public _position: Vector2 = { x: -500, y: 500 };
    public _size: Vector2 = { x: 1000, y: 200 };
    public _isDebugHitboxVisible: boolean = false;
    public static readonly validActions: string[] = [ActionTypes.GoTo];

    public constructor() {
        super(DoorHallwayBedroomItem.Alias, DoorHallwayBedroomItem.validActions);
    }

    public name(): string {
        return "Bedroom";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["The door leads to the bedroom."]);
    }

    public goto(): ActionResult | undefined {
        new Timer();

        const room: Room = new BedroomRoom();

        gameService.getPlayerSession().currentRoom = room.alias;
        return room.examine();
    }

    public startTimer(): void {
        new Timer(); // This will instantiate Timer
    }
}
