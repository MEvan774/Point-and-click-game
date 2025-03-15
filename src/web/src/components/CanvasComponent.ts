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
        z-index: 2000;
        display: flex;
        flex-direction: column;
        overflow: auto;
        padding: 10px 10px 0 10px;
    }

    .footer .button {
        z-index: 2000;
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

    .active-item {
        background-color: gray;
        border: 2px solid white;
        border-radius: 20px;
        filter: brightness(1.2);
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
    private isActionTalk: boolean = false;

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

            this.updateGameState(state);
            this.render();
        }
        else {
            this._selectedInventoryItem = itemId;

            const state: GameState | undefined = await this._gameRouteService.inventoryAction(itemId);

            if (state === undefined) {
                return;
            }

            this.updateGameState(state);
            this.render();
        }
    }

    /**
     * Render the title element
     *
     * @returns String with raw HTML for the title element. Can be empty.
     */
    private renderTitle(): string {
        if (this._currentGameState?.roomAlias === "startup" || this._currentGameState?.roomAlias === "game-over") {
            return "";
        }

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
                    "' class='buttonImage " + isActive + "'}><img src='public/assets/img/items/" +
                    inventory[x] + ".png' height='50px'/></button>";
                }

                title += "</div>";

                return title;
            }
            const title: string = `<div class="title">${roomName}<br>
            <img src='/assets/img/Items/black.png' height='50px'/></div>`;

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
        if (roomImages && roomImages.length > 0) {
            if (this._currentGameState?.roomAlias === "startup" || this._currentGameState?.roomAlias === "game-over") {
                return `
                    <div class="header">
                        ${roomImages.map(url => `<img src="/assets/img/rooms/${url}.png" />`).join("")}
                        ${this._currentGameState.text.map(text => `<p>${text}</p>`).join("") || ""}
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
        if (this._currentGameState?.roomAlias === "startup" || this._currentGameState?.roomAlias === "game-over") {
            return `
            `;
        }
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
        if (this._currentGameState?.roomAlias === "startup" || this._currentGameState?.roomAlias === "game-over") {
            return html`
            <div class="footer">
                <div class="buttons">
                    <div class="actionButtons">
                        ${this._currentGameState?.actions.map(button => this.renderActionButton(button))}
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
        if (this._currentGameState?.roomAlias === "startup" || this._currentGameState?.roomAlias === "game-over") {
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
        // Execute the action and update the game state.
        if (object) {
            const state: GameState | undefined = await this._gameRouteService.executeAction(action.alias, [object.alias]);

            if (state === undefined) {
                return;
            }

            this.isActionTalk = false;
            this.updateGameState(state);
        }
        else {
            const state: GameState | undefined = await this._gameRouteService.executeAction(action.alias);

            if (state === undefined) {
                return;
            }

            this.isActionTalk = false;
            this.updateGameState(state);
        }

        // Gives buttons if the action is talk
        if (action.alias.includes("talk")) {
            this.isActionTalk = true;
            this.render();
            this.isActionTalk = false;
        }

        // Renders room if the talk action is finished
        if (action.alias.includes(":2") || action.alias.includes(":4") || action.alias.includes(":6")) {
            this.render();
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
        this.updateGameState(state);

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

    /** Removes all hiboxes from the canvas making place for new hitboxes */
    private RemoveHitBoxes(): void {
        for (let i: number = 0; i < this.hitBoxes.length; i++) {
            this.hitBoxes[i].removeHitBox();
        }
        this.hitBoxes = [];
    }
}
