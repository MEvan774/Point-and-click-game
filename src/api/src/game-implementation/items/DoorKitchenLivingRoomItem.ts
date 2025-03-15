import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Examine } from "../../game-base/actions/ExamineAction";
import { ActionTypes } from "../../game-base/enums/ActionAlias";
import { Item } from "../../game-base/gameObjects/Item";
import { Room } from "../../game-base/gameObjects/Room";
import { gameService } from "../../global";
import { GoTo } from "../actions/GoToAction";
import { LivingRoom } from "../rooms/LivingRoom";

/**
 * Base class used to represent an item
 */
export class DoorKitchenLivingRoomItem extends Item implements Examine, GoTo {
    public static readonly Alias: string = "KitchenToLivingRoomDoor";

    public _action: ActionTypes = ActionTypes.Examine;
    public _position: Vector2 = { x: -500, y: 500 };
    public _size: Vector2 = { x: 1000, y: 50 };
    public static readonly validActions: string[] = [ActionTypes.Examine, ActionTypes.GoTo];
    public _isDebugHitboxVisible: boolean = false;
    /**
     * Create a new instance of this item
     *
     * @param alias Alias of this item
     */
    public constructor() {
        super(DoorKitchenLivingRoomItem.Alias, DoorKitchenLivingRoomItem.validActions);
    }

    public name(): string {
        return "Livingroom";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["I should head out!"]);
    }

    public goto(): ActionResult | undefined {
        const livingRoom: Room = new LivingRoom();

        gameService.getPlayerSession().currentRoom = livingRoom.alias;
        return livingRoom.examine();
    }
}
