import { ActionReference, DefaultGameState, GameObjectReference, GameState } from "@shared/types";
import { css, html, htmlArray } from "../helpers/webComponents";
import { GameEventService } from "../services/GameEventService";
import { GameRouteService } from "../services/GameRouteService";
import { Page } from "../enums/Page";
import { HitBox } from "../../../api/src/game-base/hitBox/HitBox";
import { FlashLightUseItem } from "../../../api/src/game-base/FlashLightEffect/FlashLightUseItem";
import { VomitMinigame } from "../../../api/src/game-implementation/minigames/VomitMinigame";
import { OverlayComponent } from "./OverlayComponent";
import { Timer } from "../../../api/src/game-base/timer/Timer";
import { FuelFillingMinigame } from "../../../api/src/game-implementation/minigames/FuelMinigame";
import { CRTShader } from "../../../api/src/game-implementation/shaders/CRTShader";

/** CSS affecting the {@link CanvasComponent} */
const styles: string = css`
 
 
    :host {
        font-family: "DungeonFont";
        width: 100%;
        max-width: 1024px;
        height: 100%;
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: auto calc(35vh + 10px) minmax(calc(35vh + 10px), 1fr) auto;
        grid-column-gap: 0px;
        grid-row-gap: 0px;
    }
 
    .title {
        text-align: center;
        margin-top: 10px;
        overflow: auto;
        z-index: 10;
    }
 
    .header {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        margin-top: 10px;
        transition: filter 0.4s ease;
    }
 
    .header img {
        width: 1022px;
        height: auto;
        image-rendering: pixelated;
        position: absolute;
        top: 0;
        left: 0;
    }
 
    .header img:first-child {
        position: relative;
    }
 
    .content {
        flex-grow: 1;
        overflow: auto;
        margin-top: 200px;
        bottom: 0;
        padding: 0 10px;
        z-index: 10;
        background-color: #211e20;
        height: 110px;
        width: 833px;
        box-shadow: 85px 85px 0px 85px #211e20;
        -webkit-box-shadow: 85px 85px 0px 85px #211e20;
        -moz-box-shadow: 85px 85px 0px 85px #211e20;
    }
 
    .content p {
        margin: 0 0 10px 0;
        z-index: 10;
    }
 
    .content p:last-of-type {
        margin: 0;
        z-index: 10;
    }
 
    .footer {
        margin-top: 10px;
        display: flex;
        height: 105px;
        border-radius: 10px 10px 0 0;
        bottom: 0;
        width: 857px;
        z-index: 10;
    }
    
    .footer img {
        image-rendering: pixelated;
        width: 1022px;
        height: auto;
        position: absolute;
        margin-top: -103px;
        pointer-events: none;
        z-index: 10;
    }
 
    .footer .button {
        z-index: 2000;
        background-color: #e9efec;
        color: #211e20;
        border: none;
        border-radius: 0;
        padding: 12px 10px;
        margin: 10px 10px 10px 10px;
        font-weight: bold;
        cursor: pointer;
        display: inline-block;
        user-select: none;
        position: relative;
        transition: transform 0.05s ease, background-color 0.1s ease;
        clip-path: polygon(
            8px 0,
            8px 4px,
            4px 4px,
            4px 8px,
            0 8px,
            0 calc(100% - 8px),
            4px calc(100% - 8px),
            4px calc(100% - 4px),
            8px calc(100% - 4px),
            8px 100%,
            calc(100% - 8px) 100%,
            calc(100% - 8px) calc(100% - 4px),
            calc(100% - 4px) calc(100% - 4px),
            calc(100% - 4px) calc(100% - 8px),
            100% calc(100% - 8px),
            100% 8px,
            calc(100% - 4px) 8px,
            calc(100% - 4px) 4px,
            calc(100% - 8px) 4px,
            calc(100% - 8px) 0
        );
    }

    .footer .button:hover {
        background-color: #a0a08b;
    }

    .footer .button:active {
        transform: scale(0.9);
    }

    .buttonImage {
        image-rendering: pixelated;
        background: none;
        color: inherit;
        border: none;
        border-radius: 0;
        padding: 4px;
        font: inherit;
        cursor: pointer;
        outline: inherit;
        clip-path: polygon(
            6px 0,
            6px 3px,
            3px 3px,
            3px 6px,
            0 6px,
            0 calc(100% - 6px),
            3px calc(100% - 6px),
            3px calc(100% - 3px),
            6px calc(100% - 3px),
            6px 100%,
            calc(100% - 6px) 100%,
            calc(100% - 6px) calc(100% - 3px),
            calc(100% - 3px) calc(100% - 3px),
            calc(100% - 3px) calc(100% - 6px),
            100% calc(100% - 6px),
            100% 6px,
            calc(100% - 3px) 6px,
            calc(100% - 3px) 3px,
            calc(100% - 6px) 3px,
            calc(100% - 6px) 0
        );
    }

    .active-item {
        background-color: gray;
        border: 2px solid white;
        border-radius: 20px;
        filter: brightness(1.2);
    }
 
    .options {
        float: right;
        background-color: transparent;
        border: none;
        cursor: pointer;
        image-rendering: pixelated;
    }
 
    .button-Startup {
        z-index: 1;
        background-color: #e9efec;
        color: #211e20;
        padding: 20px 20px;
        margin: 0 0 10px 10px;
        font-weight: bold;
        cursor: pointer;
        display: inline-block;
        user-select: none;
        font-size: 40px;
        clip-path: polygon(
            6px 0,
            6px 3px,
            3px 3px,
            3px 6px,
            0 6px,
            0 calc(100% - 6px),
            3px calc(100% - 6px),
            3px calc(100% - 3px),
            6px calc(100% - 3px),
            6px 100%,
            calc(100% - 6px) 100%,
            calc(100% - 6px) calc(100% - 3px),
            calc(100% - 3px) calc(100% - 3px),
            calc(100% - 3px) calc(100% - 6px),
            100% calc(100% - 6px),
            100% 6px,
            calc(100% - 3px) 6px,
            calc(100% - 3px) 3px,
            calc(100% - 6px) 3px,
            calc(100% - 6px) 0
        );
    }

    .button-Startup:hover {
        background-color: #a0a08b;
    }
 
    .redText {
        color: red;
    }

    .content-footer-wrapper {
        display: contents;
    }

    /* ============================================
       ROTATION OVERLAY - Shows when device is in portrait mode
       ============================================ */
    .rotation-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100vw;
        height: 100vh;
        background-color: #211e20;
        z-index: 99999;
        display: none;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        padding: 20px;
        box-sizing: border-box;
    }

    .rotation-icon {
        font-size: 80px;
        margin-bottom: 20px;
        animation: rotate 2s ease-in-out infinite;
        transform-origin: 50% 60%;
        display: block;
    }

    .rotation-message {
        font-size: 24px;
        color: #e9efec;
        margin-bottom: 10px;
        font-family: "DungeonFont", sans-serif;
        display: block;
    }

    .rotation-submessage {
        font-size: 16px;
        color: #a0a08b;
        font-family: "DungeonFont", sans-serif;
        display: block;
    }

    @keyframes rotate {
        0%, 100% { transform: rotate(0deg); }
        50% { transform: rotate(90deg); }
    }

    /* ============================================
       PORTRAIT MODE - Show rotation overlay
       ============================================ */
    @media (max-width: 915px) and (orientation: portrait) {
        .rotation-overlay {
            display: flex !important;
            justify-content: center;
            align-items: center;
            image-rendering: pixelated;
            image-rendering: crisp-edges;
        }

        :host {
            overflow: hidden;
        }

        .title, .header, .content, .footer {
            display: none !important;
            visibility: hidden !important;
        }
    }

    /* ============================================
       MOBILE LANDSCAPE STYLES - Applied on mobile devices in landscape
       ============================================ */
   @media (max-width: 915px) and (orientation: landscape) {
    :host {
        max-width: 100%;
        grid-template-rows: 0 1fr auto;  /* title(0), header(fills space), footer(auto-sized) */
        grid-row-gap: 0;
        height: 100vh;  /* Important: constrain to viewport */
        overflow: hidden;
    }

    /* Make the wrapper a flex container */
    .content-footer-wrapper {
        display: flex;
        flex-direction: row;
        gap: 0px;
        width: 100%;
        position: relative;  /* Keep in flow, not fixed */
        max-height: 25vh;  /* Limit height so header gets more space */
        min-height: 80px;  /* Ensure it's always visible */
    }

    .title {
        height: 0;
        overflow: visible;
        margin: 0;
        padding: 0;
        font-size: 0;
        line-height: 0;
    }

    .title br {
        display: none;
    }

    .title > *:not(.buttonImage):not(.options) {
        display: none;
    }

    .title .buttonImage,
    .title .options {
        position: fixed;
        top: 5px;
        z-index: 100;
    }

    .title .buttonImage:first-of-type {
        left: 5px;
    }

    .title .options {
        right: 5px;
    }

    .header {
        margin-top: 0;
        overflow: hidden;
        max-height: 100%;  /* Fill available grid space */
    }

    .header img {
        width: 100%;
        max-width: 100vw;
        height: auto;
        position: relative;
        left: 50%;
        transform: translateX(-50%);
    }

    .header img:first-child {
        position: relative;
    }

    /* Make content and footer sit side by side */
    .content {
        margin-top: 15px;
        width: 50%;
        flex: 1;
        height: 100%;  /* Fill wrapper height */
        max-height: 25vh;
        padding: 5px 8px;
        box-shadow: none;
        -webkit-box-shadow: none;
        -moz-box-shadow: none;
        font-size: 11px;
        line-height: 1.2;
        overflow-y: auto;
        z-index: 310;
        pointer-events: none;
        position: relative;
        background-color: transparent;

    }

    .content p {
        margin: 0 0 4px 0;
        word-wrap: break-word;
        font-size: 16px;
        line-height: 1;
    }

    .footer {
        margin-top: 0;
        width: 50%;
        flex: 1;
        height: 100%;  /* Fill wrapper height */
        max-height: 25vh;
        flex-wrap: wrap;
        justify-content: center;
        padding: 5px;
        position: relative;
        z-index: 300;
    }

    /* Hide the UI image on mobile */
    .footer img {
        width: 200%;
        height: auto;
        right: 0;
        bottom: 0;
        z-index: 1;
    }

    .footer .buttons {
        position: relative;
        z-index: 2147483647;
        width: 86%;
        right: 25%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding-top: 10px;
    }

    .footer .button {
        padding: 7px 10px;
        margin: 3px;
        font-size: 12px;
        flex: 0 1 auto;
        min-width: 80px;
        max-width: 150px;
        position: fixed;
        z-index: 2147483647; 
    }

    .button-Startup {
        padding: 12px 16px;
        margin: 5px;
        font-size: 24px;
    }

    .buttonImage {
        padding: 2px;
    }

    .buttonImage img {
        height: 40px;
        width: auto;
    }

    .options {
        padding: 2px;
    }

    .options img {
        height: 40px;
        width: auto;
    }

    .actionButtons {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        gap: 4px;
        width: 100%;
    }
}







`;

