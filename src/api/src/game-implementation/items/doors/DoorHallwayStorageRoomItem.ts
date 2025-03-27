import { ActionResult } from "../../../game-base/actionResults/ActionResult";
import { Examine } from "../../../game-base/actions/ExamineAction";
import { Item } from "../../../game-base/gameObjects/Item";
import { TextActionResult } from "../../../game-base/actionResults/TextActionResult";
import { GoTo } from "../../actions/GoToAction";
import { gameService } from "../../../global";
import { Room } from "../../../game-base/gameObjects/Room";
import { StorageRoom } from "../../rooms/StorageRoom";
import { ActionTypes } from "../../../game-base/enums/ActionAlias";

export class DoorHallwayStorageRoomItem extends Item implements Examine, GoTo {
    public static readonly Alias: string = "hallway-storageroom-door";
    /**
     * @_action determines which action will be executed when clicked on.
     * @_position determines where the hitbox will be located.
     * @_size determines the size of the hibox
     * @_isDebugHitboxVisible if true, makes the hitbox visible, false invisible.
     * @validActions the options that will show up when clicked on.
     */
    public _action: ActionTypes = ActionTypes.Examine;
    public _position: Vector2 = { x: 100, y: 200 };
    public _size: Vector2 = { x: 90, y: 270 };
    public static readonly validActions: string[] = [ActionTypes.GoTo];

    public constructor() {
        super(DoorHallwayStorageRoomItem.Alias, DoorHallwayStorageRoomItem.validActions);
    }

    public name(): string {
        return "Storage Room";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["The door leads to the storage room."]);
    }

    public goto(): ActionResult | undefined {
        const room: Room = new StorageRoom();

        gameService.getPlayerSession().currentRoom = room.alias;
        return room.examine();
    }
}
