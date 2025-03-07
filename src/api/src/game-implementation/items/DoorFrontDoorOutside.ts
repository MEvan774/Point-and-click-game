import { Item } from "../../game-base/gameObjects/Item";
import { Examine } from "../../game-base/actions/ExamineAction";
import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { GoTo } from "../actions/GoToAction";
import { ActionTypes } from "../../game-base/enums/ActionAlias";
import { PlayerSession } from "../types";
import { gameService } from "../../global";
import { OutsideRoom } from "../rooms/OutsideRoom";
import { Room } from "../../game-base/gameObjects/Room";
import { Open } from "../actions/OpenAction";

export class DoorFrontDoorOutsideItem extends Item implements Examine, GoTo, Open {
    public static readonly Alias: string = "DoorFrontDoorOutsideItem";

    public _position: Vector2 = { x: -110, y: 139 };
    public _size: Vector2 = { x: 190, y: 245 };
    public _isDebugHitboxVisible: boolean = false;
    public _action: ActionTypes = ActionTypes.Examine;
    public static readonly validActions: string[] = ["go to", "open"];

    public constructor() {
        super(DoorFrontDoorOutsideItem.Alias, DoorFrontDoorOutsideItem.validActions);
    }

    public name(): string {
        return "Outside";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "This is the door to get outside.",
            "It is locked.",
            "Seems like you need a key and something to get the planks of the door.",
        ]);
    }

    public goto(): ActionResult | undefined {
        const playerSession: PlayerSession = gameService.getPlayerSession();

        if (playerSession.planksGone && playerSession.outsideKeyUsed) {
            const room: Room = new OutsideRoom();

            gameService.getPlayerSession().currentRoom = room.alias;
            return room.examine();
        }

        if (playerSession.planksGone) {
            return new TextActionResult([
                "The planks are gone, but you still need to find a key.",
            ]);
        }

        if (playerSession.outsideKeyUsed) {
            return new TextActionResult([
                "You still have to get rid of the planks to go outside.",
            ]);
        }

        return new TextActionResult([
            "Its locked, you should find a key and something to get the planks of the door.",
        ]);
    }

    public open(): ActionResult | undefined {
        const playerSession: PlayerSession = gameService.getPlayerSession();

        if (playerSession.selectedItem === "OutsideKeyItem" && playerSession.planksGone) {
            playerSession.outsideKeyUsed = true;

            return new TextActionResult([
                "You use the key on the door...",
                "It fits!",
                "The door is now open!",
            ]);
        }

        if (playerSession.selectedItem === "OutsideKeyItem") {
            playerSession.outsideKeyUsed = true;

            return new TextActionResult([
                "You use the key on the door...",
                "It fits!",
                "Now you only have to get rid of the planks.",
            ]);
        }

        if (playerSession.selectedItem === "CrowbarItem" && playerSession.outsideKeyUsed) {
            playerSession.planksGone = true;

            return new TextActionResult([
                "You take the planks of the door using the crowbar you found.",
                "The door is now open!",
                "You can go outside from now.",
            ]);
        }

        if (playerSession.selectedItem === "CrowbarItem") {
            playerSession.planksGone = true;

            return new TextActionResult([
                "You take the planks of the door using the crowbar you found.",
                "Now you only have to find a key that fits...",
            ]);
        }

        if (playerSession.outsideKeyUsed && playerSession.planksGone) {
            return new TextActionResult(["The door is already open..."]);
        }

        if (playerSession.selectedItem === "KeyItem") {
            return new TextActionResult([
                "You try to open the door with the key you found...",
                "It doesn't fit.",
                "Try finding another key.",
            ]);
        }

        return new TextActionResult(["You should use a key and something to get rid of the planks."]);
    }
}
