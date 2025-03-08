import { BaseGameService } from "../../game-base/services/BaseGameService";
import { GameObject } from "../../game-base/gameObjects/GameObject";
import { StartupRoom } from "../rooms/StartupRoom";
import { PlayerSession } from "../types";
import { OpenAction } from "../actions/OpenAction";
import { HallwayRoom } from "../rooms/HallwayRoom";
import { LivingRoom } from "../rooms/LivingRoom";
import { HallwayFrontDoorItem } from "../items/HallwayFrontDoorItem";
import { DoorHallwayBedroomItem } from "../items/DoorHallwayBedroomroomItem";
import { GoToAction } from "../actions/GoToAction";
import { FrontDoorHallwayItem } from "../items/FrontDoorHallwayItem";
import { BathroomItem } from "../items/BathroomItem";
import { BathtubItem } from "../items/BathtubItem";
import { BedroomRoom } from "../rooms/BedroomRoom";
import { BathroomRoom } from "../rooms/Bathroomroom";
import { DoorBedroomItem } from "../items/DoorBedroomItem";
import { StorageRoom } from "../rooms/StorageRoom";
import { MirrorItem } from "../items/MirrorItem";
import { MirrorCharacter } from "../characters/MirrorCharacter";
import { TalkAction } from "../../game-base/actions/TalkAction";
import { SafeItem } from "../items/SafeItem";
import { FrontDoorRoom } from "../rooms/FrontDoorRoom";
import { DoorFrontDoorLivingRoomItem } from "../items/DoorFrontDoorLivingRoomItem";
import { DoorFrontDoorOutsideItem } from "../items/DoorFrontDoorOutside";
import { StairsDownStairsItem } from "../items/StairsDownstairsItem";
import { DoorStorageHallwayItem } from "../items/DoorStorageHallwayItem";
import { DoorOfficeHallwayItem } from "../items/DoorOfficeHallwayItem";
import { WorkRoom } from "../rooms/WorkRoom";
import { DiaryItem } from "../items/DiaryItem";
import { ClosetItem } from "../items/Closetitem";
import { HideAction } from "../actions/HideAction";
import { DeskItem } from "../items/DeskItem";
import { PickUpAction } from "../actions/PickUpAction";
import { CenterStorageLeftItem } from "../items/CenterStorageLeftItem";
import { DoorLivingRoomKitchenItem } from "../items/DoorLivingRoomKitchenItem";
import { KitchenRoom } from "../rooms/KitchenRoom";
import { DoorKitchenLivingRoomItem } from "../items/DoorKitchenLivingRoomItem";
import { GhostCharacter } from "../characters/GhostCharacter";
import { DoorBedroomBathroomItem } from "../items/DoorBedroomBathroomItem";
import { DoorBathroomBedroomItem } from "../items/DoorBathroomBedroomItem";
import { DoorHallwayStorageRoomItem } from "../items/DoorHallwayStorageRoomItem";
import { DoorHallwayOfficeItem } from "../items/DoorHallwayOfficeItem";
import { DoorLivingRoomFrontDoorItem } from "../items/DoorLivingRoomFrontDoorItem";
import { CenterStorageRightItem } from "../items/CenterStorageRightItem";
import { EyeCharacter } from "../characters/EyeCharacter";
import { FirstAidItem } from "../items/FirstAidItem";
import { HiddenRoom } from "../rooms/HiddenRoom";
import { StopHidingItem } from "../items/StopHidingItem";
import { StopHidingAction } from "../actions/StopHidingAction";

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
        this.registerGameObject(KitchenRoom);
        this.registerGameObject(StorageRoom);
        this.registerGameObject(FrontDoorRoom);
        this.registerGameObject(WorkRoom);
        this.registerGameObject(BedroomRoom);
        this.registerGameObject(BathroomRoom);
        this.registerGameObject(HiddenRoom);

        // Items
        this.registerGameObject(HallwayFrontDoorItem);
        this.registerGameObject(FrontDoorHallwayItem);
        this.registerGameObject(DoorBedroomItem);
        this.registerGameObject(BathroomItem);
        this.registerGameObject(BathtubItem);
        this.registerGameObject(MirrorItem);
        this.registerGameObject(SafeItem);
        this.registerGameObject(DoorStorageHallwayItem);
        this.registerGameObject(DoorFrontDoorLivingRoomItem);
        this.registerGameObject(DoorLivingRoomKitchenItem);
        this.registerGameObject(DoorKitchenLivingRoomItem);
        this.registerGameObject(DoorFrontDoorOutsideItem);
        this.registerGameObject(StairsDownStairsItem);
        this.registerGameObject(DoorOfficeHallwayItem);
        this.registerGameObject(DiaryItem);
        this.registerGameObject(ClosetItem);
        this.registerGameObject(DeskItem);
        this.registerGameObject(CenterStorageLeftItem);
        this.registerGameObject(DoorBedroomItem);
        this.registerGameObject(DoorBedroomBathroomItem);
        this.registerGameObject(DoorBathroomBedroomItem);
        this.registerGameObject(DoorHallwayStorageRoomItem);
        this.registerGameObject(DoorHallwayOfficeItem);
        this.registerGameObject(DoorHallwayBedroomItem);
        this.registerGameObject(DoorLivingRoomFrontDoorItem);
        this.registerGameObject(CenterStorageRightItem);
        this.registerGameObject(FirstAidItem);
        this.registerGameObject(StopHidingItem);

        // Characters
        this.registerGameObject(MirrorCharacter);
        this.registerGameObject(GhostCharacter);
        this.registerGameObject(EyeCharacter);

        // Actions
        this.registerAction(OpenAction);
        this.registerAction(GoToAction);
        this.registerAction(TalkAction);
        this.registerAction(HideAction);
        this.registerAction(PickUpAction);
        this.registerAction(StopHidingAction);
    }

    /**
     * Creates a new PlayerSession when a new game is started, sets all data to the base values
     * @inheritdoc
     */
    public createNewPlayerSession(): PlayerSession {
        return {
            currentRoom: StartupRoom.Alias,
            inventory: ["OutsideKeyItem", "CrowbarItem"],
            selectedItem: "",
            hiddenIn: "",
            walkedToBathtub: false,
            isPickingUpkey: false,
            pickedUpKey: false,
            walkedToMirror: false,
            solvedRiddle: false,
            knowsAboutSafe: false,
            safeOpened: false,
            pickedUpDiary: false,
            clickedFirstAid: false,
            pickedUpFirstAid: false,
            planksGone: false,
            outsideKeyUsed: false,
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
