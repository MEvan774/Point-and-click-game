import { CanvasComponent } from "../../../../web/src/components/CanvasComponent";
import { ActionResult } from "../../game-base/actionResults/ActionResult";
import { TextActionResult } from "../../game-base/actionResults/TextActionResult";
import { ActionTypes } from "../../game-base/enums/ActionAlias";
import { Room } from "../../game-base/gameObjects/Room";
import { gameService } from "../../global";
import { CarItem } from "../items/CarItem";
import { WinScreenRoom } from "../rooms/WinScreenRoom";
import { PlayerSession } from "../types";

export class FuelFillingMinigame {
    private fuelSound: HTMLAudioElement;
    private completeSound: HTMLAudioElement;
    private container: HTMLElement;
    private progressBar: HTMLElement;
    private progressFill: HTMLElement;
    private message: HTMLElement;
    private overlay: HTMLElement;
    private progress = 0;
    private gameRunning = false;
    private isGameFinished = false;
    private _canvas: CanvasComponent;
    private interval: ReturnType<typeof setInterval> | undefined;
    private fillRate = 2.2;
    private maxFuel = 100;
    private carFueled: boolean;
    

    public constructor(canvas: CanvasComponent, fuelSound: HTMLAudioElement) {
        this._canvas = canvas;
        this.fuelSound = fuelSound;
        this.fuelSound.volume = 1.0;
        this.completeSound = new Audio("public/audio/soundEffects/task-complete.mp3");
        this.completeSound.volume = 1.0;
        this.carFueled = false;
        document.addEventListener("keydown", event => this.handleKeyDown(event));
        document.addEventListener("keyup", event => this.handleKeyUp(event));

        this.overlay = document.createElement("div");
        this.overlay.style.position = "fixed";
        this.overlay.style.top = "0";
        this.overlay.style.left = "0";
        this.overlay.style.width = "100vw";
        this.overlay.style.height = "100vh";
        this.overlay.style.background = "rgba(0, 0, 0, 0.8)";
        this.overlay.style.display = "flex";
        this.overlay.style.alignItems = "center";
        this.overlay.style.justifyContent = "center";
        this.overlay.style.zIndex = "10";

        this.container = document.createElement("div");
        this.container.style.textAlign = "center";
        this.container.style.background = "black";
        this.container.style.color = "white";
        this.container.style.fontFamily = "DungeonFont";
        this.container.style.padding = "20px";

        const title = document.createElement("h1");
        title.textContent = "Fill the Tank!";
        this.container.appendChild(title);

        this.progressBar = document.createElement("div");
        this.progressBar.style.width = "300px";
        this.progressBar.style.height = "30px";
        this.progressBar.style.border = "2px solid white";
        this.progressBar.style.margin = "20px auto";
        this.progressBar.style.position = "relative";

        this.progressFill = document.createElement("div");
        this.progressFill.style.height = "100%";
        this.progressFill.style.width = "0%";
        this.progressFill.style.background = "green";
        this.progressBar.appendChild(this.progressFill);

        this.container.appendChild(this.progressBar);

        this.message = document.createElement("div");
        this.message.style.marginTop = "20px";
        this.message.textContent = "Hold SPACE to fill the tank!";
        this.container.appendChild(this.message);

        this.overlay.appendChild(this.container);
        document.body.appendChild(this.overlay);
    }

    private handleKeyDown(event: KeyboardEvent): void {
        if (event.code === "Space" && !this.isGameFinished) {
            if (!this.gameRunning) {
                this.startGame();
            }
        }
        event.preventDefault();
    }

    private handleKeyUp(event: KeyboardEvent): void {
        if (event.code === "Space" && this.gameRunning) {
            this.stopFilling();
        }
    }

    private startGame(): void {
        this.gameRunning = true;
        this.fuelSound.play();
        this.interval = setInterval(() => this.updateGame(), 100);
    }

    private updateGame(): void {
        if (!this.gameRunning) return;
        
        this.progress += this.fillRate;
        if (this.progress >= this.maxFuel) {
            this.progress = this.maxFuel;
            this.isGameFinished = true;
            this.stopFilling();
            this.completeSound.play(); // Speel het voltooide geluid af
            this.message.textContent = "Tank is full! You did it!";
            setTimeout(() => this.exitMinigame(), 2000);
        }        
        this.progressFill.style.width = `${this.progress}%`;
    }

    private async stopFilling(): Promise<void> {
        this.gameRunning = false;
        clearInterval(this.interval);
        this.fuelSound.pause();
        this.fuelSound.currentTime = 0;
    
        if (this.progress < this.maxFuel - 10) {
            this.message.textContent = "You stopped too soon! Try again.";
            setTimeout(() => this.exitMinigame(), 1000);
        } else {
            this.completeSound.play();
            this.message.textContent = "The car has been fueled up! Let's get out of here.";
            setTimeout(async () => await this._canvas.setEndMinigameAction(ActionTypes.GoTo, "car"), 1000);
        }
    }
    

    private exitMinigame(): void {
        this._canvas.DisableMinigame();
        document.body.removeChild(this.overlay);
    }
}
