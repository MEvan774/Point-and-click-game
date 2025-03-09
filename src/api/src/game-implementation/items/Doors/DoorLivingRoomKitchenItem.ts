import { ActionResult } from "../../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../../game-base/actionResults/TextActionResult";
import { Examine } from "../../../game-base/actions/ExamineAction";
import { Item } from "../../../game-base/gameObjects/Item";
import { Room } from "../../../game-base/gameObjects/Room";
import { gameService } from "../../../global";
import { GoTo } from "../../actions/GoToAction";
import { KitchenRoom } from "../../rooms/KitchenRoom";

/**
 * Base class used to represent an item
 */
export class DoorLivingRoomKitchenItem extends Item implements Examine, GoTo {
    public static readonly Alias: string = "LivingToKitchenDoor";

    public static readonly validActions: string[] = ["examine", "go to"];

    /**
     * Create a new instance of this item
     *
     * @param alias Alias of this item
     */
    public constructor() {
        super(DoorLivingRoomKitchenItem.Alias, DoorLivingRoomKitchenItem.validActions);
    }
    // Name of the item, shows up on the buttons for example

    public name(): string {
        return "Kitchen";
    }

    /**
     * Tells about where the door leads to
     *
     * @returns TextActionResult with information about the item
     */
    public examine(): ActionResult | undefined {
        return new TextActionResult(["There is blood on the door...",
            "I'm not sure if i want to see whats behind there."]);
    }

    /**
     * Go to the KitchenRoom and examines this room
     *
     * @returns room.examine() for the KitchenRoom
     */
    public goto(): ActionResult | undefined {
        const livingRoom: Room = new KitchenRoom();

        gameService.getPlayerSession().currentRoom = livingRoom.alias;
        return livingRoom.examine();
    }
}
