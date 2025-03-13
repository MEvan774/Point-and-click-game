import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Action } from "../../game-base/actions/Action";
import { Examine, ExamineAction } from "../../game-base/actions/ExamineAction";
import { TalkAction } from "../../game-base/actions/TalkAction";
import { GameObject } from "../../game-base/gameObjects/GameObject";
import { Room } from "../../game-base/gameObjects/Room";
import { GoToAction } from "../actions/GoToAction";
import { CorpseCharacter } from "../characters/CorpseCharacter";
import { FreezerItem } from "../items/FreezerItem";

export class ShedRoom extends Room implements Examine {
    public static readonly Alias: string = "Shed";

    public constructor() {
        super(ShedRoom.Alias);
    }

    public name(): string {
        return "Shed";
    }

    public images(): string[] {
        const result: string[] = [];

        result.push("ShedroomDark");

        return result;
    }

    public objects(): GameObject[] {
        const objects: GameObject[] = [
            new CorpseCharacter(),
            new FreezerItem(),
        ];
        return objects;
    }

    public actions(): Action[] {
        const actions: Action[] = [];
        actions.push(new ExamineAction());
        actions.push(new GoToAction());
        actions.push(new TalkAction());

        return actions;
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "This seems to be a shed, but it is very dark.",
            "Maybe I should find the light switch, or use my flashlight",
        ]);
    }
}
