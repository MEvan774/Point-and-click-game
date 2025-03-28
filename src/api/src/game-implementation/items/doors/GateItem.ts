import { Item } from "../../../game-base/gameObjects/Item";
import { Examine } from "../../../game-base/actions/ExamineAction";
import { ActionResult } from "../../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../../game-base/actionResults/TextActionResult";
import { GoTo } from "../../actions/GoToAction";
import { ActionTypes } from "../../../game-base/enums/ActionAlias";
import { Open } from "../../actions/OpenAction";
import { PlayerSession } from "../../types";
import { gameService } from "../../../global";
import { WinScreenRoom } from "../../rooms/WinScreenRoom";
import { Room } from "../../../game-base/gameObjects/Room";

/**
 * The item that is used to go to the OutsideRoom to the WinScreen
 *
 * @remarks Implements the Examine, GoTo and Open action
 */
export class GateItem extends Item implements Examine, GoTo, Open {
    // Alias of the item used to find the item
    public static readonly Alias: string = "GateItem";

    /**
     * _position: Position of the item's hitbox
     * _size: Size of the item's hitbox
     * _isDebugHitboxVisible: If true, shows the hitbox as a pink square
     * _action: Action that happens when clicked on the item's hitbox
     * validActions: Array of the alias of the actions that are possible for this item
     */
    public _position: Vector2 = { x: 175, y: 230 };
    public _size: Vector2 = { x: 225, y: 220 };
    public _isDebugHitboxVisible: boolean = false;
    public _action: ActionTypes = ActionTypes.Examine;
    public static readonly validActions: string[] = ["go to", "open"];

    // Create a new instance of this item
    public constructor() {
        super(GateItem.Alias, GateItem.validActions);
    }

    // Name of the item, shows up on the buttons for example
    public name(): string {
        return "Gate";
    }

    /**
     * Tells about the state of the gate
     *
     * @returns TextActionResult with the state of the gate (open/closed)
     */
    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "This gate is between you and your freedom...",
            "There must be a way to open it.",
        ]);
    }

    /**
     * Go to the WinScreen if opened, else tell the player it is locked
     *
     * @returns
     */
    public goto(): ActionResult | undefined {
        if (gameService.getPlayerSession().gateOpen) {
            const room: Room = new WinScreenRoom();

            gameService.getPlayerSession().currentRoom = room.alias;
            return room.examine();
        }

        return new TextActionResult(["It is locked."]);
    }

    /**
     * Opens the gate if the right item is selected, otherwise tells the user what they need to open the gate
     *
     * @returns TextActionResult about the state of the gate
     */
    public open(): ActionResult | undefined {
        const playerSession: PlayerSession = gameService.getPlayerSession();

        if (playerSession.gateOpen) {
            return new TextActionResult(["The gate is already open!"]);
        }

        if (playerSession.selectedItem === "GateKeyItem") {
            if (Math.random() < 1 / 3 && playerSession.gateItemsUsed !== 1) {
                playerSession.gateItemsUsed = 1;

                const index: number = playerSession.inventory.indexOf("GateKeyItem");
                if (index !== -1) {
                    playerSession.inventory.splice(index, 1);
                }

                return new TextActionResult([
                    "The key breaks!",
                    "You have to find another way to escape...",
                ]);
            }

            playerSession.gateOpen = true;
            return new TextActionResult([
                "You use the key on the gate.",
                "It fits!",
                "You open the gate.",
            ]);
        }

        if (playerSession.selectedItem === "MetalSawItem") {
            if (Math.random() < 1 / 3 && playerSession.gateItemsUsed !== 1) {
                playerSession.gateItemsUsed = 1;

                const index: number = playerSession.inventory.indexOf("MetalSawItem");
                if (index !== -1) {
                    playerSession.inventory.splice(index, 1);
                }

                return new TextActionResult([
                    "The saw is too weak to saw through the gate...",
                    "You toss it away.",
                    "Guess you should find another way to open the gate?",
                ]);
            }

            playerSession.gateOpen = true;
            return new TextActionResult([
                "After a long time of sawing the iron bars,",
                "You finally open the gate!",
                "You can escape now!",
            ]);
        }

        return new TextActionResult(["You should grab something to open the gate."]);
    }
}
