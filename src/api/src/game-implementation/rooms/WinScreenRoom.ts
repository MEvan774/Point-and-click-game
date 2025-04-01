import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Action } from "../../game-base/actions/Action";
import { Simple, SimpleAction } from "../../game-base/actions/SimpleAction";
import { Room } from "../../game-base/gameObjects/Room";
import { gameService } from "../../global";
import { PlayerSession } from "../types";
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
        const result: string[] = [];
        const playerSession: PlayerSession = gameService.getPlayerSession();
        if (playerSession.escapedByCar || gameService.getPlayerSession().lastRoom === "Shed") {
            result.push("CarEnding");
        }
        else {
            result.push("WinScreen");
        }
        return result;
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
        const playerSession: PlayerSession = gameService.getPlayerSession();
        if (playerSession.escapedByCar) {
            return new TextActionResult([
                "You put the key in the igniter and twist it.",
                "The car turns on, you are able to escape!",
            ]);
        }
        else {
            return new TextActionResult ([
                "Congratulations, you made it out of the castle!",
            ]);
        }
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
            gameService.resetPlayerSession();
            const room: Room = new BedroomRoom();

            gameService.getPlayerSession().currentRoom = room.alias;

            return room.examine();
        }

        return undefined;
    }
}
