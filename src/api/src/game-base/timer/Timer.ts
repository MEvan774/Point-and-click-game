import { CanvasComponent } from "../../../../web/src/components/CanvasComponent";
import { ActionTypes } from "../enums/ActionAlias";

export class Timer {
    public static readonly Alias: string = "timer";

    private intervalId: NodeJS.Timeout | null = null;
    private countdown1: number = Timer.getRandomTimeout(); // First countdown duration
    private countdown2: number = Timer.getRandomTimeout(); // Second countdown duration
    private currentTime: number = this.countdown1; // Track remaining time
    private currentTimer: number = 1; // 1 = first timer, 2 = second timer

    public _chaseSound: HTMLAudioElement;
    private _jumpscareSound: HTMLAudioElement;

    private spriteElement: HTMLDivElement;
    private frameCount: number = 61;
    private frameWidth: number = 265;
    private frameDuration: number = 40; // Duration per frame in milliseconds
    private scaleX: number;
    public isHiding: boolean = false;
    private _canvas: CanvasComponent;

    public constructor(chaseSound: HTMLAudioElement, jumpscareSound: HTMLAudioElement, canvas: CanvasComponent) {
        this._chaseSound = chaseSound;
        this._jumpscareSound = jumpscareSound;
        this._canvas = canvas;

        this.scaleX = window.innerWidth / this.frameWidth;
        this.spriteElement = document.createElement("div");
        this.spriteElement.style.position = "fixed";
        this.spriteElement.style.top = "0";
        this.spriteElement.style.left = "0";
        this.spriteElement.style.width = "100vw";
        this.spriteElement.style.height = "100vh";
        this.spriteElement.style.backgroundImage = "url(assets/img/spriteSheets/JumpScare.png)";
        this.spriteElement.style.imageRendering = "pixelated";
        this.spriteElement.style.backgroundSize = `${this.frameWidth * this.frameCount * this.scaleX}px auto`; // Scale for horizontal layout
        this.spriteElement.style.zIndex = "9999";
        this.spriteElement.style.display = "none"; // Hide until triggered
        document.body.appendChild(this.spriteElement);

        this.start();
    }

    // Generate a random timeout between 40,000 and 70,000 ms
    private static getRandomTimeout(): number {
        return Math.floor(Math.random() * (90000 - 30000 + 1)) + 30000;
    }

    private static getRandomTimeout2(): number {
        return Math.floor(Math.random() * (20000 - 10000 + 1)) + 10000;
    }

    public start(): void {
        if (this.intervalId) return;

        this.intervalId = setInterval(() => {
            if (this.currentTime > 0) {
                this.currentTime -= 1000;
            }
            else {
                this.switchTimers();
            }
        }, 1000);
    }

    public pause(): void {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    public reset(): void {
        this.stop();
        this.currentTimer = 1; // Ensure it resets to the first countdown
        this.countdown1 = Timer.getRandomTimeout();
        this.currentTime = this.countdown1;

        this.start(); // Restart timer with new countdown
    }

    public stop(): void {
        this.pause();
        this.currentTime = 0;
    }

    public alarm(): void {
        this.currentTimer = 1;
        this.switchTimers();
    }

    private switchTimers(): void {
        if (this.currentTimer === 1) {
            this.currentTimer = 2;
            this.countdown2 = Timer.getRandomTimeout2(); // Generate new second countdown
            this.currentTime = this.countdown2;
            void this._chaseSound.play();
            this.showPopupMessage("You are being hunted, hide!", "red");
        }
        else {
            if (!this.isHiding) {
                this.stop();
                this.jumpscare();
            }
            else {
                this.reset();
            }
        }
    }

    private async transitionToGameOverRoom(): Promise<void> {
        await this._canvas.setEndMinigameAction(ActionTypes.GoTo, "gameOver");
    }

    public getTimeLeft(): number {
        return this.currentTime / 1000;
    }

    private jumpscare(): void {
        void this._jumpscareSound.play();
        this.spriteElement.style.display = "block";
        let currentFrame: number = 0;
        const animate: NodeJS.Timeout = setInterval(() => {
            if (currentFrame >= this.frameCount) {
                clearInterval(animate);
                void this.transitionToGameOverRoom();
                document.body.removeChild(this.spriteElement);
                return;
            }
            this.spriteElement.style.backgroundPosition = `-${currentFrame * this.frameWidth * this.scaleX}px 0px`;
            currentFrame++;
        }, this.frameDuration);
    }

    public showPopupMessage(message: string, textColor: string): void {
        const popup: HTMLDivElement = document.createElement("div");
        popup.textContent = message;
        popup.style.position = "fixed";
        popup.style.top = "50%";
        popup.style.left = "50%";
        popup.style.transform = "translate(-50%, -50%)";
        popup.style.padding = "20px";
        popup.style.fontFamily = "DungeonFont";
        popup.style.fontSize = "32px";
        popup.style.fontStyle = "bold";
        popup.style.color = textColor;
        popup.style.backgroundColor = "black";
        popup.style.borderRadius = "0px";
        popup.style.zIndex = "10000";
        popup.style.textAlign = "center";
        popup.style.opacity = "1";
        popup.style.transition = "opacity 1s ease-out";

        document.body.appendChild(popup);

        setTimeout(() => {
            popup.style.opacity = "0";
            setTimeout(() => document.body.removeChild(popup), 1000);
        }, 3000);
    }
}
