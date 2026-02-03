import { CanvasComponent } from "../../../../web/src/components/CanvasComponent";
import { ActionTypes } from "../enums/ActionAlias";

export class FlashLightUseItem {
    // size of the flashight div
    private _flashlightSize: number = 130;
    private flashlightImage: HTMLImageElement = document.createElement("img");

    /** Reference of the canvas of the game */
    private _canvasRef: CanvasComponent;

    public _hitboxDiv: HTMLDivElement = document.createElement("div");

    /** Bound event handlers for cleanup */
    private _updateFlashlightMouse: (event: MouseEvent) => void;
    private _updateFlashlightTouch: (event: TouchEvent) => void;

    /**
     * @param isActive Checks if flashlight item is active and enables flashlight, if not switches to darkness div
     * @param canvasRef Reference for canvas component to attach div
     */
    public constructor(isActive: boolean, canvasRef: CanvasComponent) {
        this._canvasRef = canvasRef;

        // Bind event handlers
        this._updateFlashlightMouse = this.updateFlashlightMouse.bind(this);
        this._updateFlashlightTouch = this.updateFlashlightTouch.bind(this);

        if (!isActive) {
            this.CreateDarkness();
        }
        else {
            this.createFlashlight();
        }
    }

    /** Creates the flashlight effect */
    private createFlashlight(): void {
        this.flashlightImage.src = "/assets/img/Items/FlashlightLight.png";
        this.flashlightImage.style.position = "absolute";
        this.flashlightImage.style.width = `${this._flashlightSize}px`;
        this.flashlightImage.style.height = `${this._flashlightSize}px`;
        this.flashlightImage.style.pointerEvents = "none";
        this.flashlightImage.style.userSelect = "none";
        this.flashlightImage.style.imageRendering = "pixelated";
        this.flashlightImage.style.left = "50%";
        this.flashlightImage.style.top = "50%";
        this.flashlightImage.style.boxShadow = "2px 0px 0px 20000px rgba(0,0,0,1)";

        document.body.appendChild(this.flashlightImage);

        // Add both mouse and touch event listeners
        window.addEventListener("mousemove", this._updateFlashlightMouse);
        window.addEventListener("touchmove", this._updateFlashlightTouch, { passive: true });
        window.addEventListener("touchstart", this._updateFlashlightTouch, { passive: true });
    }

    /** Creates darkness div and enables onClick functionality to send the player back to the frontdoor room */
    private CreateDarkness(): void {
        this._hitboxDiv.style.zIndex = "1";
        this._hitboxDiv.style.position = "absolute";
        this._hitboxDiv.style.width = "100%";
        this._hitboxDiv.style.top = "0%";
        this._hitboxDiv.style.height = "100%";
        this._hitboxDiv.style.backgroundColor = "black";
        this._hitboxDiv.style.pointerEvents = "auto";
        this._hitboxDiv.style.cursor = "pointer";

        document.body.appendChild(this._hitboxDiv);
        this._hitboxDiv.addEventListener("click", () => void this.clicked());
    }

    /** Uses hitbox functionality to send the player back to the previous room */
    private async clicked(): Promise<void> {
        await this._canvasRef.setHitboxAction(ActionTypes.GoTo, "DoorLivingRoomFrontDoorItem");
    }

    /** Updates the flashlight position from mouse events */
    private updateFlashlightMouse(event: MouseEvent): void {
        const pos: Vector2 = {
            x: event.clientX - this._flashlightSize / 2,
            y: event.clientY - this._flashlightSize / 2,
        };

        this.flashlightImage.style.left = `${pos.x}px`;
        this.flashlightImage.style.top = `${pos.y}px`;
    }

    /** Updates the flashlight position from touch events */
    private updateFlashlightTouch(event: TouchEvent): void {
        // Get the first touch point
        if (event.touches.length > 0) {
            const touch: Touch = event.touches[0];
            const pos: Vector2 = {
                x: touch.clientX - this._flashlightSize / 2,
                y: touch.clientY - this._flashlightSize / 2,
            };

            this.flashlightImage.style.left = `${pos.x}px`;
            this.flashlightImage.style.top = `${pos.y}px`;
        }
    }

    /** Removes the flashlight or darkness from the html */
    public DisableFlashLight(): void {
        if (document.body.contains(this.flashlightImage)) {
            // Remove event listeners
            window.removeEventListener("mousemove", this._updateFlashlightMouse);
            window.removeEventListener("touchmove", this._updateFlashlightTouch);
            window.removeEventListener("touchstart", this._updateFlashlightTouch);

            // Remove element
            document.body.removeChild(this.flashlightImage);
        }
        else if (document.body.contains(this._hitboxDiv)) {
            document.body.removeChild(this._hitboxDiv);
        }
    }
}
