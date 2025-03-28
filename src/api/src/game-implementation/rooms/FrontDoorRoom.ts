import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Action } from "../../game-base/actions/Action";
import { ExamineAction } from "../../game-base/actions/ExamineAction";
import { GameObject } from "../../game-base/gameObjects/GameObject";
import { Room } from "../../game-base/gameObjects/Room";
import { gameService } from "../../global";
import { GoToAction } from "../actions/GoToAction";
import { GoToStartupAction } from "../actions/GoToStartupAction";
import { OpenAction } from "../actions/OpenAction";
import { DoorFrontDoorLivingRoomItem } from "../items/doors/DoorFrontDoorLivingRoomItem";
import { DoorFrontDoorOutsideItem } from "../items/doors/DoorFrontDoorOutside";
import { FrontDoorHallwayItem } from "../items/doors/FrontDoorHallwayItem";
import { ToStartupItem } from "../items/doors/ToStartupItem";
import { PlayerSession } from "../types";

/**
 * Implemention of the FrontDoorRoom
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
     * Name of the room, used for buttons for example
     * @inheritdoc
     */
    public name(): string {
        return "Front door";
    }

    /**
     * Images for the room
     *
     * @inheritdoc
     */
    public images(): string[] {
        // If the CrowbarItem is used on the FrontDoorItem
        if (gameService.getPlayerSession().planksGone) {
            return ["frontDoorRoomOpen"];
        }

        return ["frontDoorRoom"];
    }

    /**
     * The objects in the Room
     *
     * @returns Array of the GameObjects in the Room
     */
    public objects(): GameObject[] {
        const objects: GameObject[] = [
            new ToStartupItem(),
            new DoorFrontDoorLivingRoomItem(),
            new DoorFrontDoorOutsideItem(),
            new FrontDoorHallwayItem(),
        ];

        return objects;
    }

    /**
     * The actions in the Room
     *
     * @returns Array of the Actions in the Room
     */
    public actions(): Action[] {
        return [
            new ExamineAction(),
            new GoToStartupAction(),
            new GoToAction(),
            new OpenAction(),
        ];
    }

    /**
     * The inventory of the player
     *
     * @returns Array of the GameObjects in the inventory
     */
    public inventory(): GameObject[] {
        const inventory: GameObject[] = gameService.getGameObjectsFromInventory();

        return inventory;
    }

    /**
     * Tells about the state of the Room
     *
     * @inheritdoc
     */
    public examine(): ActionResult | undefined {
        const playerSession: PlayerSession = gameService.getPlayerSession();

        // Checks if the door is open
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
