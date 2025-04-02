import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { Examine } from "../../game-base/actions/ExamineAction";
import { Item } from "../../game-base/gameObjects/Item";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { GoTo } from "../actions/GoToAction";
import { gameService } from "../../global";
import { Room } from "../../game-base/gameObjects/Room";
import { ActionTypes } from "../../game-base/enums/ActionAlias";
import { GameOverRoom } from "../rooms/GameOverRoom";
import { PlayerSession } from "../types";
import { BedroomRoom } from "../rooms/BedroomRoom";

export class ToGameOverScreenItem extends Item implements Examine, GoTo {
    public static readonly Alias: string = "gameOver";
    /**
     * @param _action determines which action will be executed when clicked on.
     * @param _position determines where the hitbox will be located.
     * @param _size determines the size of the hibox
     * @param _isDebugHitboxVisible if true, makes the hitbox visible, false invisible.
     * @param validActions the options that will show up when clicked on.
     */
    public _action: ActionTypes = ActionTypes.GoTo;
    public _position: Vector2 = { x: 0, y: 0 };
    public _size: Vector2 = { x: 0, y: 0 };
    public static readonly validActions: string[] = ["go to"];
    public _isDebugHitboxVisible: boolean = false;

    public constructor() {
        super(ToGameOverScreenItem.Alias, ToGameOverScreenItem.validActions);
    }

    public name(): string {
        return "Bedroom";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([""]);
    }

    public goto(): ActionResult | undefined {
        const playerSession: PlayerSession = gameService.getPlayerSession();

        if (playerSession.inventory.includes("FirstAidItem")) {
            const index: number = playerSession.inventory.indexOf("FirstAidItem");
            if (index !== -1)
                playerSession.inventory.splice(index, 1);

            const room: Room = new BedroomRoom();

            gameService.getPlayerSession().currentRoom = room.alias;

            playerSession.usedFirstAid = true;

            return room.examine();
        }
        const room: Room = new GameOverRoom();

        gameService.getPlayerSession().currentRoom = room.alias;
        return room.examine();
    }
}