/**
 * Represents the Canvas page
 */
export class CanvasComponent extends HTMLElement {
    /** Instance of the game event service */
    private readonly _gameEventService: GameEventService = new GameEventService();
    /** Instance of the game route service */
    private readonly _gameRouteService: GameRouteService = new GameRouteService();

    /** Current game state */
    private _currentGameState?: DefaultGameState;
    /** Current active action button */
    private _selectedActionButton?: ActionReference;
    /** Current active game object buttons */
    private _selectedGameObjectButtons: Set<GameObjectReference> = new Set<GameObjectReference>();
    /** Current selected inventory item */
    private _selectedInventoryItem?: string;

    /** clickable hitboxes that are present on screen */
    private hitBoxes: HitBox[] = [];
    private isActionTalk: boolean = false;
    /** All the flashlights active in the room, primairly used for disabling the flashlight */
    private _lights: FlashLightUseItem[] = [];
    private _vomitMinigame: VomitMinigame | undefined;
    private _fuelMinigame: FuelFillingMinigame | undefined;
    /** Initiates the audio */
    private ambianceSound!: HTMLAudioElement;
    private _timer: Timer | undefined;
    /**
     * The "constructor" of a Web Component
     */
    public connectedCallback(): void {
        this.attachShadow({ mode: "open" });

        void this.refreshGameState();
    }

