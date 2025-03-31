import { CanvasComponent } from "../../../../web/src/components/CanvasComponent";
import { ActionTypes } from "../../game-base/enums/ActionAlias";

/**
 * @author Milan
 * This object makes an overlay for the vomitMinigame and makes it playable in any room its instantiated
 */
export class VomitMinigame {
    private mashSound: HTMLAudioElement;
    private container: HTMLElement;
    private progressBar: HTMLElement;
    private progressFill: HTMLElement;
    public message: HTMLElement;
    private readyText: HTMLElement;
    private overlay: HTMLElement;
    private progress = 0;
    private timeHeld = 0;
    private fillRate = 2;
    private interval: ReturnType<typeof setInterval> | undefined;
    private gameRunning = false;
    private isgameFinnished = false;
    private _canvas: CanvasComponent;
    private intervalTime = 500;
    private _isFuelInInventory: boolean;

    /**
     * Instantiates html elements for the minigame
     * @param canvas Used to remove the reference to self in the canvasComponent
     */
    public constructor(canvas: CanvasComponent, mashSound: HTMLAudioElement, isFuelInInventory: boolean) {
        this._canvas = canvas;
        this._isFuelInInventory = isFuelInInventory;
        console.log(this._isFuelInInventory);
        document.addEventListener("keydown", event => this.handleKeyPress(event));
        this.mashSound = mashSound;
        this.mashSound.volume = 0.5;
        this.overlay = document.createElement("div");
        this.overlay.style.position = "fixed";
        this.overlay.style.top = "0";
        this.overlay.style.left = "0";
        this.overlay.style.width = "100vw";
        this.overlay.style.height = "100vh";
        this.overlay.style.background = "rgba(0, 0, 0, 0.9)";
        this.overlay.style.display = "flex";
        this.overlay.style.alignItems = "center";
        this.overlay.style.justifyContent = "center";
        this.overlay.style.zIndex = "5";

        this.container = document.createElement("div");
        this.container.style.textAlign = "center";
        this.container.style.background = "black";
        this.container.style.color = "white";
        this.container.style.fontFamily = "DungeonFont";
        this.container.style.padding = "20px";
        this.container.style.zIndex = "20";

        this.readyText = document.createElement("div");
        this.readyText.textContent = "Mash space to start!";
        this.readyText.style.fontSize = "32px";
        this.readyText.style.fontFamily = "DungeonFont";
        this.readyText.style.zIndex = "100";

        const progressWrapper: HTMLDivElement = document.createElement("div");
        progressWrapper.style.display = "inline-block"; // Prevents affecting other elements
        progressWrapper.style.transition = "transform 0.1s ease-in-out"; // Smooth shrinking effect

        this.container.appendChild(this.readyText);

        const gameUI: HTMLDivElement = document.createElement("div");
        gameUI.style.display = "none";
        gameUI.style.zIndex = "10";
        this.container.appendChild(gameUI);

        const title: HTMLHeadingElement = document.createElement("h1");
        title.textContent = "Swallow It. Don’t Let It Out.";
        title.style.fontFamily = "DungeonFont";
        gameUI.appendChild(title);

        this.progressBar = document.createElement("div");
        this.progressBar.style.width = "300px";
        this.progressBar.style.height = "30px";
        this.progressBar.style.zIndex = "10";
        this.progressBar.style.borderRadius = "5px";
        this.progressBar.style.borderStyle = "solid";
        this.progressBar.style.borderRadius = "0px";
        this.progressBar.style.borderColor = "#e9efec";
        this.progressBar.style.margin = "20px auto";
        this.progressBar.style.position = "relative";
        gameUI.appendChild(this.progressBar);

        this.progressFill = document.createElement("div");
        this.progressFill.style.height = "30px";
        this.progressFill.style.width = "0%";
        this.progressFill.style.background = "#ff0014";
        this.progressFill.style.transition = "width 0.1s";
        this.progressBar.appendChild(this.progressFill);

        progressWrapper.appendChild(this.progressBar);
        gameUI.appendChild(progressWrapper);

        this.message = document.createElement("div");
        this.message.style.fontFamily = "DungeonFont";
        this.message.style.fontSize = "32px";
        this.message.style.marginTop = "20px";
        this.message.style.marginTop = "20px";
        gameUI.appendChild(this.message);

        this.container.appendChild(gameUI);
        this.overlay.appendChild(this.container);
        document.body.appendChild(this.overlay);

        const style: HTMLStyleElement = document.createElement("style");
        style.innerHTML = `
@keyframes shake {
    0% { transform: scale(1) translateY(0); }
    25% { transform: scale(1) translateY(-2px); }
    50% { transform: scale(1) translateY(2px); }
    75% { transform: scale(1) translateY(-2px); }
    100% { transform: scale(1) translateY(0); }
}
    @keyframes shake-intense {
    0% { transform: scale(1) translateY(0) rotate(0deg); }
    25% { transform: scale(1) translateY(-6px) rotate(-0.1deg); }
    50% { transform: scale(1) translateY(6px) rotate(0.1deg); }
    75% { transform: scale(1) translateY(-6px) rotate(-0.1deg); }
    100% { transform: scale(1) translateY(0) rotate(0deg); }
}
`;
        document.head.appendChild(style);
    }

