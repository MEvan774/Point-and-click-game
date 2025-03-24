import { ActionResult } from "../../../game-base/actionResults/ActionResult";
import { Item } from "../../../game-base/gameObjects/Item";
import { gameService } from "../../../global";
import { Room } from "../../../game-base/gameObjects/Room";
import { GoToStartup } from "../../actions/GoToStartupAction";
import { GameObject } from "../../../game-base/gameObjects/GameObject";
import { StartupRoom } from "../../rooms/StartupRoom";
import { PlayerSession } from "../../types";

export class ToStartupItem extends Item implements GoToStartup {
    public static readonly Alias: string = "to startup";

    public static readonly validActions: string[] = ["go to startup"];

    public constructor() {
        super(ToStartupItem.Alias, ToStartupItem.validActions);
    }

    public name(): string {
        return "To startup";
    }

    public gotostartup(): ActionResult | undefined {
        const playerSession: PlayerSession = gameService.getPlayerSession();

        const gameObject: GameObject | undefined =
            gameService.getGameObjectByAlias(playerSession.currentRoom);

        if (!gameObject) return;

        const room: Room = new StartupRoom();

        playerSession.lastRoom = playerSession.currentRoom;
        playerSession.currentRoom = room.alias;
        return room.examine();
    }
}
