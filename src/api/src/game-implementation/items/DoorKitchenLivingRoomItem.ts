import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Examine } from "../../game-base/actions/ExamineAction";
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

    public static readonly validActions: string[] = ["examine", "go to"];

    /**
     * Create a new instance of this item
     *
     * @param alias Alias of this item
     */
    public constructor() {
        super(DoorKitchenLivingRoomItem.Alias, DoorKitchenLivingRoomItem.validActions);
    }

    // Name of the item, shows up on the buttons for example
    public name(): string {
        return "Livingroom";
    }

    /**
     * Tells about where the door leads to
     *
     * @returns TextActionResult with information about the item
     */
    public examine(): ActionResult | undefined {
        return new TextActionResult(["I should head out!"]);
    }

    /**
     * Go to the HallwayRoom and examines this room
     *
     * @returns room.examine() for the HallwayRoom
     */
    public goto(): ActionResult | undefined {
        const livingRoom: Room = new LivingRoom();

        gameService.getPlayerSession().currentRoom = livingRoom.alias;
        return livingRoom.examine();
    }
}
