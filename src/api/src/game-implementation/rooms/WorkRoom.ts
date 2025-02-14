import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Action } from "../../game-base/actions/Action";
import { ExamineAction } from "../../game-base/actions/ExamineAction";
import { GameObject } from "../../game-base/gameObjects/GameObject";
import { Room } from "../../game-base/gameObjects/Room";
import { gameService } from "../../global";
import { GoToAction } from "../actions/GoToAction";
import { PickUpAction } from "../actions/PickUpAction";
import { DeskItem } from "../items/DeskItem";
import { DiaryItem } from "../items/DiaryItem";
import { DoorOfficeHallwayItem } from "../items/DoorOfficeHallwayItem";
import { PlayerSession } from "../types";

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
        const objects: GameObject[] = [
            new DoorOfficeHallwayItem(),
        ];
        const playerSession: PlayerSession = gameService.getPlayerSession();
        if (playerSession.walkedToDesk) {
            objects.push(new DiaryItem());
        }
        else {
            objects.push(new DeskItem());
        }
        return objects;
    }

    public actions(): Action[] {
        const actions: Action[] = [
            new ExamineAction(),
            new GoToAction(),
        ];
        const playerSession: PlayerSession = gameService.getPlayerSession();

        if (playerSession.walkedToDesk) {
            actions.push(new PickUpAction());
        }

        return actions;
    }

    /**
     * @inheritdoc
     */
    public examine(): ActionResult | undefined {
        gameService.getPlayerSession().walkedToDesk = false;

        return new TextActionResult([
            "You entered what seems to be the office.",
            "Maybe there is a clue?",
        ]);
    }
}