    /**
     * Refresh the current game state
     */
    private async refreshGameState(): Promise<void> {
        const state: GameState = await this._gameRouteService.getGameState();

        await this.updateGameState(state);
    }

    /**
     * Update the canvas to the provided game state
     *
     * @param state Game state to update the canvas to
     */
    private async updateGameState(state: GameState): Promise<void> {
        // Handle switching pages, if requested.
        if (state.type === "switch-page") {
            this._gameEventService.switchPage(state.page as Page);

            return;
        }

        // Reset the component
        this._currentGameState = state;

        this._selectedActionButton = undefined;
        this._selectedGameObjectButtons.clear();

        // Refresh the web component
        await this.render();
    }

    private _CRTShader: CRTShader | undefined;

    /**
     * Render the contents of this page
     */
    private async render(): Promise<void> {
        if (!this._CRTShader) {
            this._CRTShader = new CRTShader();
            this._CRTShader.start();
        }

        if (!sessionStorage.getItem("visited")) {
            await this.goToStartup();
        }

        this.RemoveHitBoxes();
        if (!this.shadowRoot) {
            return;
        }
        const elements: HTMLElement[] = htmlArray`
            <style>
                ${styles}
            </style>
            
            <div class="rotation-overlay">
                <div class="rotation-icon"><img src='assets/img/ui/PhoneIcon.png' height='65px'></div>
                <div class="rotation-message">Please rotate your device</div>
                <div class="rotation-submessage">This game is best played in landscape mode</div>
            </div>
   
            ${this.renderTitle()}
            ${this.renderHeader()}
        `;
        
        // Create wrapper for content and footer
        const wrapper = document.createElement('div');
        wrapper.className = 'content-footer-wrapper';
        
        // Add content
        const contentHTML = this.renderContent();
        if (contentHTML) {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = contentHTML;
            const contentElement = tempDiv.firstElementChild as HTMLElement;
            if (contentElement) {
                wrapper.appendChild(contentElement);
            }
        }
        
        // Add footer
        const footerElement = this.renderFooter();
        wrapper.appendChild(footerElement);
        
        elements.push(wrapper);
        while (this.shadowRoot.firstChild) {
            this.shadowRoot.firstChild.remove();
        }
        this.shadowRoot.append(...elements);
        this.attachInventoryButtonListeners();
        this.attachOptionsButtonListener();
        this.enableAudioOnInteraction();
    }

