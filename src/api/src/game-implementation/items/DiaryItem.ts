import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Examine } from "../../game-base/actions/ExamineAction";
import { Item } from "../../game-base/gameObjects/Item";
import { gameService } from "../../global";
import { PickUp } from "../actions/PickUpAction";
import { Read } from "../actions/ReadAction";

export class DiaryItem extends Item implements Examine, PickUp, Read {
    public static readonly Alias: string = "Diary";

    public constructor() {
        super(DiaryItem.Alias);
    }

    public name(): string {
        return "Diary";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult ([
            "This looks like a diary, maybe I need to pick it up.",
        ]);
    }

    public pickup(): ActionResult | undefined {
        gameService.getPlayerSession().pickedUpDiary = true;
        return new TextActionResult([
            "You have picked up the diary.",
        ]);
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
