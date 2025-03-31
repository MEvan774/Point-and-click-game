import { CanvasComponent } from "../../../../web/src/components/CanvasComponent";

/**
 * @author Milan
 * This class handles the clickable div and which action will be executed on the object.
 * The values: @position @size @isDebugHitBoxVisible are edited at the @class GameObject.ts and its children.
 */
export class HitBox {
    /** Alias of the action defined in the @type ActionAlias at the @class GameObject and its children */
    private _actionAlias: string;
    /** Alias of the gameObject defined in the @type ActionAlias at the @class GameObject and its children */
    private _gameObjectAlias: string;
    /** Reference of the canvas of the game */
    private _canvasRef: CanvasComponent;
    /** Div of the hitbox where the player can click the element */
    public _hitboxDiv: HTMLDivElement = document.createElement("div");

    /** Gets all the values from the @class CanvasComponent since its created there */
    public constructor(position: Vector2, size: Vector2, isDebugHitboxVisible: boolean,
        canvas: CanvasComponent, actionAlias: string, gameObjectAlias: string) {
        this._actionAlias = actionAlias;
        this._gameObjectAlias = gameObjectAlias;
        this._canvasRef = canvas;
        this.createHitBox(position, size, isDebugHitboxVisible);
    }

    /** Creates the clickable part of the hitbox */
    private createHitBox(position: Vector2, size: Vector2, isDebugHitboxVisible: boolean): void {
        /** if @param isDebugHitBoxVisible == true, it will color the hitbox pink so the developer can
         * easily edit the hitbox's position and size.
         */
        if (isDebugHitboxVisible)
            this._hitboxDiv.style.backgroundColor = "pink";

        this._hitboxDiv.style.zIndex = "0";
        this._hitboxDiv.style.position = "absolute";
        this._hitboxDiv.style.width = `${size.x}px`;
        this._hitboxDiv.style.height = `${size.y}px`;
        this._hitboxDiv.style.left = `calc(50% + ${position.x}px)`;
        this._hitboxDiv.style.top = `${position.y}px`;
        this._hitboxDiv.style.opacity = "0.5";
        this._hitboxDiv.style.pointerEvents = "auto";
        this._hitboxDiv.style.cursor = "pointer";

        document.body.appendChild(this._hitboxDiv);
        this._hitboxDiv.addEventListener("click", () => this.clicked());
    }

    /** Removes the hitbox from canvas so new hiboxes can be placed after game refreshes */
    public removeHitBox(): void {
        document.body.removeChild(this._hitboxDiv);
    }

    /** Calls the action of the object by their aliases so it can be executed */
    private async clicked(): Promise<void> {
        await this._canvasRef.setHitboxAction(this._actionAlias, this._gameObjectAlias);
    }
}
