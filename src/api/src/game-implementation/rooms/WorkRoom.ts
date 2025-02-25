import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Action } from "../../game-base/actions/Action";
import { Examine, ExamineAction } from "../../game-base/actions/ExamineAction";
import { GameObject } from "../../game-base/gameObjects/GameObject";
import { Room } from "../../game-base/gameObjects/Room";
import { gameService } from "../../global";
import { GoToAction } from "../actions/GoToAction";
import { PickUp, PickUpAction } from "../actions/PickUpAction";
import { ReadAction } from "../actions/ReadAction";
import { DeskItem } from "../items/DeskItem";
import { DiaryItem } from "../items/DiaryItem";
import { DoorOfficeHallwayItem } from "../items/DoorOfficeHallwayItem";
import { PlayerSession } from "../types";

/**
 * Implemention of the storage room
 */
export class WorkRoom extends Room implements Examine, PickUp {
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
        if (playerSession.walkedToDesk && playerSession.pickedUpDiary && playerSession.readDiary) {
            result.push("diaryContent");
        }
        else if (playerSession.walkedToDesk && !playerSession.pickedUpDiary) {
            result.push("OfficeRoom");
        }
        else {
            result.push("OfficeRoom");
        }
        return result;
    }

    public objects(): GameObject[] {
        const objects: GameObject[] = [];

        objects.push(new DoorOfficeHallwayItem());

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
            new PickUpAction(),
        ];

        const playerSession: PlayerSession = gameService.getPlayerSession();

        if (playerSession.walkedToDesk && !playerSession.pickedUpDiary) {
            actions.push(new PickUpAction());
        }

        if (playerSession.walkedToDesk && playerSession.pickedUpDiary) {
            actions.push(new ReadAction());
        }
        return actions;
    }

    public pickup(): ActionResult | undefined {
        const playerSession: PlayerSession = gameService.getPlayerSession();

        if (!playerSession.pickedUpDiary) {
            playerSession.inventory.push("DiaryItem");

            return new TextActionResult([
                "You have picked up the diary",
            ]);
        }
        else {
            return new TextActionResult([
                "You have already picked up the diary.",
            ]);
        }
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
