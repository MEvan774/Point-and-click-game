import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Action } from "../../game-base/actions/Action";
import { ExamineAction } from "../../game-base/actions/ExamineAction";
import { GameObject } from "../../game-base/gameObjects/GameObject";
import { Room } from "../../game-base/gameObjects/Room";
import { GoToAction } from "../actions/GoToAction";
import { HideAction } from "../actions/HideAction";
import { DoorBedroomBathroomItem } from "../items/doors/DoorBedroomBathroomItem";
import { DoorBedroomItem } from "../items/doors/DoorBedroomItem";
import { BedItem } from "../items/BedItem";
import { GoToStartupAction } from "../actions/GoToStartupAction";
import { ToStartupItem } from "../items/doors/ToStartupItem";
import { ToGameOverScreenItem } from "../items/ToGameOverScreenItem";
import { gameService } from "../../global";

/**
 * Implementation of the bedroom room
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
     * Shows the name of the room.
     * @inheritdoc
     */
    public name(): string {
        return "Bedroom";
    }

    /**
     * Shows the image of the room.
     * @inheritdoc
     */
    public images(): string[] {
        return ["bedroomRoom"];
    }

    /**
     * Shows all the available actions in the room
     * @inheritdoc
     */
    public actions(): Action[] {
        return [
            new ExamineAction(),
            new GoToAction(),
            new HideAction(),
            new GoToStartupAction(),
        ];
    }

    /**
     * @returns Objects in the room
     */
    public objects(): GameObject[] {
        return [
            new DoorBedroomItem(),
            new DoorBedroomBathroomItem(),
            new BedItem(),
            new ToStartupItem(),
            new ToGameOverScreenItem(),
        ];
    }

    /**
     * Shows the description of the room.
     * @inheritdoc
     */
    public examine(): ActionResult | undefined {
        if (gameService.getPlayerSession().usedFirstAid) {
            return new TextActionResult([
                "You survived, but used up the First aid kit!",
                "Next time, you won't be so lucky...",
            ]);
        }
        return new TextActionResult([
            "This is a bedroom.",
            "There are 2 doors.",
        ]);
    }
}