    private attachOptionsButtonListener(): void {
        if (!this.shadowRoot) return;
        const optionsButton: HTMLButtonElement | null = this.shadowRoot.querySelector("#optionsBtn");

        if (optionsButton) {
            optionsButton.addEventListener("click", () => {
                console.log("Opties-knop geklikt!");
                this.openOverlay();
            });
        }
    }

    private openOverlay(): void {
        this._timer!.pause();
        const overlay: OverlayComponent = new OverlayComponent(() => {
            this._timer!.start();
            console.log("Overlay closed");
        });
        const optionsList: string[] = [
            "Restart game",
            "Sound",
        ];
        let optionsHtml: string = "<h1>Options:</h1>";
        optionsList.forEach(option => {
            optionsHtml += `<button class="option-btn">${option}</button>`;
        });
        const style: HTMLStyleElement = document.createElement("style");
        style.textContent = `
            .option-btn {
                background-color: black;
                display: flex;
                justify-content: center;
                align-items: center;
                color: rgb(160, 160, 139);
                padding: 8px;
                text-align: center;
                font-weight: bolder;
                width: 300px;
                height: 50px;
                border: solid 2px rgb(85, 85, 104);
                margin-bottom: 10px;
                cursor: pointer;
            }
            label {
                color: rgb(160, 160, 139);
            }
        `;
        document.head.appendChild(style);
        overlay.show(optionsHtml);
        const optionButtons: NodeListOf<HTMLButtonElement> = document.querySelectorAll(".option-btn");
        optionButtons.forEach(button => {
            button.addEventListener("click", async e => {
                const optionText: string | null = (e.target as HTMLButtonElement).textContent;
                if (optionText === "Sound") {
                    this.showSoundOptions(overlay);
                }
                if (optionText === "Restart game") {
                    await this.restartGame(overlay);
                }
            });
        });
    }

    private async restartGame(overlay?: OverlayComponent): Promise<void> {
        this._timer!.stop();

        if (overlay) {
            overlay.closeOverlay();
        }

        localStorage.clear();

        await this.goToStartup();

        await this.refreshGameState();
    }

    private showSoundOptions(overlay: OverlayComponent): void {
        this.playSounds();
        // Dit is de "Sound" instellingen-overlay
        const soundHtml: string = `
            <h2>Geluidinstellingen</h2>
            <label for="volume">Volume:</label>
            <input type="range" id="volume" min="0" max="1" step="0.01" value="${this.ambianceSound.volume}">
            <button id="mute-btn" class="option-btn">${this.ambianceSound.muted ? "Unmute" : "Mute"}</button>
            <button id="back-btn" class="option-btn">Return to options</button>
        `;
        const style: HTMLStyleElement = document.createElement("style");
        style.textContent = `
            .option-btn {
                background-color: black;
                display: flex;
                justify-content: center;
                align-items: center;
                color: rgb(160, 160, 139);
                padding: 8px;
                text-align: center;
                font-weight: bolder;
                width: 300px;
                height: 50px;
                border: solid 2px rgb(85, 85, 104);
                margin-bottom: 10px;
                cursor: pointer;
            }
            label {
                color: rgb(160, 160, 139);
            }
        `;
        document.head.appendChild(style);
        overlay.show(soundHtml);
        const volumeSlider: HTMLInputElement | null = document.querySelector("#volume");
        const muteButton: HTMLButtonElement | null = document.querySelector("#mute-btn");
        const backButton: HTMLButtonElement | null = document.querySelector("#back-btn");
        // Verander het volume op basis van de slider
        if (volumeSlider) {
            volumeSlider.addEventListener("input", event => {
                const volume: string = (event.target as HTMLInputElement).value;
                this.ambianceSound.volume = parseFloat(volume);
            });
        }
        if (muteButton) {
            muteButton.addEventListener("click", () => {
                this.ambianceSound.muted = !this.ambianceSound.muted;
                muteButton.textContent = this.ambianceSound.muted ? "Unmute" : "Mute";
            });
        }
        if (backButton) {
            backButton.addEventListener("click", () => {
                this.openOverlay();
            });
        }
    }

    private enableAudioOnInteraction(): void {
        const startBttn: HTMLButtonElement | null | undefined = this.shadowRoot?.querySelector(".button-Startup");
        if (startBttn) {
            startBttn.addEventListener("click", () => {
                this.playSounds();
            }, { once: true });
        }
    }

    private playSounds(): void {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (!this.ambianceSound) {
            this.ambianceSound = new Audio("/audio/ambiancesound.wav");
            this.ambianceSound.volume = 0.5;
            this.ambianceSound.loop = true;

            this.ambianceSound.play().catch((error: unknown) => {
                if (error instanceof Error) {
                    console.error("Audio kon niet worden afgespeeld:", error.message);
                }
                else {
                    console.error("Onbekende fout bij het afspelen van audio.");
                }
            });
        }
    }

