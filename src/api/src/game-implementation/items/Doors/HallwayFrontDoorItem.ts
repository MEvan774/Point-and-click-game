import { ActionResult } from "../../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../../game-base/actionResults/TextActionResult";
import { Examine } from "../../../game-base/actions/ExamineAction";
import { ActionTypes } from "../../../game-base/enums/ActionAlias";
import { Item } from "../../../game-base/gameObjects/Item";
import { Room } from "../../../game-base/gameObjects/Room";
import { gameService } from "../../../global";
import { GoTo } from "../../actions/GoToAction";
import { FrontDoorRoom } from "../../rooms/FrontDoorRoom";

/**
 * Base class used to represent an item
 */
export class HallwayFrontDoorItem extends Item implements Examine, GoTo {
    public static readonly Alias: string = "StairToFrontDoor";
    /**
     * @_action determines which action will be executed when clicked on.
     * @_position determines where the hitbox will be located.
     * @_size determines the size of the hibox
     * @_isDebugHitboxVisible if true, makes the hitbox visible, false invisible.
     * @validActions the options that will show up when clicked on.
     */
    public _action: ActionTypes = ActionTypes.Examine;
    public _position: Vector2 = { x: -90, y: 150 };
    public _size: Vector2 = { x: 180, y: 200 };
    public static readonly validActions: string[] = [ActionTypes.GoTo];

    /**
     * Create a new instance of this item
     *
     * @param alias Alias of this item
     */
    public constructor() {
        super(HallwayFrontDoorItem.Alias, HallwayFrontDoorItem.validActions);
    }

    public name(): string {
        return "Downstairs";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["I can go downstairs to the front door here."]);
    }

    public goto(): ActionResult | undefined {
        const room: Room = new FrontDoorRoom();

        gameService.getPlayerSession().currentRoom = room.alias;
        return room.examine();
    }
}
