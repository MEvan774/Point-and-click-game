/**
 * Base class used to represent a game object
 */

import { ActionTypes } from "../enums/ActionAlias";

export abstract class GameObject {
    /** Alias of this game object */

    /** Sets what kind of action this object will excecute.
     * If new actions are added, the ActionAlias.ts has to be edited in the enums folder
     * by adding the new action alias from the action class.
     */
    public _action: ActionTypes = ActionTypes.GoTo;
    private _alias: string;
    public _position: Vector2 = { x: 0, y: 0 };
    public _size: Vector2 = { x: 0, y: 0 };
    /** Makes the hitbox visible for debugging */
    public _isDebugHitboxVisible: boolean = false;

    /**
     * Create a new instance of this game object
     *
     * @param alias Alias of this game object
     */
    protected constructor(alias: string) {
        this._alias = alias;
    }

    /**
     * Get the alias of this game object
     */
    public get alias(): string {
        return this._alias;
    }

    /**
     * Get the name of this game object
     */
    public abstract name(): SyncOrAsync<string>;
}
