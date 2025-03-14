import { ActionReference, DefaultGameState, GameObjectReference, GameState } from "@shared/types";
import { css, html, htmlArray } from "../helpers/webComponents";
import { GameEventService } from "../services/GameEventService";
import { GameRouteService } from "../services/GameRouteService";
import { Page } from "../enums/Page";
import { HitBox } from "../../../api/src/game-base/hitBox/HitBox";

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
    }

    .header {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        margin-top: 10px;
    }

    .header img {
        width: 1022px; /* Scale up while maintaining aspect ratio */
        height: auto; /* Keeps aspect ratio */
        image-rendering: pixelated;
        bottom: 0;
    }

    .header img:nth-child(n + 2) {
        position: absolute;
    }

    .content {
        flex-grow: 1;
        overflow: auto;
        margin-top: 200px;
        bottom: 0;
        padding: 0 10px;
        z-index: 1;
        background-color: #211e20;
        height: 110px;
        width: 833px;
        box-shadow: 85px 85px 0px 85px #211e20;
        -webkit-box-shadow: 85px 85px 0px 85px #211e20;
        -moz-box-shadow: 85px 85px 0px 85px #211e20;
    }

    .content p {
        margin: 0 0 10px 0;
    }

    .content p:last-of-type {
        margin: 0;
    }

    .footer {
        margin-top: 10px;
        display: flex;
        height: 105px;
        border-radius: 10px 10px 0 0;
        bottom: 0;
        width: 857px;
    }
    .footer img {
        image-rendering: pixelated; /* Keeps the pixelated look */
    width: 1022px; /* Scale up while maintaining aspect ratio */
    height: auto; /* Keeps aspect ratio */
    position: absolute;
    margin-top: -103px; /* Adjust as needed */
    z-index: 1;
    pointer-events: none;
    }

    .footer .buttons {
        z-index: 2;
        display: flex;
        flex-direction: column;
        overflow: auto;
        padding: 10px 10px 0 10px;
    }

    .footer .button {
        z-index: 1;
        background-color: #e9efec;
        color: #211e20;
        padding: 5px 10px;
        margin: 0 0 10px 10px;
        font-weight: bold;
        cursor: pointer;
        display: inline-block;
        user-select: none;
    }

    .footer .button.active,
    .footer .button:hover {
        background-color: #a0a08b;
    }

    .buttonImage {
        image-rendering: pixelated;
        background: none;
        color: inherit;
        border: none;
        padding: 0;
        font: inherit;
        cursor: pointer;
        outline: inherit;
    }

    .buttonImage.active {
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
    }

    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 15%;
        height: 15%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 999;
        display: flex;
        justifyContent: center;
        alignItems: center;
    }

    .overlayOptions {
        backgroundColor = "#fff";
        padding = "20px";
        borderRadius = "8px";
        textAlign = "center";
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

    private hitBoxes: HitBox[] = [];

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

        this.updateGameState(state);
    }

    /**
     * Update the canvas to the provided game state
     *
     * @param state Game state to update the canvas to
     */
    private updateGameState(state: GameState): void {
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
        this.render();
    }

    /**
     * Render the contents of this page
     */
    private render(): void {
        this.RemoveHitBoxes();
        if (!this.shadowRoot) {
            return;
        }

        const elements: HTMLElement[] = htmlArray`
            <style>
                ${styles}
            </style>

            ${this.renderTitle()}
            ${this.renderHeader()}
            ${this.renderContent()}
            ${this.renderFooter()}
        `;

        while (this.shadowRoot.firstChild) {
            this.shadowRoot.firstChild.remove();
        }

        this.shadowRoot.append(...elements);

        this.attachInventoryButtonListeners();
        this.attachOptionsButtonListener();
        this.attachOptionsCloseButtonListener();
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
    }

    /**
     * Handles the actions when the inventory is clicked
     *
     * @param itemId Id of the selected item
     */
    private async handleInventoryButtonClick(itemId: string): Promise<void> {
        if (this._selectedInventoryItem === itemId) {
            this._selectedInventoryItem = undefined;
        }
        else {
            this._selectedInventoryItem = itemId;

            this.render();

            const state: GameState | undefined = await this._gameRouteService.inventoryAction(itemId);

            if (state === undefined) {
                return;
            }

            this.updateGameState(state);
        }
    }

    /**
     * Function to display basic option choices within the game
     */
    private attachOptionsButtonListener(): void {
        if (!this.shadowRoot) return;

        // Zoek de knop in de shadowRoot
        const optionsButton: HTMLButtonElement | null = this.shadowRoot.querySelector("#optionsBtn");

        if (optionsButton) {
            // Voeg de click event listener toe
            optionsButton.addEventListener("click", () => {
                console.log("Opties-knop geklikt!");
                this.renderOptions();
            });
        }
    }

    /**
     * Render de opties in een overlay
     */
    private renderOptions(): void {
        if (!this.shadowRoot) return;
        const overlay: HTMLDivElement | null = this.shadowRoot.querySelector(".overlayDiv");
        const optionList: string[] = this._currentGameState?.gameOptions || [];
        if (overlay) {
            overlay.classList.add("overlay");
            const optionsContainer: HTMLDivElement = document.createElement("div");
            optionsContainer.classList.add("overlayOptions");

            for (let i: number = 0; i < optionList.length; i++) {
                const optionButton: HTMLButtonElement = document.createElement("button");
                optionButton.textContent = optionList[i];
                optionButton.classList.add("option-btn");

                optionButton.addEventListener("click", () => {
                    console.log(`${optionList[i]} gekozen!`);
                    this.closeOptions(overlay);
                });
                optionsContainer.appendChild(optionButton);
            }
            overlay.appendChild(optionsContainer);
            this.shadowRoot.appendChild(overlay);
        }
    }

    /**
     * Sluit de overlay
     */
    private closeOptions(overlay: HTMLDivElement): void {
        this.shadowRoot?.removeChild(overlay);
    }

    private attachOptionsCloseButtonListener(): void {
        if (!this.shadowRoot) return;
        const closeBtn: HTMLButtonElement | null = this.shadowRoot.querySelector("#closeBtn");
        if (closeBtn) {
            closeBtn.addEventListener("click", () => {
                console.log("someone clicked close");
            });
        }
    }

    /**
     * Render the title element
     *
     * @returns String with raw HTML for the title element. Can be empty.
     */
    private renderTitle(): string {
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
                title += "</div>";

                return title;
            }
            return `<div class="title">${roomName}<br>
            <button class='options' id='optionsBtn'><img src='assets/img/options/options.png' height='50px'></button>
            <div class='overlayDiv'></div>
            </div>`;
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
        if (roomImages && roomImages.length > 0) {
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
        return `
            <div class="content">
                ${this._currentGameState?.text.map(text => `<p>${text}</p>`).join("") || ""}
            </div>
        `;
    }

    /**
     * Render the footer element
     *
     * @returns HTML element of the footer
     */
    private renderFooter(): HTMLElement {
        console.log(this._currentGameState?.actions);
        return html`
            <div class="footer">
                <img src="assets/img/ui/GameUI.gif" alt="Pixel Art" class="pixel-art">
                <div class="buttons">
                    <div>
                        ${this._currentGameState?.actions.map(button => this.renderActionButton(button))}
                    </div>
                    <div>
                        ${this._selectedActionButton
                            ? this._currentGameState?.objects
                                .filter(object => this.isObjectValidForAction(object, this._selectedActionButton))
                                .map(button => this.renderGameObjectButton(button)) || ""
                            : ""
                        }
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
    private renderActionButton(button: ActionReference): HTMLElement {
        const element: HTMLElement = html`
            <a class="button ${this._selectedActionButton === button ? "active" : ""}">
                ${button.name}
            </a>
        `;

        element.addEventListener("click", () => this.handleClickAction(button));

        return element;
    }

    /**
     * Render a game object button for a given game object reference
     *
     * @returns HTML element of the game object button
     */
    private renderGameObjectButton(button: GameObjectReference): HTMLElement {
        const element: HTMLElement = html`
            <a class="button ${this._selectedGameObjectButtons.has(button) ? "active" : ""}">
                ${button.name}
            </a>
        `;

        element.addEventListener("click", () => this.handleClickGameObject(button));

        return element;
    }

    /**
     * Handle the click on an action button
     *
     * @param button Action button that was clicked
     */
    private async handleClickAction(button: ActionReference): Promise<void> {
        // If this actions needs a game object, show the available game objects.
        if (button.needsObject) {
            this._selectedActionButton = button;
            this._selectedGameObjectButtons.clear();

            this.render();

            return;
        }

        // Otherwise, execute the action and update the game state.
        const state: GameState | undefined = await this._gameRouteService.executeAction(button.alias);

        if (state === undefined) {
            return;
        }

        this.updateGameState(state);
    }

    /**
     * Handle the click on a game object button
     *
     * @param button Game object button that was clicked
     */
    private async handleClickGameObject(button: GameObjectReference): Promise<void> {
        // If no action button was clicked, do not try to handle this click.
        if (!this._selectedActionButton) {
            return;
        }

        // Add the game object to list of selected game objects
        this._selectedGameObjectButtons.add(button);

        // Try to execute the action with all game objects on the list
        const state: GameState | undefined = await this._gameRouteService.executeAction(
            this._selectedActionButton.alias,
            [...this._selectedGameObjectButtons].map(e => e.alias)
        );

        // If 2 more game objects where on the list, clear it.
        if (this._selectedGameObjectButtons.size >= 2) {
            this._selectedActionButton = undefined;
            this._selectedGameObjectButtons.clear();
        }

        // Refresh the web component
        this.render();

        // If no state was returned, exit silently. This can happen when an action needs more than 1 game object.
        if (state === undefined) {
            return;
        }

        // Otherwise, update the game state.
        this.updateGameState(state);
    }

    private addHitboxes(): void {
        if (this._currentGameState) {
            const objRef: GameObjectReference[] = this._currentGameState.objects;

            for (let i: number = 0; i < this._currentGameState.objects.length; i++) {
                this.hitBoxes.push(new HitBox(objRef[i].position, objRef[i].size,
                    objRef[i].isDebugHitboxOn, this, objRef[i].actionAlias, objRef[i].alias));
            }
        }
    }

    public async setHitboxAction(actionAlias: string, objectAlias: string): Promise<void> {
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

        // Refresh the web component
        this.render();

        // If no state was returned, exit silently. This can happen when an action needs more than 1 game object.
        if (state === undefined) {
            return;
        }

        // Otherwise, update the game state.
        this.updateGameState(state);
    }

    private RemoveHitBoxes(): void {
        for (let i: number = 0; i < this.hitBoxes.length; i++) {
            this.hitBoxes[i].removeHitBox();
        }
        this.hitBoxes = [];
    }
}
