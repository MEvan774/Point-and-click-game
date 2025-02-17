import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Examine } from "../../game-base/actions/ExamineAction";
import { Item } from "../../game-base/gameObjects/Item";
import { gameService } from "../../global";
import { PickUp } from "../actions/PickUpAction";

export class DiaryItem extends Item implements Examine, PickUp {
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
        gameService.getPlayerSession().walkedToDesk = true;

        return new TextActionResult([
            "You have picked up the diary.",
        ]);
    }
}
