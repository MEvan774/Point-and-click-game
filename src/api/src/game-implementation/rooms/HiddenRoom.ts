import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Action } from "../../game-base/actions/Action";
import { GameObject } from "../../game-base/gameObjects/GameObject";
import { Room } from "../../game-base/gameObjects/Room";
import { ExamineAction } from "../../game-base/actions/ExamineAction";
import { StopHidingItem } from "../items/StopHidingItem";
import { StopHidingAction } from "../actions/StopHidingAction";
import { gameService } from "../../global";
import { ToStartupItem } from "../items/doors/ToStartupItem";
import { GoToStartupAction } from "../actions/GoToStartupAction";

/**
 * Implemention of the storage room
 */
export class HiddenRoom extends Room {
    // Alias of this room
    public static readonly Alias: string = "HiddenRoom";

    // Create a new instance of this room
    public constructor() {
        super(HiddenRoom.Alias);
    }

    // Name of the room, used for buttons for example
    public name(): string {
        return "Hiding";
    }

    // Images for the room
    public images(): string[] {
        return ["LivingRoomdark"];
    }

    /**
     * The objects in the Room
     *
     * @returns Array of the GameObjects in the Room
     */
    public objects(): GameObject[] {
        const objects: GameObject[] = [];

        objects.push(new StopHidingItem());
        objects.push(new ToStartupItem());

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
            new StopHidingAction(),
            new GoToStartupAction(),
        ];

        return actions;
    }

    /**
     * Tells about the state of the Room
     *
     * @inheritdoc
     */
    public examine(): ActionResult | undefined {
        const room: string = gameService.getPlayerSession().hiddenIn;

        // Checks if hidden in the StorageRoom
        if (room === "StorageRoom") {
            return new TextActionResult([
                "You are hidden in the closet",
            ]);
        }
        else {
            // Checks if the player is hidden in the Bedroom
            if (room === "bedroom") {
                return new TextActionResult([
                    "You are hidden under the bed",
                ]);
            }

            // If no room is found
            return new TextActionResult([
                "You are hidden",
            ]);
        }
    }
}
