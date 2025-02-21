import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Action } from "../../game-base/actions/Action";
import { ExamineAction } from "../../game-base/actions/ExamineAction";
import { GameObject } from "../../game-base/gameObjects/GameObject";
import { Room } from "../../game-base/gameObjects/Room";
import { GoToAction } from "../actions/GoToAction";
import { OpenAction } from "../actions/OpenAction";
import { DoorBedroomBathroomItem } from "../items/DoorBedroomBathroomItem";
import { DoorBedroomItem } from "../items/DoorBedroomItem";

/**
 * Implemention of the bedroom room
 *
 * @remarks Used as the first room for new player sessions.
 */
export class BedroomRoom extends Room {
    public static readonly Alias: string = "bedroom";

    /**
     * Create a new instance of this room
     */
    public constructor() {
        super(BedroomRoom.Alias);
    }

    /**
     * @inheritdoc
     */
    public name(): string {
        return "Bedroom";
    }

    /**
     * @inheritdoc
     */
    public images(): string[] {
        return ["bedroomRoom"];
    }

    public actions(): Action[] {
        return [
            new ExamineAction(),
            new OpenAction(),
            new GoToAction(),
        ];
    }

    public objects(): GameObject[] {
        return [
            new DoorBedroomItem(),
            new DoorBedroomBathroomItem(),
        ];
    }

    /**
     * @inheritdoc
     */
    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "This is a bedroom.",
            "There are 2 doors.",
        ]);
    }
}
