import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Action } from "../../game-base/actions/Action";
import { ExamineAction } from "../../game-base/actions/ExamineAction";
import { GameObject } from "../../game-base/gameObjects/GameObject";
import { Room } from "../../game-base/gameObjects/Room";
import { GoToAction } from "../actions/GoToAction";
import { DiaryItem } from "../items/DiaryItem";
import { DoorOfficeHallwayItem } from "../items/DoorOfficeHallwayItem";

/**
 * Implemention of the storage room
 */
export class WorkRoom extends Room {
    /** Alias of this room */
    public static readonly Alias: string = "workroom";

    /**
     * Create a new instance of this room
     */
    public constructor() {
        super(WorkRoom.Alias);
    }

    /**
     * @inheritdoc
     */
    public name(): string {
        return "Work Room";
    }

    /**
     * @inheritdoc
     */
    public images(): string[] {
        const result: string[] = [];
        result.push("darkMirror");
        return result;
    }

    public objects(): GameObject[] {
        return [
            new DoorOfficeHallwayItem(),
            new DiaryItem(),
        ];
    }

    public actions(): Action[] {
        return [
            new ExamineAction(),
            new GoToAction(),
        ];
    }

    /**
     * @inheritdoc
     */
    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "You entered what seems to be the office",
            "Maybe there is a clue?",
        ]);
    }
}
