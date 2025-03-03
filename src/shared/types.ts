/**
 * A game state is used to instruct the client application what to do
 *
 * @remarks The `type` attribute (discriminator) is used to distinguish between different game state types.
 */
export type GameState = DefaultGameState | SwitchPageGameState;

/**
 * Instruct the client application to update the Canvas page with new information
 */
export type DefaultGameState = {
    /** Discriminiator to distinguish between different game state types */
    type: "default";
    /** Alias of the room the player is in */
    roomAlias: string;
    /** Name of the room the player is in */
    roomName: string;
    /** Images of the room the player is in */
    roomImages: string[];
    /** Lines of text to show to the player */
    text: string[];
    /** Actions that are available to the player */
    actions: ActionReference[];
    /** Game objects that can be interacted with by the player */
    objects: GameObjectReference[];
    /** Inventory of the player */
    inventory: string[];
    /** Selected item */
    selectedItem: string;
};

/**
 * Represents an action for the client application
 */
export type ActionReference = {
    /** Alias of the action */
    alias: string;
    /** Name of the action */
    name: string;
    /** Is `true` if the action requires another `GameObject` to work, otherwise `false`. */
    needsObject: boolean;
};

/**
 * Represents a game object for the client application
 */
export type GameObjectReference = {
    /** Alias of the game object */
    alias: string;
    /** Name of the game object */
    name: string;
    /** X and Y Axis for hitbox position */
    position: Vector2;
    /** width and height for hitbox size */
    size: Vector2;
    /** visibility for the hitbox for debug purposes */
    isDebugHitboxOn: boolean;
    /** name of the action alias that will be used when clicked on */
    actionAlias: string;
    /** List of action aliases that this object supports */
    validActions: string[];
};

/**
 * Instruct the client application to switch to a specific page
 */
export type SwitchPageGameState = {
    /** Discriminiator to distinguish between different game state types */
    type: "switch-page";
    /** Alias of the page to switch to */
    page: string;
};

/**
 * Body of a request performed by the client application to exectute an action
 */
export type ExecuteActionRequest = {
    /** Alias of the action to execute */
    action: string;
    /** Aliases of the game objects to execute the action on */
    objects?: string[];
};

/**
 * Change selected inventory item
 */
export type InventoryActionRequest = {
    /** Selected Item */
    selectedItem: string;
};
