import { ActionResult } from "../../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../../game-base/actionResults/TextActionResult";
import { Examine } from "../../../game-base/actions/ExamineAction";
import { ActionTypes } from "../../../game-base/enums/ActionAlias";
import { Item } from "../../../game-base/gameObjects/Item";
import { Room } from "../../../game-base/gameObjects/Room";
import { Timer } from "../../../game-base/timer/Timer";
import { gameService } from "../../../global";
import { GoTo } from "../../actions/GoToAction";
import { FrontDoorRoom } from "../../rooms/FrontDoorRoom";

export class DoorLivingRoomFrontDoorItem extends Item implements Examine, GoTo {
    public static readonly Alias: string = "DoorLivingRoomFrontDoorItem";

    /**
         * @param _action determines which action will be executed when clicked on.
         * @param _position determines where the hitbox will be located.
         * @param _size determines the size of the hibox
         * @param _isDebugHitboxVisible if true, makes the hitbox visible, false invisible.
         * @param validActions the options that will show up when clicked on.
         */
    public _action: ActionTypes = ActionTypes.Examine;
    public _position: Vector2 = { x: 360, y: 100 };
    public _size: Vector2 = { x: 180, y: 560 };
    public static readonly validActions: string[] = [ActionTypes.GoTo];
    public _isDebugHitboxVisible: boolean = false;

    /**
     * Create a new instance of this item
     *
     * @param alias Alias of this item
     */
    public constructor() {
        super(DoorLivingRoomFrontDoorItem.Alias, DoorLivingRoomFrontDoorItem.validActions);
    }

    // Name of the item, shows up on the buttons for example
    public name(): string {
        return "Front door";
    }

    /**
     * Tells about where the door leads to
     *
     * @returns TextActionResult with information about the item
     */
    public examine(): ActionResult | undefined {
        return new TextActionResult(["This door leads to the front door."]);
    }

    /**
     * Go to the FrontDoorRoom and examines this room
     *
     * @returns room.examine() for the FrontDoorRoom
     */
    public goto(): ActionResult | undefined {
        new Timer();

        const room: Room = new FrontDoorRoom();

        gameService.getPlayerSession().currentRoom = room.alias;
        return room.examine();
    }

    public startTimer(): void {
        new Timer(); // This will instantiate Timer
    }
}
