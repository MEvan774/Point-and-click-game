import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { Examine } from "../../game-base/actions/ExamineAction";
import { Item } from "../../game-base/gameObjects/Item";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { GoTo } from "../actions/GoToAction";
import { gameService } from "../../global";
import { HallwayRoom } from "../rooms/HallwayRoom";
import { Room } from "../../game-base/gameObjects/Room";

export class DoorBedroomItem extends Item implements Examine, GoTo {
    public static readonly Alias: string = "hallway-door";

    public constructor() {
        super(DoorBedroomItem.Alias);
    }

    public name(): string {
        return "Hallway";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["This door leads to the hallway."]);
    }

    public goto(): ActionResult | undefined {
        if (!gameService.getPlayerSession().pickedUpKey && !gameService.getPlayerSession().walkedToBathtub) {
            return new TextActionResult(["The door is locked, maybe there is a key nearby."]);
        }
        else {
            const room: Room = new HallwayRoom();
            gameService.getPlayerSession().currentRoom = room.alias;
            return room.examine();
        }
    }
}
