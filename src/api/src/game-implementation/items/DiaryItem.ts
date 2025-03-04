import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Examine } from "../../game-base/actions/ExamineAction";
import { ActionTypes } from "../../game-base/enums/ActionAlias";
import { Item } from "../../game-base/gameObjects/Item";
import { gameService } from "../../global";
import { PickUp } from "../actions/PickUpAction";
import { Read } from "../actions/ReadAction";
import { PlayerSession } from "../types";

export class DiaryItem extends Item implements Examine, PickUp, Read {
    public static readonly Alias: string = "Diary";

    public static readonly validActions: string[] = ["examine", "pick up", "read"];
    public _position: Vector2 = { x: -50, y: 330 };
    public _size: Vector2 = { x: 90, y: 60 };
    public _isDebugHitboxVisible: boolean = false;
    public _action: ActionTypes = ActionTypes.PickUp;

    public constructor() {
        super(DiaryItem.Alias, DiaryItem.validActions);
    }

    public name(): string {
        return "Diary";
    }

    public examine(): ActionResult | undefined {
        const playerSession: PlayerSession = gameService.getPlayerSession();
        playerSession.isPickingUp = false;
        playerSession.readDiary = false;
        return new TextActionResult ([
            "This looks like a diary, maybe I need to pick it up.",
        ]);
    }

    public pickup(): ActionResult | undefined {
        const playerSession: PlayerSession = gameService.getPlayerSession();
        playerSession.isPickingUp = true;

        if (!playerSession.pickedUpDiary) {
            playerSession.inventory.push("DiaryItem");
            playerSession.pickedUpDiary = true;
            return new TextActionResult(["You have picked up the diary"]);
        }
        else {
            playerSession.isPickingUp = false;
            return new TextActionResult(["You have already picked up the diary."]);
        }
    }

    public read(): ActionResult | undefined {
        if (gameService.getPlayerSession().pickedUpDiary) {
            gameService.getPlayerSession().readDiary = true;
            return new TextActionResult([
                "You opened the diary and start to read",
            ]);
        }
        else {
            return new TextActionResult([
                "error",
            ]);
        }
    }
}
