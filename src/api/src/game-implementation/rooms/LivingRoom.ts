import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Action } from "../../game-base/actions/Action";
import { ExamineAction } from "../../game-base/actions/ExamineAction";
import { GameObject } from "../../game-base/gameObjects/GameObject";
import { Room } from "../../game-base/gameObjects/Room";
import { gameService } from "../../global";
import { GoToAction } from "../actions/GoToAction";
import { DoorLivingRoomFrontDoorItem } from "../items/DoorLivingRoomFrontDoorItem";
import { DoorLivingRoomKitchenItem } from "../items/DoorLivingRoomKitchenItem";
import { HallwayRoom } from "./HallwayRoom";
import { KitchenRoom } from "./KitchenRoom";

/**
 * Implemention of the startup room
 *
 * @remarks Used as the first room for new player sessions.
 */
export class LivingRoom extends Room {
    /** Alias of this room */
    public static readonly Alias: string = "livingRoom";

    /**
     * Create a new instance of this room
     */
    public constructor() {
        super(LivingRoom.Alias);
    }

    /**
     * @inheritdoc
     */
    public name(): string {
        return "Living room";
    }

    /**
     * @inheritdoc
     */
    public images(): string[] {
        return ["LivingRoomLight"];
    }

    public objects(): GameObject[] {
        return [
            new DoorLivingRoomFrontDoorItem(), new DoorLivingRoomKitchenItem(),
        ];
    }

    /**
     * @inheritdoc
     */
    public actions(): Action[] {
        return [new ExamineAction(), new GoToAction()];
    }

    /**
     * @inheritdoc
     */
    public examine(): ActionResult | undefined {
        return new TextActionResult(["I cant see a thing! I need to find something to light up this room.",
        ]);
    }

    /**
         * @inheritdoc
         */
    public simple(alias: string): ActionResult | undefined {
        switch (alias) {
            case "corridor": {
                // TODO: Change this to the actual first room of the game
                const room: Room = new HallwayRoom();

                // Set the current room to the startup room
                gameService.getPlayerSession().currentRoom = room.alias;

                return room.examine();
            }
            case "kitchen": {
                // TODO: Change this to the actual first room of the game
                const room: Room = new KitchenRoom();

                // Set the current room to the startup room
                gameService.getPlayerSession().currentRoom = room.alias;

                return room.examine();
            }
        }
        return undefined;
    }
}
