import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Action } from "../../game-base/actions/Action";
import { ExamineAction } from "../../game-base/actions/ExamineAction";
import { GameObject } from "../../game-base/gameObjects/GameObject";
import { Room } from "../../game-base/gameObjects/Room";
import { gameService } from "../../global";
import { GoToAction } from "../actions/GoToAction";
import { DoorLivingRoomFrontDoorItem } from "../items/doors/DoorLivingRoomFrontDoorItem";
import { DoorLivingRoomKitchenItem } from "../items/doors/DoorLivingRoomKitchenItem";
import { EyesItem } from "../items/EyesItem";
import { HallwayRoom } from "./HallwayRoom";
import { KitchenRoom } from "./KitchenRoom";
import { TongueItem } from "../items/TongueItem";
import { PlayerSession } from "../types";
import { PickUpAction } from "../actions/PickUpAction";
import { ToStartupItem } from "../items/doors/ToStartupItem";
import { GoToStartupAction } from "../actions/GoToStartupAction";
import { ToGameOverScreenItem } from "../items/ToGameOverScreenItem";

/**
 * Implemention of the startup room
 *
 * @remarks Used as the first room for new player sessions.
 */
export class LivingRoom extends Room {
    /** Alias of this room */
    public static readonly Alias: string = "livingRoom";

    /**
     * Create a new instance of this room
     */
    public constructor() {
        super(LivingRoom.Alias);
    }

    /**
     * @inheritdoc
     */
    public name(): string {
        return "Living room";
    }

    /**
     * @inheritdoc
     */
    public images(): string[] {
        const roomStates: string[] = [];
        roomStates.push("LivingRoomLight");
        const playerSession: PlayerSession = gameService.getPlayerSession();

        if (!playerSession.inventory.includes("Eyes") && !playerSession.givenEyes)
            roomStates.push("EyesItem");

        if (!playerSession.inventory.includes("Tongue") && !playerSession.givenTongue)
            roomStates.push("TongueItem");

        return roomStates;
    }

    public objects(): GameObject[] {
        const playerSession: PlayerSession = gameService.getPlayerSession();
        const objects: GameObject[] = [];
        objects.push(new DoorLivingRoomFrontDoorItem());
        objects.push(new DoorLivingRoomKitchenItem());
        objects.push(new ToStartupItem());
        objects.push(new ToGameOverScreenItem());

        if (!playerSession.inventory.includes("Eyes") && !playerSession.givenEyes)
            objects.push(new EyesItem());

        if (!playerSession.inventory.includes("Tongue") && !playerSession.givenTongue)
            objects.push(new TongueItem());
        return objects;
    }

    /**
     * @inheritdoc
     */
    public actions(): Action[] {
        return [new ExamineAction(), new GoToAction(), new PickUpAction(), new GoToStartupAction()];
    }

    /**
     * @inheritdoc
     */
    public examine(): ActionResult | undefined {
        return new TextActionResult(["I cant see a thing! I need to find something to light up this room.",
        ]);
    }

    /**
         * @inheritdoc
         */
    public simple(alias: string): ActionResult | undefined {
        switch (alias) {
            case "corridor": {
                // TODO: Change this to the actual first room of the game
                const room: Room = new HallwayRoom();

                // Set the current room to the startup room
                gameService.getPlayerSession().currentRoom = room.alias;

                return room.examine();
            }
            case "kitchen": {
                // TODO: Change this to the actual first room of the game
                const room: Room = new KitchenRoom();

                // Set the current room to the startup room
                gameService.getPlayerSession().currentRoom = room.alias;

                return room.examine();
            }
        }
        return undefined;
    }
}
