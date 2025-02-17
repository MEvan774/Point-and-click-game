import { BaseGameService } from "../../game-base/services/BaseGameService";
import { GameObject } from "../../game-base/gameObjects/GameObject";
import { StartupRoom } from "../rooms/StartupRoom";
import { PlayerSession } from "../types";
import { OpenAction } from "../actions/OpenAction";
import { BedroomRoom } from "../rooms/BedroomRoom";
import { BathroomRoom } from "../rooms/Bathroomroom";
import { DoorBedroomItem } from "../items/DoorBedroomItem";
import { PickUpAction } from "../actions/PickUpAction";
import { GoToAction } from "../actions/GoToAction";

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
        this.registerGameObject(BedroomRoom);
        this.registerGameObject(BathroomRoom);

        // Actions
        this.registerAction(OpenAction);
        this.registerAction(PickUpAction);
        this.registerAction(GoToAction);

        // Items
        this.registerGameObject(DoorBedroomItem);
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
