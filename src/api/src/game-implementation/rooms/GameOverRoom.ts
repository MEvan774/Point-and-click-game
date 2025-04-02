import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Action } from "../../game-base/actions/Action";
import { Simple, SimpleAction } from "../../game-base/actions/SimpleAction";
import { Room } from "../../game-base/gameObjects/Room";
import { gameService } from "../../global";
import { StartupRoom } from "./StartupRoom";

/**
 * Implemention of the game over room
 *
 * @remarks Used as the first room for new player sessions.
 */
export class GameOverRoom extends Room implements Simple {
    /** Alias of this room */
    public static readonly Alias: string = "game-over";

    /**
     * Create a new instance of this room
     */
    public constructor() {
        super(GameOverRoom.Alias);
    }

    /**
     * @inheritdoc
     */
    public name(): string {
        return "Game Over";
    }

    /**
     * @inheritdoc
     */
    public images(): string[] {
        return ["GameOverScreen"];
    }

    /**
     * @inheritdoc
     */
    public actions(): Action[] {
        const actions: Action[] = [
            new SimpleAction("quit-game", "Go back"),
        ];

        return actions;
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
        if (alias === "quit-game") {
            const room: Room = new StartupRoom();

            gameService.getPlayerSession().currentRoom = room.alias;

            return room.examine();
        }

        return undefined;
    }
}
