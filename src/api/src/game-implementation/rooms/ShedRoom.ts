import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Action } from "../../game-base/actions/Action";
import { Examine, ExamineAction } from "../../game-base/actions/ExamineAction";
import { TalkAction } from "../../game-base/actions/TalkAction";
import { GameObject } from "../../game-base/gameObjects/GameObject";
import { Room } from "../../game-base/gameObjects/Room";
import { gameService } from "../../global";
import { GoToAction } from "../actions/GoToAction";
import { OpenAction } from "../actions/OpenAction";
import { PressAction } from "../actions/PressAction";
import { CorpseCharacter } from "../characters/CorpseCharacter";
import { FreezerItem } from "../items/FreezerItem";
import { LightSwitchItem } from "../items/LightSwitchItem";
import { PlayerSession } from "../types";

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
        const playerSession: PlayerSession = gameService.getPlayerSession();
        if (playerSession.pressedLight) {
            result.push("ShedroomLight");
        }
        else {
            result.push("ShedroomDark");
        }

        // if (playerSession.walkedToFreezer && playerSession.openedFreezer) {
        //     result.push("Freezer");
        // }

        return result;
    }

    public objects(): GameObject[] {
        const objects: GameObject[] = [
            new LightSwitchItem(),
            new FreezerItem(),
        ];
        const playerSession: PlayerSession = gameService.getPlayerSession();
        if (playerSession.walkedToFreezer && playerSession.openedFreezer) {
            objects.push(new CorpseCharacter());
        }
        return objects;
    }

    public actions(): Action[] {
        const actions: Action[] = [];
        actions.push(new ExamineAction());
        actions.push(new GoToAction());
        actions.push(new TalkAction());
        actions.push(new PressAction());
        actions.push(new OpenAction());

        return actions;
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "This seems to be a shed, but it is very dark.",
            "Maybe I should find the light switch, or use my flashlight",
        ]);
    }
}
