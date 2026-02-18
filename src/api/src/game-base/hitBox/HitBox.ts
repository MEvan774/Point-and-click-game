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

    private createHitBox(isDebugHitboxVisible: boolean): void {
        if (isDebugHitboxVisible) {
            this._hitboxDiv.style.backgroundColor = "pink";
        }

        const baseZIndex: number = 10;
        const zIndexRange: number = 30;
        const normalizedY: number = Math.max(0, Math.min(1, (1022 - this._originalPosition.y) / 1022));
        const calculatedZIndex: number = Math.floor(baseZIndex + (normalizedY * zIndexRange));

        this._hitboxDiv.style.zIndex = calculatedZIndex.toString();
        this._hitboxDiv.style.position = "absolute"; // <-- absolute, not fixed
        this._hitboxDiv.style.opacity = "0.5";
        this._hitboxDiv.style.pointerEvents = "auto";
        this._hitboxDiv.style.cursor = "pointer";

        const shadowRoot: ShadowRoot | null = this._canvasRef.shadowRoot;
        if (shadowRoot) {
            this._headerElement = shadowRoot.querySelector(".header");
        }

        this.updateHitboxPosition();

        // Append to the header (image container), not document.body
        if (this._headerElement) {
            this._headerElement.appendChild(this._hitboxDiv);
        }

        this._hitboxDiv.addEventListener("click", () => void this.clicked());
    }

    /** Updates hitbox position and size based on current viewport and image scaling */
    private updateHitboxPosition(): void {
        if (!this._headerElement) return;

        const headerImage: HTMLImageElement | null = this._headerElement.querySelector("img");
        if (!headerImage) return;

        const originalImageWidth: number = 1022;

        // The image's actual rendered width
        const displayedWidth: number = headerImage.getBoundingClientRect().width;
        const scale: number = displayedWidth / originalImageWidth;

        const scaledWidth: number = this._originalSize.x * scale;
        const scaledHeight: number = this._originalSize.y * scale;
        const scaledPosX: number = this._originalPosition.x * scale;
        const scaledPosY: number = this._originalPosition.y * scale;

        // Position relative to the header container.
        // The image is centered via CSS (left:50% + translateX(-50%) on mobile,
        // or just centered via flex). We offset from the image's left edge.
        const imageRect: DOMRect = headerImage.getBoundingClientRect();
        const headerRect: DOMRect = this._headerElement.getBoundingClientRect();

        // Image's left edge relative to the header
        const imageLeftInHeader: number = imageRect.left - headerRect.left;

        this._hitboxDiv.style.width = `${scaledWidth}px`;
        this._hitboxDiv.style.height = `${scaledHeight}px`;
        this._hitboxDiv.style.left = `${imageLeftInHeader + (displayedWidth / 2) + scaledPosX}px`;
        this._hitboxDiv.style.top = `${scaledPosY}px`; // directly relative to header top
    }

    /** Setup listeners for window resize and orientation change */
    private setupResponsiveListeners(): void {
        window.addEventListener("resize", this._updatePositionBound);
        window.addEventListener("orientationchange", this._updatePositionBound);
    }

    /** Removes the hitbox from canvas so new hiboxes can be placed after game refreshes */
    public removeHitBox(): void {
        window.removeEventListener("resize", this._updatePositionBound);
        window.removeEventListener("orientationchange", this._updatePositionBound);

        if (this._hitboxDiv.parentNode) {
            this._hitboxDiv.parentNode.removeChild(this._hitboxDiv);
        }
    }

    /** Calls the action of the object by their aliases so it can be executed */
    private async clicked(): Promise<void> {
        await this._canvasRef.setHitboxAction(this._actionAlias, this._gameObjectAlias);
    }
}
