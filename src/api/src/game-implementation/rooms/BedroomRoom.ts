import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Action } from "../../game-base/actions/Action";
import { ExamineAction } from "../../game-base/actions/ExamineAction";
import { Simple, SimpleAction } from "../../game-base/actions/SimpleAction";
import { Room } from "../../game-base/gameObjects/Room";
import { gameService } from "../../global";
import { GoToAction } from "../actions/GoToAction";
import { OpenAction } from "../actions/OpenAction";
import { BathroomRoom } from "./Bathroomroom";
import { FrontDoorRoom } from "./FrontDoorRoom";
import { StorageRoom } from "./StorageRoom";
import { WorkRoom } from "./WorkRoom";

/**
 * Implemention of the bedroom room
 *
 * @remarks Used as the first room for new player sessions.
 */
export class BedroomRoom extends Room implements Simple {
    public static readonly Alias: string = "bedroom";

    /**
     * Create a new instance of this room
     */
    public constructor() {
        super(BedroomRoom.Alias);
    }

    /**
     * @inheritdoc
     */
    public name(): string {
        return "Bedroom";
    }

    /**
     * @inheritdoc
     */
    public images(): string[] {
        return ["bedroomRoom"];
    }

    public actions(): Action[] {
        return [
            new ExamineAction(),
            new OpenAction(),
            new GoToAction(),
            new SimpleAction("to-bathroom", "Go to bathroom"),
            new SimpleAction("to-bedroom", "Go to bedroom"),
            new SimpleAction("to-storage", "To storage room"),
            new SimpleAction("to-front-door", "To front door"),
            new SimpleAction("to-office", "To office"),
        ];
    }

    /**
     * @inheritdoc
     */
    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "This is a bedroom.",
            "There are 2 doors.",
        ]);
    }

    /**
     * @inheritdoc
     */
    public simple(alias: string): ActionResult | undefined {
        if (alias === "to-bathroom") {
            const room: Room = new BathroomRoom();
            gameService.getPlayerSession().currentRoom = room.alias;
            return room.examine();
        }
        if (alias === "to-storage") {
            const room: Room = new StorageRoom();
            gameService.getPlayerSession().currentRoom = room.alias;
            return room.examine();
        }
        if (alias === "to-bedroom") {
            const room: Room = new BedroomRoom();
            gameService.getPlayerSession().currentRoom = room.alias;
            return room.examine();
        }
        if (alias === "to-front-door") {
            const room: Room = new FrontDoorRoom();
            gameService.getPlayerSession().currentRoom = room.alias;
            return room.examine();
        }
        if (alias === "to-office") {
            const room: Room = new WorkRoom();
            gameService.getPlayerSession().currentRoom = room.alias;
            return room.examine();
        }
        return undefined;
    }
}
