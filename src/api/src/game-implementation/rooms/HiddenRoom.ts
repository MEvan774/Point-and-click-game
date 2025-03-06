import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Action } from "../../game-base/actions/Action";
import { GameObject } from "../../game-base/gameObjects/GameObject";
import { Room } from "../../game-base/gameObjects/Room";
import { ExamineAction } from "../../game-base/actions/ExamineAction";
import { StopHidingItem } from "../items/StopHidingItem";
import { StopHidingAction } from "../actions/StopHidingAction";

/**
 * Implemention of the storage room
 */
export class HiddenRoom extends Room {
    /** Alias of this room */
    public static readonly Alias: string = "HiddenRoom";

    /**
     * Create a new instance of this room
     */
    public constructor() {
        super(HiddenRoom.Alias);
    }

    /**
     * @inheritdoc
     */
    public name(): string {
        return "Hiding";
    }

    /**
     * @inheritdoc
     */
    public images(): string[] {
        return ["LivingRoomdark"];
    }

    public objects(): GameObject[] {
        const objects: GameObject[] = [];

        objects.push(new StopHidingItem());

        return objects;
    }

    public actions(): Action[] {
        const actions: Action[] = [
            new ExamineAction(),
            new StopHidingAction(),
        ];

        return actions;
    }

    /**
     * @inheritdoc
     */
    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "You are hidden",
        ]);
    }
}
