import { BaseGameService } from "../../game-base/services/BaseGameService";
import { GameObject } from "../../game-base/gameObjects/GameObject";
import { StartupRoom } from "../rooms/StartupRoom";
import { PlayerSession } from "../types";
import { OpenAction } from "../actions/OpenAction";
import { HallwayRoom } from "../rooms/HallwayRoom";
import { LivingRoom } from "../rooms/LivingRoom";
import { HallwayFrontDoorItem } from "../items/HallwayFrontDoorItem";
import { GoToAction } from "../actions/GoToAction";
import { FrontDoorHallwayItem } from "../items/FrontDoorHallwayItem";

/**
 * Implementation of the game service used to operate the game engine
 */
export class GameService extends BaseGameService<PlayerSession> {
    /**
     * Create a new instance of the game service
     */
    public constructor() {
        super("game");

        // Rooms
        this.registerGameObject(StartupRoom);
        this.registerGameObject(HallwayRoom);
        this.registerGameObject(LivingRoom);

        // Actions
        this.registerAction(OpenAction);
        this.registerAction(GoToAction);

        // Items
        this.registerGameObject(HallwayFrontDoorItem);
        this.registerGameObject(FrontDoorHallwayItem);
    }

    /**
     * @inheritdoc
     */
    public createNewPlayerSession(): PlayerSession {
        return {
            currentRoom: StartupRoom.Alias,
            inventory: [],
        };
    }

    /**
     * Get the contents of the player inventory as a list of game objects instances
     *
     * @returns List of game object instances. Can be empty when no game objects were found.
     */
    public getGameObjectsFromInventory(): GameObject[] {
        return this.getGameObjectsByAliases(this.getPlayerSession().inventory);
    }
}
