import { Item } from "../../game-base/gameObjects/Item";
import { Examine } from "../../game-base/actions/ExamineAction";
import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { GoTo } from "../actions/GoToAction";
import { StartupRoom } from "../rooms/StartupRoom";
import { gameService } from "../../global";
import { Room } from "../../game-base/gameObjects/Room";
import { ActionTypes } from "../../game-base/enums/ActionAlias";

export class StairsDownStairsItem extends Item implements Examine, GoTo {
    public static readonly Alias: string = "StairsDownStairsItem";

    public _position: Vector2 = { x: 0, y: 0 };
    public _size: Vector2 = { x: 155, y: 245 };
    public _isDebugHitboxVisible: boolean = true;
    public _action: ActionTypes = ActionTypes.Examine;

    public static readonly validActions: string[] = ["go to"];

    public constructor() {
        super(StairsDownStairsItem.Alias, StairsDownStairsItem.validActions);
    }

    public name(): string {
        return "Stairs";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "The stairs to go upstairs.",
        ]);
    }

    public goto(): ActionResult | undefined {
        const startupRoom: Room = new StartupRoom();

        gameService.getPlayerSession().currentRoom = startupRoom.alias;
        return undefined;
    }
}
