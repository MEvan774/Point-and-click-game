import { BaseGameService } from "../../game-base/services/BaseGameService";
import { GameObject } from "../../game-base/gameObjects/GameObject";
import { StartupRoom } from "../rooms/StartupRoom";
import { PlayerSession } from "../types";
import { OpenAction } from "../actions/OpenAction";
import { StorageRoom } from "../rooms/StorageRoom";
import { MirrorItem } from "../items/MirrorItem";
import { GoToAction } from "../actions/GoToAction";
import { MirrorCharacter } from "../characters/MirrorCharacter";
import { TalkAction } from "../../game-base/actions/TalkAction";
import { SafeItem } from "../items/SafeItem";
import { DoorStorageHallwayItem } from "../items/DoorStorageHallwayItem";
import { DoorOfficeHallwayItem } from "../items/DoorOfficeHallwayItem";
import { WorkRoom } from "../rooms/WorkRoom";
import { DiaryItem } from "../items/DiaryItem";

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
        this.registerGameObject(StorageRoom);
        this.registerGameObject(WorkRoom);

        // Items
        this.registerGameObject(MirrorItem);
        this.registerGameObject(SafeItem);
        this.registerGameObject(DoorStorageHallwayItem);
        this.registerGameObject(DoorOfficeHallwayItem);
        this.registerGameObject(DiaryItem);

        // Characters
        this.registerGameObject(MirrorCharacter);

        // Actions
        this.registerAction(OpenAction);
        this.registerAction(GoToAction);
        this.registerAction(TalkAction);
    }

    /**
     * @inheritdoc
     */
    public createNewPlayerSession(): PlayerSession {
        return {
            currentRoom: StartupRoom.Alias,
            inventory: [],
            walkedToMirror: false,
            solvedRiddle: false,
            knowsAboutSafe: false,
            safeOpened: false,
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
