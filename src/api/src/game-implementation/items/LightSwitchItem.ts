import { ActionTypes } from "../../game-base/enums/ActionAlias";
import { Item } from "../../game-base/gameObjects/Item";
import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { Examine } from "../../game-base/actions/ExamineAction";
import { Press } from "../actions/PressAction";
import { PlayerSession } from "../types";
import { gameService } from "../../global";

export class LightSwitchItem extends Item implements Examine, Press {
    /**
     * _position: Position of the item's hitbox
     * _size: Size of the item's hitbox
     * _isDebugHitboxVisible: If true, shows the hitbox as a pink square
     * _action: Action that happens when clicked on the item's hitbox
     * validActions: Array of the alias of the actions that are possible for this item
     */
    public static readonly Alias: string = "LightSwitch";
    public static readonly ValidActions: string[] = ["press"];
    public _position: Vector2 = { x: 195, y: 315 };
    public _size: Vector2 = { x: 60, y: 60 };
    public _isDebugHitboxVisible: boolean = false;
    public _action: ActionTypes = ActionTypes.Examine;

    public constructor() {
        super(LightSwitchItem.Alias, LightSwitchItem.ValidActions);
    }

    public name(): string {
        return "Light switch";
    }

    public examine(): ActionResult | undefined {
        const playerSession: PlayerSession = gameService.getPlayerSession();
        if (!playerSession.clickedLight) {
            playerSession.clickedLight = true;
            return new TextActionResult([
                "This looks like it could turn on the light.",
                "Let's try it.",
            ]);
        }
        else if (!playerSession.pressedLight) {
            return this.press();
        }
        else {
            playerSession.pressedLight = false;
            return new TextActionResult([
                "You turn the light off.",
            ]);
        }
    }

    public press(): ActionResult | undefined {
        const playerSession: PlayerSession = gameService.getPlayerSession();
        playerSession.pressedLight = true;
        return new TextActionResult([
            "You press the light switch,",
        ]);
    }
}
