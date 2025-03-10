import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { Examine } from "../../game-base/actions/ExamineAction";
import { Item } from "../../game-base/gameObjects/Item";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { gameService } from "../../global";
import { PlayerSession } from "../types";
import { GoTo } from "../actions/GoToAction";
import { ActionTypes } from "../../game-base/enums/ActionAlias";

export class BathroomItem extends Item implements Examine, GoTo {
    public static readonly Alias: string = "Bathtub";
    public _action: ActionTypes = ActionTypes.Examine;
    public _position: Vector2 = { x: -152, y: 287 };
    public _size: Vector2 = { x: 288, y: 100 };
    public _isDebugHitboxVisible: boolean = true;

    public static readonly validActions: string[] = [ActionTypes.GoTo];

    public constructor() {
        super(BathroomItem.Alias, BathroomItem.validActions);
    }

    // Returns the name of the item.
    public name(): string {
        return "Bathtub";
    }

    /**
     * Tell the player a bit about the room.
     *
     * @returns TextActionResult with information about the item
     */
    public examine(): ActionResult | undefined {
        const playerSession: PlayerSession = gameService.getPlayerSession();
        playerSession.walkedToBathtub = false;
        playerSession.pickedUpKey = false;
        return new TextActionResult([
            "There is a bathtub in the bathroom, obviously.",
        ]);
    }

    /**
     * Go to the bathtub in the bathroomRoom.
     * @returns
     */
    public goto(): ActionResult | undefined {
        const playerSession: PlayerSession = gameService.getPlayerSession();
        playerSession.walkedToBathtub = true;
        return new TextActionResult(["You walk to the bathtub."]);
    }
}
