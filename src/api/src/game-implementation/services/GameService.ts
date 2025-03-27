import { BaseGameService } from "../../game-base/services/BaseGameService";
import { GameObject } from "../../game-base/gameObjects/GameObject";
import { StartupRoom } from "../rooms/StartupRoom";
import { PlayerSession } from "../types";
import { OpenAction } from "../actions/OpenAction";
import { HallwayRoom } from "../rooms/HallwayRoom";
import { LivingRoom } from "../rooms/LivingRoom";
import { HallwayFrontDoorItem } from "../items/doors/HallwayFrontDoorItem";
import { DoorHallwayBedroomItem } from "../items/doors/DoorHallwayBedroomroomItem";
import { GoToAction } from "../actions/GoToAction";
import { FrontDoorHallwayItem } from "../items/doors/FrontDoorHallwayItem";
import { BathroomItem } from "../items/BathroomItem";
import { BedroomRoom } from "../rooms/BedroomRoom";
import { BathroomRoom } from "../rooms/Bathroomroom";
import { DoorBedroomItem } from "../items/doors/DoorBedroomItem";
import { StorageRoom } from "../rooms/StorageRoom";
import { MirrorItem } from "../items/MirrorItem";
import { MirrorCharacter } from "../characters/MirrorCharacter";
import { TalkAction } from "../../game-base/actions/TalkAction";
import { SafeItem } from "../items/SafeItem";
import { FrontDoorRoom } from "../rooms/FrontDoorRoom";
import { DoorFrontDoorLivingRoomItem } from "../items/doors/DoorFrontDoorLivingRoomItem";
import { DoorFrontDoorOutsideItem } from "../items/doors/DoorFrontDoorOutside";
import { DoorOutsideFrontdoor } from "../items/doors/DoorOutsideFrontdoor";
import { DoorOutsideShed } from "../items/doors/DoorOutsideShed";
import { StairsDownStairsItem } from "../items/doors/StairsDownstairsItem";
import { DoorStorageHallwayItem } from "../items/doors/DoorStorageHallwayItem";
import { DoorOfficeHallwayItem } from "../items/doors/DoorOfficeHallwayItem";
import { OutsideRoom } from "../rooms/OutsideRoom";
import { WorkRoom } from "../rooms/WorkRoom";
import { DiaryItem } from "../items/DiaryItem";
import { ClosetItem } from "../items/Closetitem";
import { HideAction } from "../actions/HideAction";
import { PickUpAction } from "../actions/PickUpAction";
import { CenterStorageLeftItem } from "../items/CenterStorageLeftItem";
import { DoorLivingRoomKitchenItem } from "../items/doors/DoorLivingRoomKitchenItem";
import { KitchenRoom } from "../rooms/KitchenRoom";
import { DoorKitchenLivingRoomItem } from "../items/doors/DoorKitchenLivingRoomItem";
import { GhostCharacter } from "../characters/GhostCharacter";
import { DoorBedroomBathroomItem } from "../items/doors/DoorBedroomBathroomItem";
import { DoorBathroomBedroomItem } from "../items/doors/DoorBathroomBedroomItem";
import { DoorHallwayStorageRoomItem } from "../items/doors/DoorHallwayStorageRoomItem";
import { DoorHallwayOfficeItem } from "../items/doors/DoorHallwayOfficeItem";
import { DoorLivingRoomFrontDoorItem } from "../items/doors/DoorLivingRoomFrontDoorItem";
import { CenterStorageRightItem } from "../items/CenterStorageRightItem";
import { EyeCharacter } from "../characters/EyeCharacter";
import { FirstAidItem } from "../items/FirstAidItem";
import { HiddenRoom } from "../rooms/HiddenRoom";
import { StopHidingItem } from "../items/StopHidingItem";
import { StopHidingAction } from "../actions/StopHidingAction";
import { GameOverRoom } from "../rooms/GameOverRoom";
import { ShedRoom } from "../rooms/ShedRoom";
import { FreezerItem } from "../items/FreezerItem";
import { CorpseCharacter } from "../characters/CorpseCharacter";
import { LightSwitchItem } from "../items/LightSwitchItem";
import { PressAction } from "../actions/PressAction";
import { WinScreenRoom } from "../rooms/WinScreenRoom";
import { GoToStartupAction } from "../actions/GoToStartupAction";
import { ToStartupItem } from "../items/doors/ToStartupItem";
import { EyesItem } from "../items/EyesItem";
import { TongueItem } from "../items/TongueItem";
import { DoorShedOutside } from "../items/doors/DoorShedOutside";
import { PanItem } from "../items/PanItem";
import { TasteAction } from "../actions/TasteAction";
import { GateKeyItem } from "../items/GateKeyItem";
import { LightItem } from "../items/LightItem";

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
        this.registerGameObject(GameOverRoom);
        this.registerGameObject(ShedRoom);
        this.registerGameObject(WinScreenRoom);
        this.registerGameObject(OutsideRoom);

        // Items
        this.registerGameObject(HallwayFrontDoorItem);
        this.registerGameObject(FrontDoorHallwayItem);
        this.registerGameObject(DoorBedroomItem);
        this.registerGameObject(BathroomItem);
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
        this.registerGameObject(CenterStorageLeftItem);
        this.registerGameObject(DoorBedroomItem);
        this.registerGameObject(DoorBedroomBathroomItem);
        this.registerGameObject(DoorBathroomBedroomItem);
        this.registerGameObject(DoorHallwayStorageRoomItem);
        this.registerGameObject(DoorHallwayOfficeItem);
        this.registerGameObject(DoorHallwayBedroomItem);
        this.registerGameObject(DoorLivingRoomFrontDoorItem);
        this.registerGameObject(DoorOutsideShed);
        this.registerGameObject(DoorShedOutside);
        this.registerGameObject(DoorOutsideFrontdoor);
        this.registerGameObject(CenterStorageRightItem);
        this.registerGameObject(FirstAidItem);
        this.registerGameObject(StopHidingItem);
        this.registerGameObject(FreezerItem);
        this.registerGameObject(LightSwitchItem);
        this.registerGameObject(ToStartupItem);
        this.registerGameObject(EyesItem);
        this.registerGameObject(TongueItem);
        this.registerGameObject(PanItem);
        this.registerGameObject(GateKeyItem);
        this.registerGameObject(LightItem);

        // Characters
        this.registerGameObject(MirrorCharacter);
        this.registerGameObject(GhostCharacter);
        this.registerGameObject(EyeCharacter);
        this.registerGameObject(CorpseCharacter);

        // Actions
        this.registerAction(OpenAction);
        this.registerAction(GoToAction);
        this.registerAction(TalkAction);
        this.registerAction(HideAction);
        this.registerAction(PressAction);
        this.registerAction(PickUpAction);
        this.registerAction(StopHidingAction);
        this.registerAction(GoToStartupAction);
        this.registerAction(TasteAction);
    }

    /**
     * Creates a new PlayerSession when a new game is started, sets all data to the base values
     * @inheritdoc
     */
    public createNewPlayerSession(): PlayerSession {
        return {
            currentRoom: StartupRoom.Alias,
            lastRoom: "",
            inventory: ["OutsideKeyItem"],
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
            clickedHelp: false,
            clickedDiary: false,
            clickedLight: false,
            pressedLight: false,
            openedFreezer: false,
            walkedToFreezer: false,
            givenEyes: false,
            givenTongue: false,
            pickedUpSaw: false,
            startedMinigame: false,
            gameOptions: [],
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
