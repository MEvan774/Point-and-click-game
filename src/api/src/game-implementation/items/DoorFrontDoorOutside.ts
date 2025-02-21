import { Item } from "../../game-base/gameObjects/Item";
import { Examine } from "../../game-base/actions/ExamineAction";
import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { GoTo } from "../actions/GoToAction";
import { StartupRoom } from "../rooms/StartupRoom";
import { gameService } from "../../global";
import { Room } from "../../game-base/gameObjects/Room";

export class DoorFrontDoorOutsideItem extends Item implements Examine, GoTo {
    public static readonly Alias: string = "DoorFrontDoorOutsideItem";

    public constructor() {
        super(DoorFrontDoorOutsideItem.Alias);
    }

    public name(): string {
        return "Outside";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "This is the door to get outside.",
            "It is locked.",
            "Seems like you need a key and something to get the planks of the door.",
        ]);
    }

    public goto(): ActionResult | undefined {
        // Set a if statemenet if player doesnt have the key or other item.
        return new TextActionResult([
            "Its locked, i should find a key.",
        ]);
        const startupRoom: Room = new StartupRoom();

        gameService.getPlayerSession().currentRoom = startupRoom.alias;
        return undefined;
    }
}