    private async goToStartup(): Promise<void> {
        this._timer?.stop();
        this._timer?.reset();

        sessionStorage.setItem("visited", "true");

        if (!this._currentGameState) {
            console.error("No gamestate");
            return undefined;
        }

        const actions: ActionReference[] = this._currentGameState.actions;
        const objects: GameObjectReference[] = this._currentGameState.objects;

        for (let x: number = 0; x < actions.length; x++) {
            for (let y: number = 0; y < objects.length; y++) {
                if (actions[x].alias === "go to startup" && objects[y].alias === "to startup") {
                    await this.handleClickAction(actions[x], objects[y]);
                }
            }
        }
    }

    /**
     * Makes buttons for the items in the inventory
     *
     * @returns void
     */
    private attachInventoryButtonListeners(): void {
        if (!this.shadowRoot) return;

        const buttons: NodeListOf<Element> = this.shadowRoot.querySelectorAll(".buttonImage");

        buttons.forEach(button => {
            button.addEventListener("click", async event => {
                event.preventDefault();

                await this.handleInventoryButtonClick(button.id);
            });
        });

        if (this._currentGameState) {
            const inventory: string[] = this._currentGameState.inventory;

            for (let x: number = 0; x < inventory.length; x++) {
                if (inventory[x] === this._currentGameState.selectedItem) {
                    const selectedItem: Element | null = this.shadowRoot.querySelector("#" + this._currentGameState.selectedItem);

                    if (selectedItem instanceof HTMLElement) {
                        selectedItem.classList.add("active-item");
                        this._selectedInventoryItem = this._currentGameState.selectedItem;
                    }
                }
            }
        }
    }

    /**
     * Handles the actions when the inventory is clicked
     *
     * @param itemId Id of the selected item
     */
    private async handleInventoryButtonClick(itemId: string): Promise<void> {
        if (this._selectedInventoryItem === itemId) {
            this._selectedInventoryItem = undefined;

            const state: GameState | undefined = await this._gameRouteService.inventoryAction("");

            if (state === undefined) {
                return;
            }

            await this.updateGameState(state);
            await this.render();
        }
        else {
            this._selectedInventoryItem = itemId;

            const state: GameState | undefined = await this._gameRouteService.inventoryAction(itemId);

            if (state === undefined) {
                return;
            }

            await this.updateGameState(state);
            await this.render();
        }
    }

    /**
     * Render the title element
     *
     * @returns String with raw HTML for the title element. Can be empty.
     */
    private renderTitle(): string {
        if (this._currentGameState?.roomAlias === "startup" ||
          this._currentGameState?.roomAlias === "game-over" ||
          this._currentGameState?.roomAlias === "win") {
            return "";
        }
        this.StartTimer();
        const roomName: string | undefined = this._currentGameState?.roomName;
        const inventory: string[] | undefined = this._currentGameState?.inventory;
        if (roomName && inventory) {
            if (inventory.length > 0) {
                let title: string = `<div class="title">${roomName}<br>`;

                for (let x: number = 0; x < inventory.length; x++) {
                    if (x !== 0) {
                        title += "  ";
                    }

                    const isActive: string = this._selectedInventoryItem === inventory[x] ? "active" : "";

                    title += "<button id='" + inventory[x] +
                    "' class='buttonImage " + isActive + "'><img src='/assets/img/items/" +
                    inventory[x] + ".png' height='50px'/></button>";
                }
                title += "<button class='options' id='optionsBtn'><img src='assets/img/options/options.png' height='50px'></button>";
                title += "<div class='overlayDiv'></div>";
                title += "</div>";

                return title;
            }
            // return `<div class="title">${roomName}<br>
            // <button class='options' id='optionsBtn'><img src='assets/img/options/options.png' height='50px'></button>
            // <div class='overlayDiv'></div>
            // </div>`;
            const title: string = `<div class="title">${roomName}<br>
            <img src='/assets/img/Items/black.png' height='50px'/>
            <button class='options' id='optionsBtn'><img src='assets/img/options/options.png' height='50px'></button>
            </div>`;

            return title;
        }
        return "";
    }

    /**
     * Render the header element
     *
     * @returns String with raw HTML for the header element. Can be empty.
     */
    private renderHeader(): string {
        const roomImages: string[] | undefined = this._currentGameState?.roomImages;
        setTimeout(() => this.addHitboxes(), 10);
        this.DisableFlashLight();

        const roomName: string | undefined = this._currentGameState?.roomName;
        if (roomImages && roomImages.length > 0) {
            if (this._currentGameState?.roomAlias === "startup" ||
              this._currentGameState?.roomAlias === "game-over" ||
              this._currentGameState?.roomAlias === "win") {
                return `
                    <div class="header">
                        ${roomImages.map(url => `<img src="/assets/img/rooms/${url}.png" />`).join("")}
                        ${this._currentGameState.text.map(text => `<p>${text}</p>`).join("") || ""}
                    </div>
                `;
            }
            if (roomName === "Living room" && this._selectedInventoryItem === "FlashlightItem") {
                this.FlashLight(true);
                return `
            <div class="header">
                ${roomImages.map(url => `<img src="/assets/img/rooms/${url}.png" />`).join("")}
            </div>
        `;
            }

            else if (roomName === "Living room" && this._selectedInventoryItem !== "FlashlightItem") {
                this.FlashLight(false);
                return `
                <div class="header">
                ${roomImages.map(url => `<img src="/assets/img/rooms/${url}.png" />`).join("")}
                </div>
            `;
            }
            return `
            <div class="header">
                ${roomImages.map(url => `<img src="/assets/img/rooms/${url}.png" />`).join("")}
            </div>
        `;
        }

        return "";
    }

