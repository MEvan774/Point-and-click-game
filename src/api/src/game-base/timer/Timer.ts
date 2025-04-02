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
        this.spriteElement.style.backgroundImage = "url(public/assets/img/spriteSheets/JumpScare.png)";
        this.spriteElement.style.imageRendering = "pixelated";
        this.spriteElement.style.backgroundSize = `${this.frameWidth * this.frameCount * this.scaleX}px auto`; // Scale for horizontal layout
        this.spriteElement.style.zIndex = "9999";
        this.spriteElement.style.display = "none"; // Hide until triggered
        document.body.appendChild(this.spriteElement);

        this.start();
    } // Private constructor to enforce singleton pattern

    // Generate a random timeout between 40,000 and 70,000 ms
    private static getRandomTimeout(): number {
        return Math.floor(Math.random() * (90000 - 30000 + 1)) + 30000;
    }

    // Start or resume the timer
    public start(): void {
        if (this.intervalId) return; // Prevent multiple intervals

        console.log("Timer started.");
        this.intervalId = setInterval(() => {
            if (this.currentTime > 0) {
                this.currentTime -= 1000; // Decrease by 1 second
            }
            else {
                this.switchTimers();
            }

            console.log(`Time left: ${this.currentTime / 1000} seconds`);
        }, 1000);
    }

    // Pause the timer
    public pause(): void {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
            console.log("Timer paused.");
        }
    }

    // Reset the timer to its original countdown
    public reset(): void {
        this.stop();
        this.currentTimer = 1; // Ensure it resets to the first countdown
        this.countdown1 = Timer.getRandomTimeout();
        this.currentTime = this.countdown1;
        console.log("Timer reset to first countdown.");

        this.start(); // Restart timer with new countdown
    }

    // Stop the timer completely
    public stop(): void {
        this.pause();
        this.currentTime = 0;
        console.log("Timer stopped.");
    }

    // sets timer to the second countdown
    public alarm(): void {
        this.currentTimer = 1;
        this.switchTimers();
    }

    // Switch between the two timers
    private switchTimers(): void {
        if (this.currentTimer === 1) {
            console.log("Switching to second countdown.");
            this.currentTimer = 2;
            this.countdown2 = Timer.getRandomTimeout(); // Generate new second countdown
            this.currentTime = this.countdown2;
            void this._chaseSound.play();
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

    // Transition player to GameOverRoom if conditions are not met
    private async transitionToGameOverRoom(): Promise<void> {
        await this._canvas.setEndMinigameAction(ActionTypes.GoTo, "gameOver");
        console.log("Player has been sent to the GameOverRoom.");
        this.stop();
    }

    // Get the remaining time in seconds
    public getTimeLeft(): number {
        return this.currentTime / 1000;
    }

    private jumpscare(): void {
        void this._jumpscareSound.play();

        this.spriteElement.style.display = "block"; // Show sprite
        let currentFrame: number = 0;
        const animate: NodeJS.Timeout = setInterval(() => {
            if (currentFrame >= this.frameCount) {
                clearInterval(animate);
                void this.transitionToGameOverRoom(); // End game after second timer
                document.body.removeChild(this.spriteElement); // Remove after animation
                return;
            }

            // Move only horizontally (X-axis)
            this.spriteElement.style.backgroundPosition = `-${currentFrame * this.frameWidth * this.scaleX}px 0px`;

            currentFrame++;
        }, this.frameDuration);
    }
}
