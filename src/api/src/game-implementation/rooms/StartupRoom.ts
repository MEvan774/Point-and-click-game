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
        const actions: Action[] = [new SimpleAction("new-game", "New Game")];

        if (!gameService.getPlayerSession().clickedHelp) {
            actions.push(new SimpleAction("help", "Instructions"));
        }
        else {
            actions.push(new SimpleAction("help", "Close instructions"));
        }
        return actions;
    }

    /**
     * @inheritdoc
     */
    public examine(): ActionResult | undefined {
        if (gameService.getPlayerSession().clickedHelp) {
            return new TextActionResult([
                "Click on objects to examine them and see the possible actions.",
                "Click on the action that you want to execute.",
                "If you want to execute an action you need an object for,",
                "Click on the object in your inventory,",
                "and then on the object and action you want to use it on.",
                "You win when you escape.",
            ]);
        }
        return new TextActionResult([""]);
    }

    /**
     * @inheritdoc
     */
    public simple(alias: string): ActionResult | undefined {
        if (alias === "new-game") {
            const room: Room = new BedroomRoom();

            gameService.getPlayerSession().currentRoom = room.alias;

            return room.examine();
        }
        if (alias === "help" && !gameService.getPlayerSession().clickedHelp) {
            gameService.getPlayerSession().clickedHelp = true;

            return this.examine();
        }
        if (alias === "help") {
            gameService.getPlayerSession().clickedHelp = false;

            return this.examine();
        }

        return undefined;
    }
}
