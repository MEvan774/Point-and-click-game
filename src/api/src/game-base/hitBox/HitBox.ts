import { CanvasComponent } from "../../../../web/src/components/CanvasComponent";

export class HitBox {
    private _actionAlias: string;
    private _gameObjectAlias: string;
    private _canvasRef: CanvasComponent;

    public _hitboxDiv: HTMLDivElement = document.createElement("div");

    public constructor(position: Vector2, size: Vector2, isDebugHitboxVisible: boolean,
        canvas: CanvasComponent, actionAlias: string, gameObjectAlias: string) {
        this._actionAlias = actionAlias;
        this._gameObjectAlias = gameObjectAlias;
        this._canvasRef = canvas;
        this.createHitBox(position, size, isDebugHitboxVisible);
    }

    private createHitBox(position: Vector2, size: Vector2, isDebugHitboxVisible: boolean): void {
        if (isDebugHitboxVisible)
            this._hitboxDiv.style.backgroundColor = "pink";

        this._hitboxDiv.style.zIndex = "100";
        this._hitboxDiv.style.position = "absolute";
        this._hitboxDiv.style.width = `${size.x}px`;
        this._hitboxDiv.style.height = `${size.y}px`;
        this._hitboxDiv.style.left = `calc(50% + ${position.x}px)`;
        this._hitboxDiv.style.top = `${position.y}px`;
        this._hitboxDiv.style.opacity = "0.5";
        this._hitboxDiv.style.pointerEvents = "auto"; // Ensures it captures clicks

        document.body.appendChild(this._hitboxDiv);
        this._hitboxDiv.addEventListener("click", () => this.clicked());
    }

    public removeHitBox(): void {
        document.body.removeChild(this._hitboxDiv);
    }

    private async clicked(): Promise<void> {
        await this._canvasRef.setHitboxAction(this._actionAlias, this._gameObjectAlias);
    }
}
