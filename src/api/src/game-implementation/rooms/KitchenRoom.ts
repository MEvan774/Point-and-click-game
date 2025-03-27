import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Action } from "../../game-base/actions/Action";
import { ExamineAction } from "../../game-base/actions/ExamineAction";
import { TalkAction } from "../../game-base/actions/TalkAction";
import { GameObject } from "../../game-base/gameObjects/GameObject";
import { Room } from "../../game-base/gameObjects/Room";
import { gameService } from "../../global";
import { GoToAction } from "../actions/GoToAction";
import { TasteAction } from "../actions/TasteAction";
import { GhostCharacter } from "../characters/GhostCharacter";
import { DoorKitchenLivingRoomItem } from "../items/doors/DoorKitchenLivingRoomItem";
import { PanItem } from "../items/PanItem";
import { PlayerSession } from "../types";
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
     * name of the room
     * @inheritdoc
     */
    public name(): string {
        return "kitchen room";
    }

    /**
     * Image of the room
     * @inheritdoc
     */
    public images(): string[] {
        const roomStates: string[] = [];
        roomStates.push("KitchenRoom");
        const playerSession: PlayerSession = gameService.getPlayerSession();

        if (playerSession.inventory.includes("CrowbarItem"))
            roomStates.push("PanItem");
        return roomStates;
    }

    /**
     * @returns Objects in the room
     */
    public objects(): GameObject[] {
        const gameObjects: GameObject[] = [];
        gameObjects.push(new DoorKitchenLivingRoomItem(), new GhostCharacter());
        const playerSession: PlayerSession = gameService.getPlayerSession();

        if (playerSession.inventory.includes("CrowbarItem"))
            gameObjects.push(new PanItem());

        return gameObjects;
    }

    /**
     * all the available actions in the room
     * @inheritdoc
     */
    public actions(): Action[] {
        return [new ExamineAction(), new GoToAction(), new TalkAction(), new TasteAction()];
    }

    /**
     * Describes the room when player enters it
     * @inheritdoc
     */
    public examine(): ActionResult | undefined {
        return new TextActionResult(["You smell a strong rotting smell...",
            "You begin to feel sick.",
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
