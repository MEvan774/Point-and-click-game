import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Action } from "../../game-base/actions/Action";
import { ExamineAction } from "../../game-base/actions/ExamineAction";
import { GameObject } from "../../game-base/gameObjects/GameObject";
import { Room } from "../../game-base/gameObjects/Room";
import { GoToAction } from "../actions/GoToAction";
import { DoorBathroomBedroomItem } from "../items/DoorBathroomBedroomItem";

/**
 * Implemention of the bathroom room
 *
 * @remarks Used as the first room for new player sessions.
 */
export class BathroomRoom extends Room {
    public static readonly Alias: string = "bathroom";

    /**
     * Create a new instance of this room
     */
    public constructor() {
        super(BathroomRoom.Alias);
    }

    /**
     * @inheritdoc
     */
    public name(): string {
        return "Bathroom";
    }

    /**
     * @inheritdoc
     */
    public images(): string[] {
        return ["bathroomRoom"];
    }

    public objects(): GameObject[] {
        return [
            new DoorBathroomBedroomItem(),
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
            "This is a bathroom.",
            "...",
        ]);
    }
}
