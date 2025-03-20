import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Action } from "../../game-base/actions/Action";
import { Simple, SimpleAction } from "../../game-base/actions/SimpleAction";
import { Room } from "../../game-base/gameObjects/Room";
import { gameService } from "../../global";
import { BedroomRoom } from "./BedroomRoom";
import { StartupRoom } from "./StartupRoom";

/**
 * Implemention of the startup room
 *
 * @remarks Used as the first room for new player sessions.
 */
export class WinScreenRoom extends Room implements Simple {
    /** Alias of this room */
    public static readonly Alias: string = "win";

    /**
     * Create a new instance of this room
     */
    public constructor() {
        super(WinScreenRoom.Alias);
    }

    /**
     * @inheritdoc
     */
    public name(): string {
        return "Game won!";
    }

    /**
     * @inheritdoc
     */
    public images(): string[] {
        return ["WinScreen"];
    }

    /**
     * @inheritdoc
     */
    public actions(): Action[] {
        return [
            new SimpleAction("startup", "Go to main menu"),
            new SimpleAction("new-game", "New Game"),
        ];
    }

    /**
     * @inheritdoc
     */
    public examine(): ActionResult | undefined {
        return new TextActionResult([""]);
    }

    /**
     * @inheritdoc
     */
    public simple(alias: string): ActionResult | undefined {
        if (alias === "startup") {
            const room: Room = new StartupRoom();

            gameService.getPlayerSession().currentRoom = room.alias;

            return room.examine();
        }

        if (alias === "new-game") {
            localStorage.clear();
            const room: Room = new BedroomRoom();

            gameService.getPlayerSession().currentRoom = room.alias;

            return room.examine();
        }

        return undefined;
    }
}
