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
import { PlayerSession } from "../types";
import { EyeCharacter } from "../characters/EyeCharacter";
import { TalkAction } from "../../game-base/actions/TalkAction";

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
     * Shows the name of the room.
     * @inheritdoc
     */
    public name(): string {
        return "Bathroom";
    }

    /**
     * Shows the images of the room, according to the player's actions.
     * @inheritdoc
     */
    public images(): string[] {
        const playerSession: PlayerSession = gameService.getPlayerSession();
        const result: string[] = [];

        if (playerSession.walkedToBathtub && !playerSession.pickedUpKey) {
            result.push("bathtubKeyItem");
        }
        else if (playerSession.pickedUpKey) {
            result.push("bathroomRoomPickedUp");
        }
        else if (playerSession.isPickingUpkey && playerSession.walkedToBathtub) {
            result.push("bathtubKeyItemPickedUp");
        }
        else {
            result.push("bathroomRoom");
        }
        return result;
    }

    /**
     * @returns Objects in the room.
     */
    public objects(): GameObject[] {
        const objects: GameObject[] = [
            new DoorBathroomBedroomItem(),
            new BathroomItem(),
        ];
        const playerSession: PlayerSession = gameService.getPlayerSession();

        if (playerSession.walkedToBathtub) {
            objects.push(new EyeCharacter());
        }

        return objects;
    }

    /**
     * Show all the available actions in the room.
     * @inheritdoc
     */
    public actions(): Action[] {
        const actions: Action[] = [
            new ExamineAction(),
            new GoToAction(),
        ];

        const playerSession: PlayerSession = gameService.getPlayerSession();

        if (playerSession.walkedToBathtub) {
            actions.push(new TalkAction());
        }

        return actions;
    }

    /**
     * Describe the room.
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
