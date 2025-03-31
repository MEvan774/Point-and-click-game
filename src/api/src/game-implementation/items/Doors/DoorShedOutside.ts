import { ActionResult } from "../../../game-base/actionResults/ActionResult";
import { Examine } from "../../../game-base/actions/ExamineAction";
import { Item } from "../../../game-base/gameObjects/Item";
import { TextActionResult } from "../../../game-base/actionResults/TextActionResult";
import { GoTo } from "../../actions/GoToAction";
import { Room } from "../../../game-base/gameObjects/Room";
import { OutsideRoom } from "../../rooms/OutsideRoom";
import { gameService } from "../../../global";
import { Timer } from "../../../game-base/timer/Timer";

export class DoorOutsideShed extends Item implements Examine, GoTo {
    public static readonly Alias: string = "Shed Outside room";

    public constructor() {
        super(DoorOutsideShed.Alias, ["examine", "goto"]);
    }

    public name(): string {
        return "Outside";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["The door leads you back outside."]);
    }

    public goto(): ActionResult | undefined {
        new Timer();

        const room: Room = new OutsideRoom();

        gameService.getPlayerSession().currentRoom = room.alias;
        return room.examine();
    }

    public startTimer(): void {
        new Timer(); // This will instantiate Timer
    }
}
