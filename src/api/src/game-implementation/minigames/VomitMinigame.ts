import { CanvasComponent } from "../../../../web/src/components/CanvasComponent";

/**
 * @author Milan
 * This object makes an overlay for the vomitMinigame and makes it playable in any room its instantiated
 */
export class VomitMinigame {
    private container: HTMLElement;
    private progressBar: HTMLElement;
    private progressFill: HTMLElement;
    private message: HTMLElement;
    private mashButton: HTMLButtonElement;
    private readyButton: HTMLButtonElement;
    private overlay: HTMLElement;
    private progress = 0;
    private timeHeld = 0;
    private fillRate = 2;
    private interval: ReturnType<typeof setInterval> | undefined;
    private gameRunning = false;
    private isGameFinished = false;
    private _canvas: CanvasComponent;
    private intervalTime = 500;

    /**
     * Instantiates html elements for the minigame
     * @param canvas Used to remove the reference to self in the canvasComponent
     */
    public constructor(canvas: CanvasComponent) {
        this._canvas = canvas;
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
        this.overlay.addEventListener("click", () => this.exitMinigame());

        this.container = document.createElement("div");
        this.container.style.textAlign = "center";
        this.container.style.background = "black";
        this.container.style.color = "white";
        this.container.style.fontFamily = "DungeonFont";
        this.container.style.padding = "20px";
        this.container.style.zIndex = "20";

        this.readyButton = document.createElement("button");
        this.readyButton.textContent = "I'm Ready";
        this.readyButton.style.padding = "10px 20px";
        this.readyButton.style.fontSize = "32px";
        this.readyButton.style.cursor = "pointer";
        this.readyButton.style.background = "#e9efec";
        this.readyButton.style.fontFamily = "DungeonFont";
        this.readyButton.style.zIndex = "100";
        this.readyButton.style.background = "#e9efec";
        this.readyButton.addEventListener("click", () => this.startGame());

        this.container.appendChild(this.readyButton);

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

        this.mashButton = document.createElement("button");
        this.mashButton.textContent = "Mash to Hold It In!";
        this.mashButton.style.padding = "10px 20px";
        this.mashButton.style.fontSize = "1.5em";
        this.mashButton.style.cursor = "pointer";
        this.mashButton.style.background = "#e9efec";
        this.mashButton.style.fontFamily = "DungeonFont";
        this.mashButton.style.zIndex = "100";
        this.mashButton.addEventListener("click", () => this.mashButtonHandler());
        gameUI.appendChild(this.mashButton);

        this.message = document.createElement("div");
        this.message.style.fontFamily = "DungeonFont";
        this.message.style.fontSize = "32px";
        this.message.style.marginTop = "20px";
        gameUI.appendChild(this.message);

        this.container.appendChild(gameUI);
        this.overlay.appendChild(this.container);
        document.body.appendChild(this.overlay);

        const style: HTMLStyleElement = document.createElement("style");
        style.innerHTML = `
@keyframes shake {
    0% { transform: translateY(0); }
    25% { transform: translateY(-2px); }
    50% { transform: translateY(2px); }
    75% { transform: translateY(-2px); }
    100% { transform: translateY(0); }
}
    @keyframes shake-intense {
    0% { transform: translateY(0) rotate(0deg); }
    25% { transform: translateY(-6px) rotate(-0.1deg); }
    50% { transform: translateY(6px) rotate(0.1deg); }
    75% { transform: translateY(-6px) rotate(-0.1deg); }
    100% { transform: translateY(0) rotate(0deg); }
}
`;
        document.head.appendChild(style);

        const buttonStyle: HTMLStyleElement = document.createElement("style");
        buttonStyle.innerHTML = `
button {
    transition: transform 0.05s ease-in-out;
}
button:hover {
    transform: scale(1.05); /* Slightly bigger */
}
button:active {
    transform: scale(0.95); /* Shrinks when clicked */
}
`;
        document.head.appendChild(buttonStyle);
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
        this.message.innerText = "";

        this.overlay.style.visibility = "visible";
        (this.container.children[1] as HTMLElement).style.display = "block";
        this.readyButton.style.display = "none";
        this.interval = setInterval(() => this.updateGame(), this.intervalTime);
    }

    private updateGame(): void {
        if (!this.gameRunning) return;

        // prevents fillbar from overflowing
        if (this.progress > 100)
            this.progress = 100;

        this.progress += this.fillRate;
        this.progressFill.style.width = `${this.progress}%`;

        if (this.progress >= 50) {
            this.progressBar.style.animation = "shake-intense 0.1s infinite";
        }
        else if (this.progress >= 10) {
            this.progressBar.style.animation = "shake 0.1s infinite";
        }
        else {
            this.progressBar.style.animation = "none"; // Stop shaking at low levels
        }

        if (this.progress >= 100) {
            this.progress = 100;
            this.progressBar.style.animation = "none";
            clearInterval(this.interval);
            this.message.innerText = "You vomited... The ghost is displeased.";
            this.gameRunning = false;
            setTimeout(() => this.isGameFinished = true, 1400);
        }

        this.timeHeld += 0.5;
        if (this.timeHeld >= 25) {
            this.progressBar.style.animation = "none";
            this.progressFill.style.background = "#a0a08b";
            clearInterval(this.interval);
            this.message.innerText = "You swallowed it... barely.";
            this.gameRunning = false;
            setTimeout(() => this.isGameFinished = true, 1400);
        }

        if (this.timeHeld % 2 === 0 && this.intervalTime > 100) {
            if (this.fillRate < 10)
                this.fillRate += 2;
            this.intervalTime -= 100;
            clearInterval(this.interval);
            this.interval = setInterval(() => this.updateGame(), this.intervalTime);
        }
    }

    // Handles the mashButton and removes progress from the bar
    private mashButtonHandler(): void {
        if (this.gameRunning && this.progress > 0) {
            this.progress -= 10;
            if (this.progress < 0) this.progress = 0;
            this.progressFill.style.width = `${this.progress}%`;
        }
    }

    // removes itself from the document and from the canvas component
    private exitMinigame(): void {
        if (this.isGameFinished) {
            this._canvas.DisableMinigame();
            document.body.removeChild(this.overlay);
        }
    }
}
