import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Action } from "../../game-base/actions/Action";
import { ExamineAction } from "../../game-base/actions/ExamineAction";
import { GameObject } from "../../game-base/gameObjects/GameObject";
import { Room } from "../../game-base/gameObjects/Room";
import { gameService } from "../../global";
import { GoToAction } from "../actions/GoToAction";
import { GoToStartupAction } from "../actions/GoToStartupAction";
import { DoorHallwayBedroomItem } from "../items/doors/DoorHallwayBedroomroomItem";
import { DoorHallwayOfficeItem } from "../items/doors/DoorHallwayOfficeItem";
import { DoorHallwayStorageRoomItem } from "../items/doors/DoorHallwayStorageRoomItem";
import { HallwayFrontDoorItem } from "../items/doors/HallwayFrontDoorItem";
import { ToStartupItem } from "../items/doors/ToStartupItem";
import { ToGameOverScreenItem } from "../items/ToGameOverScreenItem";
import { LivingRoom } from "./LivingRoom";

/**
 * Implemention of the startup room
 *
 * @remarks Used as the first room for new player sessions.
 */
export class HallwayRoom extends Room {
    /** Alias of this room */
    public static readonly Alias: string = "corridor";

    /**
     * Create a new instance of this room
     */
    public constructor() {
        super(HallwayRoom.Alias);
    }

    /**
     * @inheritdoc
     */
    public name(): string {
        return "Corridor";
    }

    /**
     * @inheritdoc
     */
    public images(): string[] {
        return ["Corridor"];
    }

    public objects(): GameObject[] {
        return [
            new HallwayFrontDoorItem(),
            new DoorHallwayStorageRoomItem(),
            new DoorHallwayOfficeItem(),
            new DoorHallwayBedroomItem(),
            new ToStartupItem(),
            new ToGameOverScreenItem(),
        ];
    }

    /**
     * @inheritdoc
     */
    public actions(): Action[] {
        return [new ExamineAction(), new GoToAction(), new GoToStartupAction()];
    }

    /**
     * @inheritdoc
     */
    public examine(): ActionResult | undefined {
        return new TextActionResult(["Im in a long hallway, cold air is going trough the window.",
            "I see stairs up ahead.",
        ]);
    }

    /**
     * @inheritdoc
     */
    public simple(alias: string): ActionResult | undefined {
        if (alias === "livingRoom") {
            // TODO: Change this to the actual first room of the game
            const room: Room = new LivingRoom();

            // Set the current room to the startup room
            gameService.getPlayerSession().currentRoom = room.alias;

            return room.examine();
        }

        return undefined;
    }
}
