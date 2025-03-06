import { Item } from "../../game-base/gameObjects/Item";
import { Examine } from "../../game-base/actions/ExamineAction";
import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { ActionTypes } from "../../game-base/enums/ActionAlias";
import { Room } from "../../game-base/gameObjects/Room";
import { StorageRoom } from "../rooms/StorageRoom";
import { gameService } from "../../global";
import { StopHiding } from "../actions/StopHidingAction";

export class StopHidingItem extends Item implements Examine, StopHiding {
    public static readonly Alias: string = "StopHidingItem";

    public _position: Vector2 = { x: -110, y: 139 };
    public _size: Vector2 = { x: 190, y: 245 };
    public _isDebugHitboxVisible: boolean = true;
    public _action: ActionTypes = ActionTypes.Examine;
    public static readonly validActions: string[] = ["stop hiding"];

    public constructor() {
        super(StopHidingItem.Alias, StopHidingItem.validActions);
    }

    public name(): string {
        return "Stop hiding";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "Want to stop hiding?",
        ]);
    }

    public stopHiding(): ActionResult | undefined {
        if (gameService.getPlayerSession().hiddenIn === "StorageRoom") {
            const room: Room = new StorageRoom();

            gameService.getPlayerSession().currentRoom = room.alias;
            return room.examine();
        }
        return;
    }
}
