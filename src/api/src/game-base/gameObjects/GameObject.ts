/**
 * Base class used to represent a game object
 */

import { ActionTypes } from "../enums/ActionAlias";

export abstract class GameObject {
    /** Alias of this game object */

    /**
     * @param _action determines which action will be executed when clicked on.
     * @param _position determines where the hitbox will be located.
     * @param _size determines the size of the hibox
     * @param _isDebugHitboxVisible if true, makes the hitbox visible, false invisible.
     * @param _validActions the options that will show up when clicked on.
     */
    public _action: ActionTypes = ActionTypes.GoTo;
    private _alias: string;
    public _position: Vector2 = { x: 0, y: 0 };
    public _size: Vector2 = { x: 0, y: 0 };
    public _isDebugHitboxVisible: boolean = false;
    private _validActions: string[];

    /**
     * Create a new instance of this game object
     *
     * @param alias Alias of this game object
     */
    protected constructor(alias: string, validActions: string[]) {
        this._alias = alias;
        this._validActions = validActions;
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

    /**
     * Get the name of this game object
     */
    public get validActions(): string[] {
        return this._validActions;
    }
}
