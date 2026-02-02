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
    /** Store original position and size for responsive scaling */
    private _originalPosition: Vector2;
    private _originalSize: Vector2;
    /** Reference to the header element for positioning */
    private _headerElement: HTMLElement | null = null;
    /** Store bound function reference for cleanup */
    private _updatePositionBound: () => void;

    /** Gets all the values from the @class CanvasComponent since its created there */
    public constructor(position: Vector2, size: Vector2, isDebugHitboxVisible: boolean,
        canvas: CanvasComponent, actionAlias: string, gameObjectAlias: string) {
        this._actionAlias = actionAlias;
        this._gameObjectAlias = gameObjectAlias;
        this._canvasRef = canvas;
        this._originalPosition = { x: position.x, y: position.y };
        this._originalSize = { x: size.x, y: size.y };
        this._updatePositionBound = (): void => {
            setTimeout(() => this.updateHitboxPosition(), 50);
        };
        this.createHitBox(isDebugHitboxVisible);
        this.setupResponsiveListeners();
    }

    /** Creates the clickable part of the hitbox */
    private createHitBox(isDebugHitboxVisible: boolean): void {
        /** if @param isDebugHitBoxVisible == true, it will color the hitbox pink so the developer can
         * easily edit the hitbox's position and size.
         */
        if (isDebugHitboxVisible)
            this._hitboxDiv.style.backgroundColor = "pink";

        this._hitboxDiv.style.zIndex = "50";
        this._hitboxDiv.style.position = "fixed";
        this._hitboxDiv.style.opacity = "0.5";
        this._hitboxDiv.style.pointerEvents = "auto";
        this._hitboxDiv.style.cursor = "pointer";

        // Get the header element from shadow root
        const shadowRoot: ShadowRoot | null = this._canvasRef.shadowRoot;
        if (shadowRoot) {
            this._headerElement = shadowRoot.querySelector(".header");
        }

        // Set initial position and size
        this.updateHitboxPosition();

        document.body.appendChild(this._hitboxDiv);
        this._hitboxDiv.addEventListener("click", () => this.clicked());
    }

    /** Updates hitbox position and size based on current viewport and image scaling */
    private updateHitboxPosition(): void {
        if (!this._headerElement) return;

        // Get the first image in the header (the base room image)
        const headerImage: HTMLImageElement | null = this._headerElement.querySelector("img");
        if (!headerImage) return;

        const imageRect: DOMRect = headerImage.getBoundingClientRect();

        // Original game image dimensions (based on your CSS: 1022px width)
        const originalImageWidth: number = 1022;

        // Current image dimensions
        const currentWidth: number = imageRect.width;

        // Calculate scale factor
        const scaleX: number = currentWidth / originalImageWidth;
        const scaleY: number = scaleX; // Maintain aspect ratio

        // Scale position and size
        const scaledWidth: number = this._originalSize.x * scaleX;
        const scaledHeight: number = this._originalSize.y * scaleY;
        const scaledPosX: number = this._originalPosition.x * scaleX;
        const scaledPosY: number = this._originalPosition.y * scaleY;

        // Position relative to the actual image using fixed positioning
        const absoluteLeft: number = imageRect.left + (imageRect.width / 2) + scaledPosX;
        const absoluteTop: number = imageRect.top + scaledPosY;

        // Get viewport dimensions
        const viewportWidth: number = window.innerWidth;
        const viewportHeight: number = window.innerHeight;

        // Constrain hitbox to stay within viewport bounds to prevent scrolling
        const maxLeft: number = viewportWidth - scaledWidth;
        const maxTop: number = viewportHeight - scaledHeight;

        const constrainedLeft: number = Math.max(0, Math.min(absoluteLeft, maxLeft));
        const constrainedTop: number = Math.max(0, Math.min(absoluteTop, maxTop));

        // Apply scaled and constrained values
        this._hitboxDiv.style.width = `${scaledWidth}px`;
        this._hitboxDiv.style.height = `${scaledHeight}px`;
        this._hitboxDiv.style.left = `${constrainedLeft}px`;
        this._hitboxDiv.style.top = `${constrainedTop}px`;
    }

    /** Setup listeners for window resize and orientation change */
    private setupResponsiveListeners(): void {
        window.addEventListener("resize", this._updatePositionBound);
        window.addEventListener("orientationchange", this._updatePositionBound);
    }

    /** Removes the hitbox from canvas so new hiboxes can be placed after game refreshes */
    public removeHitBox(): void {
        // Remove event listeners
        window.removeEventListener("resize", this._updatePositionBound);
        window.removeEventListener("orientationchange", this._updatePositionBound);

        // Remove from DOM
        if (this._hitboxDiv.parentNode) {
            document.body.removeChild(this._hitboxDiv);
        }
    }

    /** Calls the action of the object by their aliases so it can be executed */
    private async clicked(): Promise<void> {
        await this._canvasRef.setHitboxAction(this._actionAlias, this._gameObjectAlias);
    }
}
