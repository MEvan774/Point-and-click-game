import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Action } from "../../game-base/actions/Action";
import { Examine, ExamineAction } from "../../game-base/actions/ExamineAction";
import { GameObject } from "../../game-base/gameObjects/GameObject";
import { Room } from "../../game-base/gameObjects/Room";
import { gameService } from "../../global";
import { GoToAction } from "../actions/GoToAction";
import { DoorBathroomBedroomItem } from "../items/DoorBathroomBedroomItem";
import { BathroomItem } from "../items/BathroomItem";
import { BathtubItem } from "../items/BathtubItem";
import { PlayerSession } from "../types";
import { PickUpAction } from "../actions/PickUpAction";

/**
 * Implementation of the bathroom room
 */
export class BathroomRoom extends Room implements Examine {
    public static readonly Alias: string = "bathroom";

    /**
     * Create a new instance of this room
     */
    public constructor() {
        super(BathroomRoom.Alias);
    }

    /**
     * @inheritdoc
     */
    public name(): string {
        return "Bathroom";
    }

    /**
     * @inheritdoc
     */
    public images(): string[] {
        const playerSession: PlayerSession = gameService.getPlayerSession();
        const result: string[] = [];

        if (playerSession.walkedToBathtub && !playerSession.isPickingUpkey) {
            result.push("bathtubKeyItem");
        }
        else {
            result.push("bathroomRoom");
        }
        return result;
    }

    public objects(): GameObject[] {
        const objects: GameObject[] = [
            new DoorBathroomBedroomItem(),
            new BathroomItem(), // This should represent the bathtub
        ];
        const playerSession: PlayerSession = gameService.getPlayerSession();

        if (playerSession.walkedToBathtub) {
            objects.push(new BathtubItem()); // This represents the key inside the bathtub
        }
        return objects;
    }

    public actions(): Action[] {
        const actions: Action[] = [
            new ExamineAction(),
            new GoToAction(),
        ];

        const playerSession: PlayerSession = gameService.getPlayerSession();

        if (playerSession.walkedToBathtub && !playerSession.isPickingUpkey) {
            actions.push(new PickUpAction());
        }

        return actions;
    }

    /**
     * @inheritdoc
     */
    public examine(): ActionResult | undefined {
        gameService.getPlayerSession().walkedToBathtub = false;
        return new TextActionResult([
            "This is a bathroom.",
            "...",
        ]);
    }
}
