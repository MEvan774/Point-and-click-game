import { PlayerService } from "../../../../web/src/services/PlayerService";
import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Action } from "../../game-base/actions/Action";
import { ExamineAction } from "../../game-base/actions/ExamineAction";
import { GameObject } from "../../game-base/gameObjects/GameObject";
import { Room } from "../../game-base/gameObjects/Room";
import { gameService } from "../../global";
import { GoToAction } from "../actions/GoToAction";
import { OpenAction } from "../actions/OpenAction";
import { DoorFrontDoorLivingRoomItem } from "../items/DoorFrontDoorLivingRoomItem";
import { DoorFrontDoorOutsideItem } from "../items/DoorFrontDoorOutside";
import { FrontDoorHallwayItem } from "../items/FrontDoorHallwayItem";
import { PlayerSession } from "../types";

/**
 * Implemention of the storage room
 */
export class FrontDoorRoom extends Room {
    /** Alias of this room */
    public static readonly Alias: string = "FrontDoorRoom";

    /**
     * Create a new instance of this room
     */
    public constructor() {
        super(FrontDoorRoom.Alias);
    }

    /**
     * @inheritdoc
     */
    public name(): string {
        return "Front door";
    }

    /**
     * @inheritdoc
     */
    public images(): string[] {
        if (gameService.getPlayerSession().planksGone) {
            return ["FrontDoorRoomOpen"];
        }

        return ["frontDoorRoom"];
    }

    public objects(): GameObject[] {
        const objects: GameObject[] = [
            new DoorFrontDoorLivingRoomItem(),
            new DoorFrontDoorOutsideItem(),
            new FrontDoorHallwayItem(),
        ];

        return objects;
    }

    public actions(): Action[] {
        return [
            new ExamineAction(),
            new GoToAction(),
            new OpenAction(),
        ];
    }

    public inventory(): GameObject[] {
        const inventory: GameObject[] = gameService.getGameObjectsFromInventory();

        return inventory;
    }

    /**
     * @inheritdoc
     */
    public examine(): ActionResult | undefined {
        const playerSession: PlayerSession = gameService.getPlayerSession();

        if (playerSession.planksGone && playerSession.outsideKeyUsed) {
            return new TextActionResult([
                "The front door is open",
                "I can go outside from here.",
            ]);
        }
        return new TextActionResult([
            "This looks like the door to get outside,",
            "But it is locked.",
        ]);
    }
}
