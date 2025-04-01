import { Room } from "../gameObjects/Room";
import { ActionResult } from "./ActionResult";

export class TeleportActionResult extends ActionResult {
    private _room: Room;

    public constructor(room: Room) {
        super();
        this._room = room;
    }

    public get room(): Room {
        return this._room;
    }
}
