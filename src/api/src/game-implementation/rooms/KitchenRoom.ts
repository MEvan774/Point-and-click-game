import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Action } from "../../game-base/actions/Action";
import { ExamineAction } from "../../game-base/actions/ExamineAction";
import { TalkAction } from "../../game-base/actions/TalkAction";
import { GameObject } from "../../game-base/gameObjects/GameObject";
import { Room } from "../../game-base/gameObjects/Room";
import { gameService } from "../../global";
import { GoToAction } from "../actions/GoToAction";
import { GhostCharacter } from "../characters/GhostCharacter";
import { DoorKitchenLivingRoomItem } from "../items/DoorKitchenLivingRoomItem";
import { LivingRoom } from "./LivingRoom";

/**
 * Implemention of the startup room
 *
 * @remarks Used as the first room for new player sessions.
 */
export class KitchenRoom extends Room {
    /** Alias of this room */
    public static readonly Alias: string = "kitchenRoom";

    /**
     * Create a new instance of this room
     */
    public constructor() {
        super(KitchenRoom.Alias);
    }

    /**
     * @inheritdoc
     */
    public name(): string {
        return "kitchen room";
    }

    /**
     * @inheritdoc
     */
    public images(): string[] {
        return ["LivingRoomDark"];
    }

    public objects(): GameObject[] {
        return [
            new DoorKitchenLivingRoomItem(), new GhostCharacter(),
        ];
    }

    /**
     * @inheritdoc
     */
    public actions(): Action[] {
        return [new ExamineAction(), new GoToAction(), new TalkAction()];
    }

    /**
     * @inheritdoc
     */
    public examine(): ActionResult | undefined {
        return new TextActionResult(["I smell a strong rotting smell... I feel sick.",
        ]);
    }

    /**
         * @inheritdoc
         */
    public simple(alias: string): ActionResult | undefined {
        if (alias === "livingRoom") {
            // TODO: Change this to the actual first room of the game
            const room: Room = new LivingRoom();

            // Set the current room to the startup room
            gameService.getPlayerSession().currentRoom = room.alias;

            return room.examine();
        }

        return undefined;
    }
}
