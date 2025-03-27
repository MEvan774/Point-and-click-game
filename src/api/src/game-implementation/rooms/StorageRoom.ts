import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Action } from "../../game-base/actions/Action";
import { GameObject } from "../../game-base/gameObjects/GameObject";
import { Room } from "../../game-base/gameObjects/Room";
import { MirrorItem } from "../items/MirrorItem";
import { ExamineAction } from "../../game-base/actions/ExamineAction";
import { GoToAction } from "../actions/GoToAction";
import { MirrorCharacter } from "../characters/MirrorCharacter";
import { TalkAction } from "../../game-base/actions/TalkAction";
import { SafeItem } from "../items/SafeItem";
import { OpenAction } from "../actions/OpenAction";
import { gameService } from "../../global";
import { PlayerSession } from "../types";
import { DoorStorageHallwayItem } from "../items/doors/DoorStorageHallwayItem";
import { HideAction } from "../actions/HideAction";
import { ClosetItem } from "../items/Closetitem";
import { CenterStorageLeftItem } from "../items/CenterStorageLeftItem";
import { CenterStorageRightItem } from "../items/CenterStorageRightItem";
import { LightItem } from "../items/LightItem";
import { GateKeyItem } from "../items/GateKeyItem";
import { PickUpAction } from "../actions/PickUpAction";

/**
 * Implemention of the StorageRoom
 */
export class StorageRoom extends Room {
    // Alias of this room
    public static readonly Alias: string = "StorageRoom";

    // Create a new instance of this room
    public constructor() {
        super(StorageRoom.Alias);
    }

    // Name of the room, used for buttons for example
    public name(): string {
        return "Storage Room";
    }

    /**
     * Images for the room, changes when the player is near the MirrorItem or the riddle is solved
     *
     * @inheritdoc
     */
    public images(): string[] {
        const playerSession: PlayerSession = gameService.getPlayerSession();

        const result: string[] = [];

        // If the riddle has not been solved and the player is near the MirrorItem
        if (!playerSession.solvedRiddle && playerSession.walkedToMirror) {
            result.push("darkMirror");
        }

        // If the riddle has not been solved and the player is not near the MirrorItem
        if (!playerSession.solvedRiddle && !playerSession.walkedToMirror) {
            result.push("StorageRoomDark");
        }

        // If the riddle has been solved and the player is not near the MirrorItem
        if (playerSession.solvedRiddle && !playerSession.walkedToMirror) {
            result.push("StorageRoomLight");
        }

        // If the riddle has been solved and the player is near the MirrorItem
        if (playerSession.solvedRiddle && playerSession.walkedToMirror) {
            result.push("lightMirror");
        }

        return result;
    }

    /**
     * The objects in the Room, changes wether the riddle has been solved and the player is near the
     * MirrorItem
     *
     * @returns Array of the GameObjects in the Room
     */
    public objects(): GameObject[] {
        const objects: GameObject[] = [];

        const playerSession: PlayerSession = gameService.getPlayerSession();

        // If the player is near the MirrorItem and hasn't solved the riddle, pushes the MirrorCharacter
        if (playerSession.walkedToMirror && !playerSession.solvedRiddle) {
            objects.push(new MirrorCharacter());
        }

        // If the player is near the MirrorItem, pushes the left and right of the center of the StorageRoom
        if (playerSession.walkedToMirror) {
            objects.push(new CenterStorageLeftItem());
            objects.push(new CenterStorageRightItem());
        }

        // If the player is not near the MirrorItem, pushes the SafeItem, DoorStorageHallwayItem, ClosetItem
        // And the MirrorItem
        if (!playerSession.walkedToMirror) {
            objects.push(new SafeItem());
            objects.push(new DoorStorageHallwayItem());
            objects.push(new ClosetItem());
            objects.push(new MirrorItem());
            objects.push(new LightItem());
            objects.push(new GateKeyItem());
        }

        return objects;
    }

    /**
     * The actions in the Room
     *
     * @returns Array of the Actions in the Room
     */
    public actions(): Action[] {
        const actions: Action[] = [
            new ExamineAction(),
            new GoToAction(),
            new TalkAction(),
            new OpenAction(),
            new HideAction(),
            new PickUpAction(),
        ];

        return actions;
    }

    /**
     * Tells about the state of the Room, changes if the riddle has been solved
     *
     * @inheritdoc
     */
    public examine(): ActionResult | undefined {
        gameService.getPlayerSession().walkedToMirror = false;

        // Checks if the riddle has been solved
        if (gameService.getPlayerSession().solvedRiddle) {
            return new TextActionResult([
                "Now that the light is on, you can see everything more clearly.",
                "The smell of blood is still hanging in the air",
                "At least the mirror is back to normal.",
            ]);
        }

        // If the riddle has not been solved
        return new TextActionResult([
            "The room is dark, and there is a strong smell of blood.",
            "You can see something in the mirror",
            "Maybe you can turn on the light?",
        ]);
    }
}
