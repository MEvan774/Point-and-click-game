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
import { DoorStorageHallwayItem } from "../items/DoorStorageHallwayitem";

/**
 * Implemention of the storage room
 */
export class StorageRoom extends Room {
    /** Alias of this room */
    public static readonly Alias: string = "StorageRoom";

    /**
     * Create a new instance of this room
     */
    public constructor() {
        super(StorageRoom.Alias);
    }

    /**
     * @inheritdoc
     */
    public name(): string {
        return "Storage Room";
    }

    /**
     * @inheritdoc
     */
    public images(): string[] {
        const playerSession: PlayerSession = gameService.getPlayerSession();

        const result: string[] = [];

        if (!playerSession.solvedRiddle) {
            result.push("darkMirror");
        }
        else if (!playerSession.walkedToMirror) {
            result.push("storageRoom");
        }
        else {
            result.push("lightMirror");
        }

        return result;
    }

    public objects(): GameObject[] {
        return [
            new MirrorItem(),
            new MirrorCharacter(),
            new SafeItem(),
            new DoorStorageHallwayItem(),
        ];
    }

    public actions(): Action[] {
        return [
            new ExamineAction(),
            new GoToAction(),
            new TalkAction(),
            new OpenAction(),
        ];
    }

    /**
     * @inheritdoc
     */
    public examine(): ActionResult | undefined {
        gameService.getPlayerSession().walkedToMirror = false;

        return new TextActionResult([
            "The room is dark, and there is a strong smell of blood.",
            "You can see something in the mirror",
            "Maybe you can turn on the light?",
        ]);
    }
}
