import { ActionResult } from "../../../game-base/actionResults/ActionResult";
import { Examine } from "../../../game-base/actions/ExamineAction";
import { Item } from "../../../game-base/gameObjects/Item";
import { TextActionResult } from "../../../game-base/actionResults/TextActionResult";
import { GoTo } from "../../actions/GoToAction";
import { gameService } from "../../../global";
import { Room } from "../../../game-base/gameObjects/Room";
import { BathroomRoom } from "../../rooms/Bathroomroom";
import { ActionTypes } from "../../../game-base/enums/ActionAlias";
import { Timer } from "../../../game-base/timer/Timer";

export class DoorBedroomBathroomItem extends Item implements Examine, GoTo {
    public static readonly Alias: string = "bathroom-door";
    /**
     * @param _action determines which action will be executed when clicked on.
     * @param _position determines where the hitbox will be located.
     * @param _size determines the size of the hitbox
     * @param _isDebugHitboxVisible if true, makes the hitbox visible, false invisible.
     * @param validActions the options that will show up when clicked on.
     */
    public _action: ActionTypes = ActionTypes.Examine;
    public _position: Vector2 = { x: 323, y: 174 };
    public _size: Vector2 = { x: 100, y: 307 };
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
        // Start the timer
        new Timer();

        const room: Room = new BathroomRoom();
        gameService.getPlayerSession().currentRoom = room.alias;
        return room.examine();
    }

    public startTimer(): void {
        new Timer(); // This will instantiate Timer
    }
}
