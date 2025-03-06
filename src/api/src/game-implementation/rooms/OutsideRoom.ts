import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Action } from "../../game-base/actions/Action";
import { ExamineAction } from "../../game-base/actions/ExamineAction";
import { GameObject } from "../../game-base/gameObjects/GameObject";
import { Room } from "../../game-base/gameObjects/Room";
import { GoToAction } from "../actions/GoToAction";
import { DoorOutsideFrontdoor } from "../items/DoorOutsideFrontdoor";
import { DoorOutsideShed } from "../items/DoorOutsideShed";

/**
 * Implemention of the bedroom room
 *
 * @remarks Used as the first room for new player sessions.
 */
export class OutsideRoom extends Room {
    public static readonly Alias: string = "outside";

    /**
     * Create a new instance of this room
     */
    public constructor() {
        super(OutsideRoom.Alias);
    }

    /**
     * @inheritdoc
     */
    public name(): string {
        return "Outside the castle";
    }

    /**
     * @inheritdoc
     */
    //    public images(): string[] {
    //        return ["outsideRoom"];
    //    }

    public actions(): Action[] {
        return [
            new ExamineAction(),
            new GoToAction(),
        ];
    }

    public objects(): GameObject[] {
        return [
            new DoorOutsideFrontdoor(),
            new DoorOutsideShed(),
        ];
    }

    /**
     * @inheritdoc
     */
    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "This is outside the castle.",
            "There is a shed that's half open.",
            "There is a fence that's locked.",
        ]);
    }
}
