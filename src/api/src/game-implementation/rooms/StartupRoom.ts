import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Action } from "../../game-base/actions/Action";
import { Simple, SimpleAction } from "../../game-base/actions/SimpleAction";
import { Room } from "../../game-base/gameObjects/Room";
import { gameService } from "../../global";
import { BedroomRoom } from "./BedroomRoom";

/**
 * Implemention of the startup room
 *
 * @remarks Used as the first room for new player sessions.
 */
export class StartupRoom extends Room implements Simple {
    /** Alias of this room */
    public static readonly Alias: string = "startup";

    /**
     * Create a new instance of this room
     */
    public constructor() {
        super(StartupRoom.Alias);
    }

    /**
     * @inheritdoc
     */
    public name(): string {
        return "Example Game";
    }

    /**
     * @inheritdoc
     */
    public images(): string[] {
        return ["startup"];
    }

    /**
     * @inheritdoc
     */
    public actions(): Action[] {
        return [
            new SimpleAction("start-game", "Start Game"),
        ];
    }

    /**
     * @inheritdoc
     */
    public examine(): ActionResult | undefined {
        return new TextActionResult(["This is an example."]);
    }

    /**
     * @inheritdoc
     */
    public simple(alias: string): ActionResult | undefined {
        if (alias === "start-game") {
            const room: Room = new BedroomRoom();

            gameService.getPlayerSession().currentRoom = room.alias;

            return room.examine();
        }
        // if (alias === "to-bathroom") {
        //     const room: Room = new BathroomRoom();

        //     gameService.getPlayerSession().currentRoom = room.alias;

        //     return room.examine();
        // }

        // if (alias === "to-storage") {
        //     const room: Room = new StorageRoom();

        //     gameService.getPlayerSession().currentRoom = room.alias;

        //     return room.examine();
        // }

        // if (alias === "to-bedroom") {
        //     const room: Room = new BedroomRoom();

        //     gameService.getPlayerSession().currentRoom = room.alias;

        //     return room.examine();
        // }

        // if (alias === "to-front-door") {
        //     const room: Room = new FrontDoorRoom();

        //     gameService.getPlayerSession().currentRoom = room.alias;

        //     return room.examine();
        // }

        // if (alias === "to-office") {
        //     const room: Room = new WorkRoom();

        //     gameService.getPlayerSession().currentRoom = room.alias;
        //     return room.examine();
        // }
        return undefined;
    }
}
