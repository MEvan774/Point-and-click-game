import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { Examine } from "../../game-base/actions/ExamineAction";
import { Item } from "../../game-base/gameObjects/Item";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { GoTo } from "../actions/GoToAction";
import { gameService } from "../../global";
import { Room } from "../../game-base/gameObjects/Room";
import { StorageRoom } from "../rooms/StorageRoom";

export class DoorHallwayStorageRoomItem extends Item implements Examine, GoTo {
    public static readonly Alias: string = "hallway-storageroom-door";

    public constructor() {
        super(DoorHallwayStorageRoomItem.Alias);
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