    /**
     * Render the content element
     *
     * @returns String with raw HTML for the content element
     */
    private renderContent(): string {
        // Return an empty string if on the startup, game-over or winscreen
        if (this._currentGameState?.roomAlias === "startup" ||
          this._currentGameState?.roomAlias === "game-over" ||
          this._currentGameState?.roomAlias === "win") {
            return "";
        }

        // Else return the text and make the text getting an item red
        return `
            <div class="content">
            ${this._currentGameState?.text
            .map(text =>
                `<p class="${text.includes("+") ? "redText" : ""}">${text}</p>`
            ).join("") || ""}
            </div>
        `;
    }

    /**
     * Render the footer element
     *
     * @returns HTML element of the footer
     */
    private renderFooter(): HTMLElement {
        if (this._currentGameState?.roomAlias === "startup" ||
          this._currentGameState?.roomAlias === "game-over" ||
          this._currentGameState?.roomAlias === "win") {
            return html`
            <div class="footer">
                <div class="buttons">
                    <div class="actionButtons">
                        ${this._currentGameState.actions.map(button => this.renderActionButton(button))}
                    </div>
                </div>
            </div>
        `;
        }

        if (this.isActionTalk) {
            return html`
                <div class="footer">
                    <img src="assets/img/ui/GameUI.gif" alt="Pixel Art" class="pixel-art">
                    <div class="buttons">
                        <div class="actionButtons">
                            ${this._currentGameState?.actions.map(button => this.renderActionButton(button))}
                        </div>
                    </div>
                </div>
            `;
        }

        return html`
            <div class="footer">
                <img src="assets/img/ui/GameUI.gif" alt="Pixel Art" class="pixel-art">
                <div class="buttons">
                    <div class="actionButtons">
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Checkt voor elk object in de Room of het werkt met de aangeklikte actie
     *
     * @param object Gameobject om te testen
     * @param selectedAction Actie die aangeklikt is om objecten bij te testen
     * @returns boolean of de Gameobject past bij de actie
     */
    private isObjectValidForAction(object: GameObjectReference, selectedAction: ActionReference | undefined): boolean | undefined {
        if (!selectedAction) return;

        return object.validActions.includes(selectedAction.alias);
    }

    /**
     * Render an action button for a given action reference
     *
     * @returns HTML element of the action button
     */
    private renderActionButton(action: ActionReference, object?: GameObjectReference): HTMLElement {
        let element: HTMLElement;
        if (this._currentGameState?.roomAlias === "startup" ||
          this._currentGameState?.roomAlias === "game-over" ||
          this._currentGameState?.roomAlias === "win") {
            this._timer?.stop();
            element = html`
            <a class="button-Startup ${this._selectedActionButton === action ? "active" : ""}">
                ${action.name}
            </a>
        `;
        }
        else {
            element = html`
            <a class="button ${this._selectedActionButton === action ? "active" : ""}">
                ${action.name}
            </a>
        `;
        }

        if (object) {
            element.addEventListener("click", () => this.handleClickAction(action, object));
        }
        else {
            element.addEventListener("click", () => this.handleClickAction(action));
        }

        return element;
    }

    /**
     * Handle the click on an action button, checkt of object er is en of action talk is
     *
     * @param action Action button that was clicked
     * @param object Object that was clicked
     */
    private async handleClickAction(action: ActionReference, object?: GameObjectReference): Promise<void> {
        await new Promise(resolve => setTimeout(resolve, 200));

        // Execute the action and update the game state.
        if (object) {
            if (action.alias === "go to" && object.alias === "hallway-door") {
                if (this._timer?.getTimeLeft() === 0) {
                    this._timer.reset();
                    this._timer.start();
                }
            }
            // Play footsteps sound
            if (action.alias === "go to") {
                this.playFootstepsSound(object.alias);

                if (object.alias.includes("Door") || object.alias.includes("door") || object.alias.includes("Shed")) {
                    if (!object.alias.includes("Stair")) {
                    // FADE OUT the old room
                        await this.fadeOut(300);
                        this.playDoorSound();
                    }
                }
            }

            const state: GameState | undefined = await this._gameRouteService.executeAction(action.alias, [object.alias]);

            if (state === undefined) {
                return;
            }

            this.isActionTalk = false;
            await this.updateGameState(state);

            // FADE IN the new room after rendering
            if (action.alias === "go to") {
                if (object.alias.includes("Door") || object.alias.includes("door") || object.alias.includes("Shed")) {
                    if (!object.alias.includes("Stair")) {
                        await this.fadeIn(300);
                    }
                }
            }
        }
        else {
            const state: GameState | undefined = await this._gameRouteService.executeAction(action.alias);

            if (state === undefined) {
                return;
            }

            this.isActionTalk = false;
            await this.updateGameState(state);
        }

        // Gives buttons if the action is talk
        if (action.alias.includes("talk")) {
            this.isActionTalk = true;
            await this.render();
            this.isActionTalk = false;
        }

        if (this._currentGameState?.roomAlias === "game-over") {
            this._timer!.stop();
        }

        // Renders room if the talk action is finished
        if (action.alias.includes(":2") || action.alias.includes(":4") || action.alias.includes(":6")) {
            this._timer!.start();
            await this.render();
        }
        // Alarm of the mirror character when given wrong answer
        if (action.alias.includes(":666")) {
            this._timer!.alarm();
            await this.render();
        }

        if (action.alias.includes(":555")) {
            void this.refreshGameState();
        }

        if (action.alias === "taste" || action.alias.includes(":777")) {
            this._timer?.pause();
            const mashSound: HTMLAudioElement = new Audio("/audio/soundEffects/retroHurt.mp3");
            this._vomitMinigame = new VomitMinigame(this, mashSound, this._currentGameState!.inventory.includes("FuelItem"));
        }

        if (action.alias === "fuel") {
            this._timer?.pause();
            const fuelSound: HTMLAudioElement = new Audio("/audio/soundEffects/fuel-fill.mp3");
            this._fuelMinigame = new FuelFillingMinigame(this, fuelSound, false);
        }

        if (action.alias === "hide") {
            this._timer!.pause();
            setTimeout(() => {
                this._timer!.showPopupMessage("You hear him leaving", "green");
                this.playFootstepsSound();
                this._timer!.isHiding = true;
            }, 5000);
        }
        if (action.alias === "stop hiding") {
            if (this._timer!.isHiding) {
                this._timer!.isHiding = false;
                this._timer!.reset();
                this._timer!.start();
            }

            this._timer!.isHiding = false;
        }
        if (action.alias === "talk") {
            this._timer!.pause();
        }

        if (action.alias === "new-game") {
            this._timer?.reset();
            this._timer!.start();
        }

        if (action.alias === "drive") {
            this._timer?.stop();
            await this.playEngineSound();
        }

        if (action.alias === "Press") {
            if (object?.alias.includes("LightSwitch")) {
                await this.playLightSound();
            }
        }
    }

    private playFootstepsSound(object?: string): void {
        let footstepsSound: HTMLAudioElement;

        if (object === "StairToFrontDoor" || object === "FrontDoorToStair") {
            footstepsSound = new Audio("/audio/soundEffects/footstepsStairs.mp3");
            footstepsSound.volume = 0.3;
        }
        else if (object === "Outside Shed room" || object === "Shed Outside room" ||
          object === "Outside Frontdoor room" || object === "DoorFrontDoorOutsideItem") {
            footstepsSound = new Audio("/audio/soundEffects/footstepsOutside.mp3");
            footstepsSound.volume = 0.3;
        }
        else if (object === "GateItem") {
            return;
        }
        else {
            footstepsSound = new Audio("/audio/soundEffects/footsteps.mp3");
            footstepsSound.volume = 0.8;
            footstepsSound.playbackRate = 1.5;
        }

        if (footstepsSound.paused) {
            footstepsSound.play().catch((error: unknown) => {
                if (error instanceof Error) {
                    console.error("Audio kon niet worden afgespeeld:", error.message);
                }
                else {
                    console.error("Onbekende fout bij het afspelen van audio.");
                }
            });
        }
    }

    private playDoorSound(): void {
        const doorSound: HTMLAudioElement = new Audio("/audio/soundEffects/door.mp3");
        doorSound.volume = 0.2;

        if (doorSound.paused) {
            doorSound.play().catch((error: unknown) => {
                if (error instanceof Error) {
                    console.error("Audio kon niet worden afgespeeld:", error.message);
                }
                else {
                    console.error("Onbekende fout bij het afspelen van audio.");
                }
            });
        }
    }

    private async playEngineSound(): Promise<void> {
        const engineStartSound: HTMLAudioElement = new Audio("/audio/soundEffects/car-start-drive-away.mp3");
        engineStartSound.volume = 0.2;
        await engineStartSound.play();
        setTimeout(async () => {
            engineStartSound.pause();
            engineStartSound.currentTime = 27;
            await engineStartSound.play();
            setTimeout(() => {
                engineStartSound.pause();
                engineStartSound.currentTime = 0;
            }, 5000);
        }, 3000);
    }

    private async playLightSound(object?: string): Promise<void> {
        if (object === "LightSwitch") {
            const lightSwitchSound: HTMLAudioElement = new Audio("/audio/soundEffects/light-switch.mp3");
            lightSwitchSound.volume = 0.5;
            await lightSwitchSound.play();
        }
    }

    // Creates all hitboxes for the room
    private addHitboxes(): void {
        if (this._currentGameState) {
            // Gets all gameObject references and assign them to their hitboxes
            const objRef: GameObjectReference[] = this._currentGameState.objects;
            for (let i: number = 0; i < this._currentGameState.objects.length; i++) {
                this.hitBoxes.push(new HitBox(objRef[i].position, objRef[i].size,
                    objRef[i].isDebugHitboxOn, this, objRef[i].actionAlias, objRef[i].alias));
            }
        }
    }

    /**
     * Sets actions when clicking on hitboxes
     *
     * @param actionAlias alias of the clicked action
     * @param objectAlias alias of the clicked object
     */
    public async setHitboxAction(actionAlias: string, objectAlias: string): Promise<void> {
        // Get selected object
        const objectRef: GameObjectReference[] | undefined = this._currentGameState?.objects;
        if (!objectRef) return;

        const currentObject: GameObjectReference | undefined = objectRef.find(obj => obj.alias === objectAlias);
        if (!currentObject) return;

        // Get possible actions
        const allActions: ActionReference[] | undefined = this._currentGameState?.actions;
        const actions: ActionReference[] = [];

        if (!allActions) return;

        for (let x: number = 0; x < allActions.length; x++) {
            if (this.isObjectValidForAction(currentObject, allActions[x])) {
                actions.push(allActions[x]);
            }
        }

        // Makes a tempory object array so its valid for the executeAction function
        const tempObjects: string[] = [];
        tempObjects.push(objectAlias);

        // Try to execute the action with all game objects on the list
        const state: GameState | undefined = await this._gameRouteService.executeAction(
            actionAlias,
            tempObjects
        );

        // If 2 more game objects where on the list, clear it.
        if (this._selectedGameObjectButtons.size >= 2) {
            this._selectedActionButton = undefined;
            this._selectedGameObjectButtons.clear();
        }

        // If no state was returned, exit silently. This can happen when an action needs more than 1 game object.
        if (state === undefined) {
            return;
        }

        // Otherwise, update the game state.
        await this.updateGameState(state);

        // Set action buttons
        setTimeout(() => {
            const buttonsHTML: HTMLDivElement | null | undefined = this.shadowRoot?.querySelector(".actionButtons");

            if (buttonsHTML) {
                buttonsHTML.innerHTML = "";
                for (let x: number = 0; x < actions.length; x++) {
                    const actionButton: HTMLElement = this.renderActionButton(actions[x], currentObject);
                    buttonsHTML.appendChild(actionButton);
                }
            }
        }, 0);
    }

    public async setEndMinigameAction(actionAlias: string, objectAlias: string): Promise<void> {
        await this.setHitboxAction(actionAlias, objectAlias);
        void this.refreshGameState();
    }

    /** Removes all hiboxes from the canvas making place for new hitboxes */
    private RemoveHitBoxes(): void {
        for (let i: number = 0; i < this.hitBoxes.length; i++) {
            this.hitBoxes[i].removeHitBox();
        }
        this.hitBoxes = [];
    }

    /** Enables flashlight and pushes it to the array */
    private FlashLight(isActive: boolean): void {
        this._lights.push(new FlashLightUseItem(isActive, this));
    }

    /** Removes flashlight from the array and html */
    private DisableFlashLight(): void {
        for (let i: number = 0; i < this._lights.length; i++) {
            this._lights[i].DisableFlashLight();
        }
        this.hitBoxes = [];
    }

    /** Removes flashlight from the array and html */
    public DisableMinigame(): void {
        this._timer?.start();
        this._vomitMinigame = undefined;
        // Removes the warning message: this._vomitMinigame is declared but never read.
        console.log(this._vomitMinigame);
        console.log(this._fuelMinigame);
    }

    private StartTimer(): void {
        if (!this._timer) {
            this._timer = new Timer(new Audio("/audio/soundEffects/soundWarningKidnapper.mp3"),
                new Audio("/audio/soundEffects/JumpScare.mp3"), this);
        }
    }

    private async fadeOut(durationMs = 300): Promise<void> {
        return new Promise<void>(resolve => {
            const header: HTMLElement | null = this.shadowRoot?.querySelector(".header") ?? null;

            if (!header) {
                console.warn("Header element not found in shadow root");
                resolve();
                return;
            }

            header.style.transition = `filter ${durationMs}ms ease`;
            void header.offsetHeight; // Force reflow
            header.style.filter = "brightness(0)";

            setTimeout(() => resolve(), durationMs);
        });
    }

    private async fadeIn(durationMs = 300): Promise<void> {
        return new Promise<void>(resolve => {
            const header: HTMLElement | null = this.shadowRoot?.querySelector(".header") ?? null;

            if (!header) {
                console.warn("Header element not found in shadow root");
                resolve();
                return;
            }

            // Start with black
            header.style.filter = "brightness(0)";
            header.style.transition = `filter ${durationMs}ms ease`;
            void header.offsetHeight; // Force reflow

            // Fade to normal
            header.style.filter = "brightness(1)";

            setTimeout(() => resolve(), durationMs);
        });
    }
}
