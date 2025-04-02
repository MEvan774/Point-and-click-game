import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Examine } from "../../game-base/actions/ExamineAction";
import { ActionTypes } from "../../game-base/enums/ActionAlias";
import { Item } from "../../game-base/gameObjects/Item";
import { Room } from "../../game-base/gameObjects/Room";
import { gameService } from "../../global";
import { Drive } from "../actions/DriveAction";
import { Fuel } from "../actions/FuelAction";
import { WinScreenRoom } from "../rooms/WinScreenRoom";
import { PlayerSession } from "../types";

/**
 * The class for DiaryItem, inherts Item properties and uses actions Examine, PickUp.
 */
export class CarItem extends Item implements Examine, Fuel, Drive {
    public static readonly Alias: string = "car";
    /**
     * @param _action determines which action will be executed when clicked on.
     * @param _position determines where the hitbox will be located.
     * @param _size determines the size of the hibox
     * @param _isDebugHitboxVisible if true, makes the hitbox visible, false invisible.
     * @param validActions the options that will show up when clicked on.
     */
    public static readonly validActions: string[] = ["fuel", "drive"];
    public _position: Vector2 = { x: -430, y: 380 };
    public _size: Vector2 = { x: 305, y: 230 };
    public _isDebugHitboxVisible: boolean = false;
    public _action: ActionTypes = ActionTypes.Examine;

    public constructor() {
        super(CarItem.Alias, CarItem.validActions);
    }

    /**
     * Function to give the name of the item
     * @returns the name of the item
     */
    public name(): string {
        return "Car";
    }

    /**
     * Function examine an item or character
     * @returns a text based reaction to the action
     */
    public examine(): ActionResult | undefined {
        const playerSession: PlayerSession = gameService.getPlayerSession();
        if (playerSession.carFueled) {
            this.validActions.push("go to");
        }
        return new TextActionResult ([
            "This car looks like the perfect way to escape this hell hole!",
        ]);
    }

    /**
     * Function to pick up an item
     * @returns a text result based of the action / conditions
     */
    public fuel(): ActionResult | undefined {
        const playerSession: PlayerSession = gameService.getPlayerSession();
        if (playerSession.inventory.includes("fuelItem")) {
            playerSession.carFueled = true;
            this.validActions.push("drive");
            return new TextActionResult([
                "You successfully fueled the car! It's ready to drive.",
            ]);
        }
        else {
            return new TextActionResult([
                "You need to find fuel before you can drive this car.",
            ]);
        }
    }

    /**
     * Function to pick up an item
     * @returns a text result based on the action / conditions
     */
    public async drive(): Promise<ActionResult | undefined> {
        if (!gameService.getPlayerSession().escapedByCar) {
            const room: Room = new WinScreenRoom();
            gameService.getPlayerSession().currentRoom = room.alias;
            gameService.getPlayerSession().escapedByCar = true;
            // Wait 8.5 seconds
            await this.delay(8500);

            // Go to new room
            return room.examine();
        }
        return;
    }

    // Hulpfunctie om de vertraging te realiseren
    private delay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
