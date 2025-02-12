import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Action } from "../../game-base/actions/Action";
import { GameObject } from "../../game-base/gameObjects/GameObject";
import { Room } from "../../game-base/gameObjects/Room";
import { MirrorItem } from "../items/MirrorItem";
import { ExamineAction } from "../../game-base/actions/ExamineAction";

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
        return ["storageRoom"];
    }

    public objects(): SyncOrAsync<GameObject[]> {
        return [
            new MirrorItem(),
        ];
    }

    public actions(): SyncOrAsync<Action[]> {
        return [
            new ExamineAction(),
        ];
    }

    /**
     * @inheritdoc
     */
    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "The room is dark, and there is a strong smell of blood.",
            "You can see something in the mirror",
            "Maybe you can turn on the light?",
        ]);
    }
}
