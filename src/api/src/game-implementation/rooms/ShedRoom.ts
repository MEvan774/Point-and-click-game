import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Action } from "../../game-base/actions/Action";
import { Examine, ExamineAction } from "../../game-base/actions/ExamineAction";
import { TalkAction } from "../../game-base/actions/TalkAction";
import { GameObject } from "../../game-base/gameObjects/GameObject";
import { Room } from "../../game-base/gameObjects/Room";
import { gameService } from "../../global";
import { DriveAction } from "../actions/DriveAction";
import { FuelAction } from "../actions/FuelAction";
import { GoToAction } from "../actions/GoToAction";
import { GoToStartupAction } from "../actions/GoToStartupAction";
import { HideAction } from "../actions/HideAction";
import { OpenAction } from "../actions/OpenAction";
import { PressAction } from "../actions/PressAction";
import { CorpseCharacter } from "../characters/CorpseCharacter";
import { CarItem } from "../items/CarItem";
import { CarKeyItem } from "../items/CarKeyItem";
import { CenterStorageLeftItem } from "../items/CenterStorageLeftItem";
import { CenterStorageRightItem } from "../items/CenterStorageRightItem";
import { DoorShedOutside } from "../items/doors/DoorShedOutside";
import { ToStartupItem } from "../items/doors/ToStartupItem";
import { FreezerItem } from "../items/FreezerItem";
import { LightSwitchItem } from "../items/LightSwitchItem";
import { ToGameOverScreenItem } from "../items/ToGameOverScreenItem";
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
        if (playerSession.pressedLight && !playerSession.openedFreezer) {
            result.push("ShedroomLight");
        }
        if (playerSession.openedFreezer) {
            result.push("Freezer");
        }
        else if (!playerSession.pressedLight) {
            result.push("ShedroomDark");
        }
        return result;
    }

    public objects(): GameObject[] {
        const objects: GameObject[] = [
            new LightSwitchItem(),
            new FreezerItem(),
            new DoorShedOutside(),
            new ToStartupItem(),
            new ToGameOverScreenItem(),
        ];
        const playerSession: PlayerSession = gameService.getPlayerSession();
        if (playerSession.openedFreezer) {
            objects.push(
                new CorpseCharacter(),
                new CenterStorageLeftItem(),
                new CenterStorageRightItem()
            );
        }
        else {
            objects.push(
                new LightSwitchItem(),
                new FreezerItem(),
                new CarItem(),
                new DoorShedOutside()
            );
        }

        if (playerSession.inventory.includes("FuelItem")) {
            objects.push(new CarKeyItem());
        }
        return objects;
    }

    public actions(): Action[] {
        const actions: Action[] = [
            new ExamineAction(),
            new GoToAction(),
            new TalkAction(),
            new PressAction(),
            new HideAction(),
            new OpenAction(),
            new GoToStartupAction(),
        ];

        const playerSession: PlayerSession = gameService.getPlayerSession();

        if (playerSession.selectedItem === "FuelItem" && !playerSession.inventory.includes("CarKeyItem")) {
            actions.push(new FuelAction());
        }
        if (playerSession.selectedItem === "CarKeyItem") {
            actions.push(new DriveAction());
        }

        return actions;
    }

    public examine(): ActionResult | undefined {
        const playerSession: PlayerSession = gameService.getPlayerSession();
        playerSession.walkedToFreezer = false;
        playerSession.openedFreezer = false;
        return new TextActionResult([
            "This seems to be a shed, but it is very dark.",
            "Maybe I should find the light switch.",
        ]);
    }
}
