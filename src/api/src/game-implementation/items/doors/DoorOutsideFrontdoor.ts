import { ActionResult } from "../../../game-base/actionResults/ActionResult";
import { Examine } from "../../../game-base/actions/ExamineAction";
import { Item } from "../../../game-base/gameObjects/Item";
import { TextActionResult } from "../../../game-base/actionResults/TextActionResult";
import { GoTo } from "../../actions/GoToAction";
import { FrontDoorRoom } from "../../rooms/FrontDoorRoom";
import { Room } from "../../../game-base/gameObjects/Room";
import { gameService } from "../../../global";
import { ActionTypes } from "../../../game-base/enums/ActionAlias";
import { Timer } from "../../../game-base/timer/Timer";

export class DoorOutsideFrontdoor extends Item implements Examine, GoTo {
    public static readonly Alias: string = "Outside Frontdoor room";
    /**
         * @param _action determines which action will be executed when clicked on.
         * @param _position determines where the hitbox will be located.
         * @param _size determines the size of the hibox
         * @param _isDebugHitboxVisible if true, makes the hitbox visible, false invisible.
         * @param validActions the options that will show up when clicked on.
         */
    public _position: Vector2 = { x: -509, y: 530 };
    public _size: Vector2 = { x: 1020, y: 100 };
    public _isDebugHitboxVisible: boolean = false;
    public _action: ActionTypes = ActionTypes.Examine;
    public static readonly validActions: string[] = ["go to"];

    public constructor() {
        super(DoorOutsideFrontdoor.Alias, DoorOutsideFrontdoor.validActions);
    }

    public name(): string {
        return "Outside";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["The door leads back to the Front Door Room"]);
    }

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
