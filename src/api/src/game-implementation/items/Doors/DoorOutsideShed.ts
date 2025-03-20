import { ActionResult } from "../../../game-base/actionResults/ActionResult";
import { Examine } from "../../../game-base/actions/ExamineAction";
import { Item } from "../../../game-base/gameObjects/Item";
import { TextActionResult } from "../../../game-base/actionResults/TextActionResult";
import { ShedRoom } from "../../rooms/ShedRoom";
import { Room } from "../../../game-base/gameObjects/Room";
import { gameService } from "../../../global";
import { ActionTypes } from "../../../game-base/enums/ActionAlias";

export class DoorOutsideShed extends Item implements Examine {
    public static readonly Alias: string = "Outside Shed room";
    /**
             * @param _action determines which action will be executed when clicked on.
             * @param _position determines where the hitbox will be located.
             * @param _size determines the size of the hibox
             * @param _isDebugHitboxVisible if true, makes the hitbox visible, false invisible.
             * @param validActions the options that will show up when clicked on.
             */
    public _position: Vector2 = { x: -375, y: 300 };
    public _size: Vector2 = { x: 100, y: 150 };
    public _isDebugHitboxVisible: boolean = false;
    public _action: ActionTypes = ActionTypes.Examine;
    public static readonly validActions: string[] = ["go to"];

    public constructor() {
        super(DoorOutsideShed.Alias, ["examine"]);
    }

    public name(): string {
        return "Outside";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["The door leads to the shed that's half open."]);
    }

    public goto(): ActionResult | undefined {
        const room: Room = new ShedRoom();

        gameService.getPlayerSession().currentRoom = room.alias;
        return room.examine();
    }
}
