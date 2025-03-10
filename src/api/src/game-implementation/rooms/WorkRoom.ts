import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Action } from "../../game-base/actions/Action";
import { Examine, ExamineAction } from "../../game-base/actions/ExamineAction";
import { GameObject } from "../../game-base/gameObjects/GameObject";
import { Room } from "../../game-base/gameObjects/Room";
import { gameService } from "../../global";
import { GoToAction } from "../actions/GoToAction";
import { DeskItem } from "../items/DeskItem";
import { DiaryItem } from "../items/DiaryItem";
import { DoorOfficeHallwayItem } from "../items/doors/DoorOfficeHallwayItem";
import { FirstAidItem } from "../items/FirstAidItem";
import { PlayerSession } from "../types";

/**
 * Implemention of the storage room
 */
export class WorkRoom extends Room implements Examine {
    /** Alias of this room */
    public static readonly Alias: string = "workroom";

    /**
     * Create a new instance of this room
     */
    public constructor() {
        super(WorkRoom.Alias);
    }

    /**
     * Function to declare the name of the room
     * @returns the name of the room
     */
    public name(): string {
        return "Work Room";
    }

    /**
     * Function to retrieve images for the room
     * @returns the image for in the room
     */
    public images(): string[] {
        const playerSession: PlayerSession = gameService.getPlayerSession();
        const result: string[] = [];
        if (playerSession.selectedItem === "DiaryItem") {
            result.push("diaryContent");
        }
        else {
            result.push("OfficeRoom");
        }
        return result;
    }

    /**
     * Function to retrieve all objects for in the room
     * @returns the objecs for in the room
     */
    public objects(): GameObject[] {
        const objects: GameObject[] = [
            new DeskItem(),
            new FirstAidItem(),
            new DiaryItem(),
            new DoorOfficeHallwayItem(),
        ];
        return objects;
    }

    /**
     * Function to retrieve all actions for in the room
     * @returns the actions for within the room
     */
    public actions(): Action[] {
        const actions: Action[] = [
            new ExamineAction(),
            new GoToAction(),
        ];
        return actions;
    }

    /**
     * Function to examine objects or characters within the room
     * @returns a text response based off the examine action
     */
    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "You entered what seems to be the office.",
            "Maybe there is a clue?",
        ]);
    }
}
