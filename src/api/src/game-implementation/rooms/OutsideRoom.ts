import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Action } from "../../game-base/actions/Action";
import { ExamineAction } from "../../game-base/actions/ExamineAction";
import { GameObject } from "../../game-base/gameObjects/GameObject";
import { Room } from "../../game-base/gameObjects/Room";
import { GoToAction } from "../actions/GoToAction";
import { GoToStartupAction } from "../actions/GoToStartupAction";
import { OpenAction } from "../actions/OpenAction";
import { DoorOutsideFrontdoor } from "../items/doors/DoorOutsideFrontdoor";
import { DoorOutsideShed } from "../items/doors/DoorOutsideShed";
import { GateItem } from "../items/doors/GateItem";
import { ToStartupItem } from "../items/doors/ToStartupItem";

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
    public images(): string[] {
        return ["Outside"];
    }

    public actions(): Action[] {
        return [
            new ExamineAction(),
            new GoToAction(),
            new OpenAction(),
            new GoToStartupAction(),
        ];
    }

    public objects(): GameObject[] {
        return [
            new DoorOutsideFrontdoor(),
            new DoorOutsideShed(),
            new GateItem(),
            new ToStartupItem(),
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
