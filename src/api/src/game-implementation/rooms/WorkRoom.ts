import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Action } from "../../game-base/actions/Action";
import { Examine, ExamineAction } from "../../game-base/actions/ExamineAction";
import { GameObject } from "../../game-base/gameObjects/GameObject";
import { Room } from "../../game-base/gameObjects/Room";
import { gameService } from "../../global";
import { GoToAction } from "../actions/GoToAction";
import { PickUpAction } from "../actions/PickUpAction";
import { ReadAction } from "../actions/ReadAction";
import { DeskItem } from "../items/DeskItem";
import { DiaryItem } from "../items/DiaryItem";
import { DoorOfficeHallwayItem } from "../items/DoorOfficeHallwayItem";
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
     * @inheritdoc
     */
    public name(): string {
        return "Work Room";
    }

    /**
     * @inheritdoc
     */
    public images(): string[] {
        const playerSession: PlayerSession = gameService.getPlayerSession();
        const result: string[] = [];
        if (playerSession.walkedToDesk && playerSession.readDiary && playerSession.pickedUpDiary) {
            result.push("diaryContent");
        }
        else if (playerSession.walkedToDesk && !playerSession.pickedUpDiary && !playerSession.readDiary) {
            result.push("OfficeRoom");
        }
        else {
            result.push("OfficeRoom");
        }
        return result;
    }

    public objects(): GameObject[] {
        const objects: GameObject[] = [
            new DeskItem(),
        ];

        const playerSession: PlayerSession = gameService.getPlayerSession();

        if (playerSession.walkedToDesk) {
            objects.push(new DiaryItem());
        }
        if (!playerSession.isPickingUp) {
            objects.push(new DoorOfficeHallwayItem());
        }

        return objects;
    }

    public actions(): Action[] {
        const actions: Action[] = [
            new ExamineAction(),
            new GoToAction(),
        ];

        const playerSession: PlayerSession = gameService.getPlayerSession();

        if (playerSession.walkedToDesk && playerSession.pickedUpDiary) {
            actions.push(new ReadAction());
        }
        if (playerSession.walkedToDesk && !playerSession.isPickingUp && !playerSession.pickedUpDiary) {
            actions.push(new PickUpAction());
        }
        return actions;
    }

    public read(): ActionResult | undefined {
        return new TextActionResult([
            "You have started to read the diary",
        ]);
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