    /**
     * Starts game and shows the ui of the game and removes the start button
     */
    private startGame(): void {
        this.progress = 0;
        this.timeHeld = 0;
        this.fillRate = 2;
        this.gameRunning = true;

        this.progressFill.style.width = "0%";
        this.message.innerText = "Keep mashing!";

        this.overlay.style.visibility = "visible";
        (this.container.children[1] as HTMLElement).style.display = "block";
        this.readyText.style.display = "none";
        this.interval = setInterval(() => this.updateGame(), this.intervalTime);
    }

    private handleKeyPress(event: KeyboardEvent): void {
        if (!this.gameRunning && !this.isgameFinnished)
            this.startGame();
        else if (!this.isgameFinnished)
            this.mashButtonHandler();

        // Prevent default spacebar scrolling
        event.preventDefault();
    }

    private updateGame(): void {
        if (!this.gameRunning) return;

        // prevents fillbar from overflowing
        if (this.progress > 100)
            this.progress = 100;

        this.progress += this.fillRate;
        this.progressFill.style.width = `${this.progress}%`;

        if (this.progress >= 50)
            this.progressBar.style.animation = "shake-intense 0.1s infinite";
        else if (this.progress >= 10)
            this.progressBar.style.animation = "shake 0.1s infinite";
        else
            this.progressBar.style.animation = "none"; // Stop shaking at low levels

        if (this.progress >= 100) {
            this.progress = 100;
            this.isgameFinnished = true;
            this.progressBar.style.animation = "none";
            clearInterval(this.interval);
            this.message.innerText = "You vomited... The ghost is displeased.";
            this.gameRunning = false;
            setTimeout(() => this.exitMinigame(), 2000);
        }

        this.timeHeld += 0.5;
        if (this.timeHeld >= 23) {
            this.isgameFinnished = true;
            this.progressBar.style.animation = "none";
            this.progressFill.style.background = "#a0a08b";
            if (!this._isFuelInInventory) {
                this.message.innerText = "Congrats, you recieved Feul!";
                void this._canvas.setEndMinigameAction(ActionTypes.PickUp, "fuel");
            }
            else
                this.message.innerText = "Congrats retard, you recieved food poisoning!";
            clearInterval(this.interval);
            this.gameRunning = false;
            setTimeout(() => this.exitMinigame(), 6000);
        }

        if (this.timeHeld % 2 === 0 && this.intervalTime > 100) {
            if (this.fillRate < 10)
                this.fillRate += 2;
            this.intervalTime -= 100;
            clearInterval(this.interval);
            this.interval = setInterval(() => this.updateGame(), this.intervalTime);
        }
    }

    private shrinkProgressWrapper(): void {
        this.progressBar.parentElement!.style.transform = "scale(0.90)"; // Shrinks the wrapper
        this.progressFill.style.background = "#e9efec";
        setTimeout(() => {
            this.progressBar.parentElement!.style.transform = "scale(1)";
            if (!this.isgameFinnished)
                this.progressFill.style.background = "#ff0014";
            else
                this.progressFill.style.background = "#a0a08b";
        }, 50);
    }

    // Handles the mashButton and removes progress from the bar
    private mashButtonHandler(): void {
        if (!this.gameRunning)
            return;

        if (this.progress > 0) {
            this.progress -= 10;
            if (this.progress < 0) this.progress = 0;
            this.progressFill.style.width = `${this.progress}%`;
        }
        this.shrinkProgressWrapper();
        if (this.mashSound.paused) {
            this.mashSound.currentTime = 0;
            void this.mashSound.play();
        }
    }

    // removes itself from the document and from the canvas component
    private exitMinigame(): void {
        this._canvas.DisableMinigame();
        document.body.removeChild(this.overlay);
    }
}
